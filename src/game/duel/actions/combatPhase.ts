import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { cardBehaviourMap } from "../cardBehaviour/AllCardBehaviours"
import { playAnimation } from "../control/playAnimation"
import { creaturesTrade } from "./creaturesTrade"
import { dealDamageToPlayer } from "./dealDamage"
import { removeCard } from "./removeCard"

export async function combatPhase(inputDuel: DuelState) {
  let duel = inputDuel

  for (let x = 0; x < duel.human.rows.length; x++) {
    duel = await playAnimation(duel, {
      id: "ATTACK_START",
      duration: 200,
      rowIndex: x,
    })
    const humanAttackingCard = duel.human.rows[x][0]
    const opponentAttackingCard = duel.opponent.rows[x][0]

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
    //Trigger effects of attacking cards
    const humanAfterAttackEffect = cardBehaviourMap[humanAttackingCard?.name ?? ""]?.effects?.afterAttack
    if (humanAttackingCard && humanAfterAttackEffect !== undefined) {
      duel = await humanAfterAttackEffect(duel, "human", humanAttackingCard.instanceId)
    }
    const opponentAfterAttackEffect = cardBehaviourMap[opponentAttackingCard?.name ?? ""]?.effects?.afterAttack
    if (opponentAttackingCard && opponentAfterAttackEffect !== undefined) {
      duel = await opponentAfterAttackEffect(duel, "opponent", opponentAttackingCard.instanceId)
    }

    duel = await playAnimation(duel, {
      id: "ATTACK_END",
      duration: 200,
      rowIndex: x,
    })

    // Check for death & remove cards
    if (humanAttackingCard && getCardByInstanceId(duel, humanAttackingCard.instanceId).health === 0) {
      removeCard(duel, humanAttackingCard.instanceId)
    }
    if (opponentAttackingCard && getCardByInstanceId(duel, opponentAttackingCard.instanceId).health === 0) {
      removeCard(duel, opponentAttackingCard.instanceId)
    }
  }

  return duel
}
