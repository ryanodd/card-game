import { DuelState } from "../../DuelData"
import { getCardByInstanceId, getCurrentDuelPlayer, isEnergySufficient } from "../../DuelHelpers"
import { takeTurn_getValidTargetsForCard } from "./getValidTargetsForCard"

export const takeTurn_getValidHandTargets = (duel: DuelState): string[] => {
  const playerHand = getCurrentDuelPlayer(duel).hand
  const energyCounts = getCurrentDuelPlayer(duel).energy
  const cardsAfforded = []
  for (let x = 0; x < playerHand.length; x++) {
    const card = playerHand[x]
    if (isEnergySufficient(energyCounts, card.cost, false)) {
      cardsAfforded.push(card.instanceId)
    }
  }
  const cardsAffordedWithTargets = cardsAfforded.filter((cardInstanceId) => {
    const card = getCardByInstanceId(duel, cardInstanceId)
    const targets = takeTurn_getValidTargetsForCard(duel, cardInstanceId)
    return targets.length > 0
  })
  return cardsAffordedWithTargets
}
