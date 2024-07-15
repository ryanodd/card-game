import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { cardBehaviourMap } from "../cardBehaviour/AllCardBehaviours"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"
import { getEffectiveAttack } from "../helpers/getEffectiveAttack"
import { checkForDeaths } from "./checkForDeaths"
import { creaturesTrade } from "./creaturesTrade"
import { dealDamageToPlayer } from "./dealDamage"
import { removeCard } from "./removeCard"
import { decreaseStun } from "./stun"

export async function combatPhase(inputDuel: DuelState) {
  let duel = inputDuel

  for (let x = 0; x < duel.human.rows.length; x++) {
    const humanAttackingCard = duel.human.rows[x][0]
    const opponentAttackingCard = duel.opponent.rows[x][0]

    if (humanAttackingCard === undefined && opponentAttackingCard === undefined) {
      continue
    }

    const humanAttackingCardStunned =
      humanAttackingCard?.modifiers.find((modifier) => modifier.id === "stun") !== undefined
    const opponentAttackingCardStunned =
      opponentAttackingCard?.modifiers.find((modifier) => modifier.id === "stun") !== undefined

    // Trigger effects of support cards
    for (let y = duel.human.rows[x].length - 1; y >= 1; y--) {
      const card = duel.human.rows[x][y]
      const supportEffect = cardBehaviourMap[card?.name ?? ""]?.effects?.support
      if (supportEffect !== undefined) {
        duel = await supportEffect(duel, "human", card.instanceId)
      }
    }
    for (let y = duel.opponent.rows[x].length - 1; y >= 1; y--) {
      const card = duel.opponent.rows[x][y]
      const supportEffect = cardBehaviourMap[card?.name ?? ""]?.effects?.support
      if (supportEffect !== undefined) {
        duel = await supportEffect(duel, "opponent", card.instanceId)
      }
    }

    duel = await playAnimation(duel, {
      id: "ATTACK_START",
      durationMs: 200,
      rowIndex: x,
    })

    //Trade
    if (humanAttackingCard !== undefined && opponentAttackingCard !== undefined) {
      duel = await creaturesTrade(duel, humanAttackingCard.instanceId, opponentAttackingCard.instanceId)
    }
    // Human damage to Opponent face
    else if (
      humanAttackingCard !== undefined &&
      humanAttackingCard.cardType === "creature" &&
      !humanAttackingCardStunned &&
      opponentAttackingCard === undefined
    ) {
      dealDamageToPlayer(duel, "opponent", getEffectiveAttack(humanAttackingCard))
    }
    // Opponent damage to Human face
    else if (
      opponentAttackingCard !== undefined &&
      opponentAttackingCard.cardType === "creature" &&
      !opponentAttackingCardStunned &&
      humanAttackingCard === undefined
    ) {
      dealDamageToPlayer(duel, "human", getEffectiveAttack(opponentAttackingCard))
    }

    duel = await playAnimation(duel, {
      id: "ATTACK_END",
      durationMs: 200,
      rowIndex: x,
    })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

    // Trigger effects of attacking cards
    const humanAfterAttackEffect = cardBehaviourMap[humanAttackingCard?.name ?? ""]?.effects?.afterAttack
    if (humanAttackingCard && humanAfterAttackEffect !== undefined && !humanAttackingCardStunned) {
      duel = await humanAfterAttackEffect(duel, "human", humanAttackingCard.instanceId)
    }
    const opponentAfterAttackEffect = cardBehaviourMap[opponentAttackingCard?.name ?? ""]?.effects?.afterAttack
    if (opponentAttackingCard && opponentAfterAttackEffect !== undefined && !opponentAttackingCardStunned) {
      duel = await opponentAfterAttackEffect(duel, "opponent", opponentAttackingCard.instanceId)
    }

    // Tick stunned creatures
    if (humanAttackingCardStunned) {
      duel = await decreaseStun(duel, humanAttackingCard.instanceId)
    }
    if (opponentAttackingCardStunned) {
      duel = await decreaseStun(duel, opponentAttackingCard.instanceId)
    }

    duel = await checkForDeaths(duel)
  }

  return duel
}
