import { DuelState, EnergyCounts, PlayerID } from "../DuelData"
import { getCurrentDuelPlayer, isEnergySufficient } from "../DuelHelpers"
import { cardBehaviourMap } from "../cardBehaviour/AllCardBehaviours"
import { Target } from "../choices/ChoiceData"

export type PlayCardParams = {
  playerId: PlayerID
  cardId: string
  target: Target
  energyPaid: EnergyCounts
}

export async function playCardFromHand(inputDuel: DuelState, { cardId, target, energyPaid }: PlayCardParams) {
  let duel = inputDuel
  const player = getCurrentDuelPlayer(duel)
  const playedCard = player.hand.find((card) => {
    return card.instanceId === cardId
  })
  if (!playedCard) {
    throw Error("something went wrong playing a card")
  }
  if (!isEnergySufficient(energyPaid, playedCard.cost, true)) {
    throw Error("Can't afford to play this card (or paid too much)")
  }

  // Remove from hand
  player.hand = player.hand.filter((card) => {
    return card.instanceId !== cardId
  })

  // Pay energy
  player.energy.neutral -= energyPaid.neutral
  player.energy.fire -= energyPaid.fire
  player.energy.water -= energyPaid.water
  player.energy.earth -= energyPaid.earth
  player.energy.air -= energyPaid.air

  const cardBehaviour = cardBehaviourMap[playedCard.name]
  if (cardBehaviour.effects?.play) {
    duel = await cardBehaviour.effects.play(duel, duel.currentPlayerId, playedCard.instanceId, target)
  }

  // Put creature in space
  if (playedCard.cardType === "creature" && target.targetType === "rowSpace") {
    const row = player.rows[target.rowIndex]

    row.splice(target.positionIndex, 0, playedCard)

    if (cardBehaviour.effects?.summon) {
      duel = await cardBehaviour.effects.summon(duel, duel.currentPlayerId, playedCard.instanceId)
    }
  }

  if (playedCard.cardType === "energy" && target.targetType === "playArea") {
    player.playedEnergyThisTurn = true
  }

  return duel
}
