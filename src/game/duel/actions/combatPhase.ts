import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { cardBehaviourMap } from "../cardBehaviour/AllCardBehaviours"
import { playAnimation } from "../control/playAnimation"
import { checkForDeaths } from "./checkForDeaths"
import { creaturesTrade } from "./creaturesTrade"
import { dealDamageToPlayer } from "./dealDamage"
import { removeCard } from "./removeCard"

export async function combatPhase(inputDuel: DuelState) {
  let duel = inputDuel

  for (let x = 0; x < duel.human.rows.length; x++) {
    const humanAttackingCard = duel.human.rows[x][0]
    const opponentAttackingCard = duel.opponent.rows[x][0]

    if (humanAttackingCard === undefined && opponentAttackingCard === undefined) {
      continue
    }

    // Trigger effects of support cards
    for (let y = 1; y < duel.human.rows[x].length; y++) {
      const card = duel.human.rows[x][y]
      const supportEffect = cardBehaviourMap[card?.name ?? ""]?.effects?.support
      if (supportEffect !== undefined) {
        duel = await supportEffect(duel, "human", card.instanceId)
      }
    }
    for (let y = 1; y < duel.opponent.rows[x].length; y++) {
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
      duel = creaturesTrade(duel, humanAttackingCard.instanceId, opponentAttackingCard.instanceId)
    }
    // Human damage to Opponent face
    else if (
      humanAttackingCard !== undefined &&
      humanAttackingCard.cardType === "creature" &&
      humanAttackingCard.attack !== undefined &&
      opponentAttackingCard === undefined
    ) {
      dealDamageToPlayer(duel, "opponent", humanAttackingCard.attack)
    }
    // Opponent damage to Human face
    else if (
      opponentAttackingCard !== undefined &&
      opponentAttackingCard.cardType === "creature" &&
      opponentAttackingCard.attack !== undefined &&
      humanAttackingCard === undefined
    ) {
      dealDamageToPlayer(duel, "human", opponentAttackingCard.attack)
    }

    duel = await playAnimation(duel, {
      id: "ATTACK_END",
      durationMs: 200,
      endLag: true,
      rowIndex: x,
    })

    //Trigger effects of attacking cards
    const humanAfterAttackEffect = cardBehaviourMap[humanAttackingCard?.name ?? ""]?.effects?.afterAttack
    if (humanAttackingCard && humanAfterAttackEffect !== undefined) {
      duel = await humanAfterAttackEffect(duel, "human", humanAttackingCard.instanceId)
    }
    const opponentAfterAttackEffect = cardBehaviourMap[opponentAttackingCard?.name ?? ""]?.effects?.afterAttack
    if (opponentAttackingCard && opponentAfterAttackEffect !== undefined) {
      duel = await opponentAfterAttackEffect(duel, "opponent", opponentAttackingCard.instanceId)
    }

    duel = await checkForDeaths(duel)
  }

  return duel
}
