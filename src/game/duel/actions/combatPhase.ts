import { DuelState } from "../DuelData"
import { getCurrentDuelPlayer, getOtherPlayerByPlayerId } from "../DuelHelpers"
import { cardBehaviourMap } from "../cardBehaviour/allCardBehaviour/allCardBehaviours"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"
import { checkForDeaths } from "./checkForDeaths"
import { creaturesTrade } from "./creaturesTrade"
import { cleanUpCardsInPlay } from "./destroyCard"
import { discardBothPlayerHands } from "./discard"

export async function combatPhase(inputDuel: DuelState) {
  let duel = inputDuel

  duel = await discardBothPlayerHands(duel)

  const attackingPlayer = getCurrentDuelPlayer(duel)
  const defendingPlayer = getOtherPlayerByPlayerId(duel, duel.currentPlayerId)

  // Combat until a winner is determined
  // Loop to some safe maximum to avoid looping infinitely
  for (let y = 0; y < 30; y++) {
    let attackingCard = attackingPlayer.row[0]
    let defendingCard = defendingPlayer.row[0]

    // Tie
    if (attackingCard === undefined && defendingCard === undefined) {
      break
    }

    // damage to face
    // Once face is hit, battle ends
    if (attackingCard !== undefined && defendingCard === undefined) {
      duel = await playAnimation(duel, {
        id: "ATTACK_START",
        durationMs: 200,
        cardIds: [attackingCard.instanceId],
      })
      defendingPlayer.health -= 1
      duel = await playAnimation(duel, {
        id: "ATTACK_END",
        durationMs: 200,
        cardIds: [attackingCard.instanceId],
      })
      break
    }
    if (attackingCard === undefined && defendingCard !== undefined) {
      duel = await playAnimation(duel, {
        id: "ATTACK_START",
        durationMs: 200,
        cardIds: [defendingCard.instanceId],
      })
      attackingPlayer.health -= 1
      duel = await playAnimation(duel, {
        id: "ATTACK_END",
        durationMs: 200,
        cardIds: [defendingCard.instanceId],
      })
      break
    }

    if (attackingCard.cardType !== "creature" || defendingCard.cardType !== "creature") {
      throw Error("combatPhase: cards in battle aren't creatures")
    }

    // Trigger effects of support cards
    for (let y = attackingPlayer.row.length - 1; y >= 1; y--) {
      const card = attackingPlayer.row[y]
      const supportEffect = cardBehaviourMap[card?.name ?? ""]?.effects?.support
      if (supportEffect !== undefined) {
        duel = await supportEffect(duel, card.instanceId)
      }
    }
    for (let y = defendingPlayer.row.length - 1; y >= 1; y--) {
      const card = defendingPlayer.row[y]
      const supportEffect = cardBehaviourMap[card?.name ?? ""]?.effects?.support
      if (supportEffect !== undefined) {
        duel = await supportEffect(duel, card.instanceId)
      }
    }

    duel = await checkForDeaths(duel)
    if (
      attackingCard.instanceId !== attackingPlayer.row[0]?.instanceId ||
      defendingCard.instanceId !== defendingPlayer.row[0]?.instanceId
    ) {
      continue
    }

    const attackingBeforeAttackFunction = cardBehaviourMap[attackingCard.name].effects?.beforeAttack
    const defendingBeforeAttackFunction = cardBehaviourMap[defendingCard.name].effects?.beforeAttack
    if (attackingBeforeAttackFunction) {
      duel = await attackingBeforeAttackFunction(duel, attackingCard.instanceId)
    }

    duel = await checkForDeaths(duel)
    if (
      attackingCard.instanceId !== attackingPlayer.row[0]?.instanceId ||
      defendingCard.instanceId !== defendingPlayer.row[0]?.instanceId
    ) {
      continue
    }

    if (defendingBeforeAttackFunction) {
      duel = await defendingBeforeAttackFunction(duel, defendingCard.instanceId)
    }

    duel = await checkForDeaths(duel)
    if (
      attackingCard.instanceId !== attackingPlayer.row[0]?.instanceId ||
      defendingCard.instanceId !== defendingPlayer.row[0]?.instanceId
    ) {
      continue
    }

    // Trade
    duel = await playAnimation(duel, {
      id: "ATTACK_START",
      durationMs: 200,
      cardIds: [attackingCard.instanceId, defendingCard.instanceId],
    })
    if (attackingCard !== undefined && defendingCard !== undefined) {
      duel = await creaturesTrade(duel, attackingCard.instanceId, defendingCard.instanceId)
    }
    duel = await playAnimation(duel, {
      id: "ATTACK_END",
      durationMs: 200,
      cardIds: [attackingCard.instanceId, defendingCard.instanceId],
    })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

    // Trigger effects of attacking cards
    const afterAttackEffect = cardBehaviourMap[attackingCard?.name ?? ""]?.effects?.afterAttack
    if (attackingCard && afterAttackEffect !== undefined) {
      duel = await afterAttackEffect(duel, attackingCard.instanceId)
    }

    duel = await checkForDeaths(duel)
  }

  duel = await cleanUpCardsInPlay(duel)

  return duel
}
