import { cardDataMap } from "../../cards/allCards/allCards"
import { DuelState } from "../DuelData"
import { getCurrentDuelPlayer } from "../DuelHelpers"
import { EnergyCounts } from "../EnergyData"
import { PlayerID } from "../PlayerData"
import { cardBehaviourMap } from "../cardBehaviour/allCardBehaviour/allCardBehaviours"
import { Target } from "../choices/ChoiceData"
import { playAnimation } from "../control/playAnimation"
import { isEnergySufficient } from "../energy/isEnergySufficient"
import { checkForDeaths } from "./checkForDeaths"

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
  if (!isEnergySufficient(energyPaid, playedCard.cost)) {
    throw Error("Can't afford to play this card")
  }

  // Pay energy
  player.energy.neutral -= energyPaid.neutral
  player.energy.fire -= energyPaid.fire
  player.energy.water -= energyPaid.water
  player.energy.earth -= energyPaid.earth
  player.energy.air -= energyPaid.air

  const cardBehaviour = cardBehaviourMap[playedCard.name]

  // Remove from hand
  player.hand = player.hand.filter((card) => {
    return card.instanceId !== cardId
  })
  // Put creature in space
  if (playedCard.cardType === "creature" && target.targetType === "rowSpace") {
    player.row.splice(target.positionIndex, 0, playedCard)

    if (duel.currentPlayerId === "opponent") {
      duel = await playAnimation(duel, { id: "SUMMON", durationMs: 200, cardId })
    }

    if (cardBehaviour.effects?.summon) {
      duel = await cardBehaviour.effects.summon(duel, playedCard.instanceId)
    }
    if (cardDataMap[playedCard.name].keywords?.includes("Shield")) {
      playedCard.shield = true
    }
  }

  if (playedCard.cardType === "spell") {
    player.inPlay = playedCard
  }

  if (cardBehaviour.effects?.play) {
    duel = await cardBehaviour.effects.play(duel, playedCard.instanceId, target)
  }

  // Put card in discard
  if (playedCard.cardType === "spell") {
    player.inPlay = null
    player.discard.push(playedCard)
  }

  duel = await checkForDeaths(duel)

  return duel
}
