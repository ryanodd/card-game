import { DuelState } from "../DuelData"
import { getCurrentDuelPlayer, getOtherPlayerByPlayerId, getOtherPlayerId } from "../DuelHelpers"
import { cardBehaviourMap } from "../cardBehaviour/allCardBehaviour/allCardBehaviours"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"
import { getEffectiveAttack } from "../helpers/getEffectiveAttack"
import { checkForDeaths } from "./checkForDeaths"
import { creaturesTrade } from "./creaturesTrade"
import { dealDamageToPlayer } from "./dealDamage"

export async function combatPhase(inputDuel: DuelState) {
  let duel = inputDuel
  const attackingPlayer = getCurrentDuelPlayer(duel)
  const defendingPlayer = getOtherPlayerByPlayerId(duel, duel.currentPlayerId)

  for (let x = 0; x < duel.human.rows.length; x++) {
    const attackingCard = attackingPlayer.rows[x][0]
    const defendingCard = defendingPlayer.rows[x][0]

    if (attackingCard === undefined || attackingCard.cardType !== "creature") {
      continue
    }

    const attackingCardSummoningSick = attackingCard.summoningSickness
    if (attackingCardSummoningSick) {
      continue
    }

    // Trigger effects of support cards
    for (let y = attackingPlayer.rows[x].length - 1; y >= 1; y--) {
      const card = attackingPlayer.rows[x][y]
      const supportEffect = cardBehaviourMap[card?.name ?? ""]?.effects?.support
      if (supportEffect !== undefined) {
        duel = await supportEffect(duel, card.instanceId)
      }
    }

    const beforeAttackFunction = cardBehaviourMap[attackingCard.name].effects?.beforeAttack
    if (beforeAttackFunction) {
      duel = await beforeAttackFunction(duel, attackingCard.instanceId)
    }

    duel = await playAnimation(duel, {
      id: "ATTACK_START",
      durationMs: 200,
      cardId: attackingCard.instanceId,
    })

    // Trade
    if (attackingCard !== undefined && defendingCard !== undefined) {
      duel = await creaturesTrade(duel, attackingCard.instanceId, defendingCard.instanceId)
    }
    // damage to face
    else if (attackingCard !== undefined && defendingCard === undefined) {
      dealDamageToPlayer(duel, getOtherPlayerId(duel.currentPlayerId), getEffectiveAttack(attackingCard))
    }

    duel = await playAnimation(duel, {
      id: "ATTACK_END",
      durationMs: 200,
      cardId: attackingCard.instanceId,
    })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

    // Trigger effects of attacking cards
    const afterAttackEffect = cardBehaviourMap[attackingCard?.name ?? ""]?.effects?.afterAttack
    if (attackingCard && afterAttackEffect !== undefined) {
      duel = await afterAttackEffect(duel, attackingCard.instanceId)
    }

    duel = await checkForDeaths(duel)
  }

  return duel
}
