import { DuelState } from "../../DuelData"
import { getCardByInstanceId, getCurrentDuelPlayer } from "../../DuelHelpers"
import { isEnergySufficient } from "../../energy/isEnergySufficient"
import { takeTurn_getValidTargetsForCard } from "./getValidTargetsForCard"

export const takeTurn_getPlayableHandCardIds = (duel: DuelState): string[] => {
  const playerHand = getCurrentDuelPlayer(duel).hand
  const energyCounts = getCurrentDuelPlayer(duel).energy
  const cardsAfforded = []
  for (let x = 0; x < playerHand.length; x++) {
    const card = playerHand[x]
    if (isEnergySufficient(energyCounts, card.cost)) {
      cardsAfforded.push(card.instanceId)
    }
  }
  const cardsAffordedWithValidTargets = cardsAfforded.filter((cardInstanceId) => {
    const card = getCardByInstanceId(duel, cardInstanceId)
    const targets = takeTurn_getValidTargetsForCard(duel, cardInstanceId)
    return targets.length > 0
  })
  return cardsAffordedWithValidTargets
}
