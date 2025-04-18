import { getEnergyButtonsForPlayer, useDuelUIStore } from "@/src/react/hooks/useDuelUIStore"
import { DuelState } from "../DuelData"

export const resetDuelUIStore = (duel: DuelState) => {
  // TODO bug here when resetDuelUIStore is called beteen animations while the user is dragging a hand card, it gets dropped...
  // What does mtga do in this case?
  const uiState = useDuelUIStore.getState()
  uiState.setCardIdDragging(null)

  const newEnergySelected = getEnergyButtonsForPlayer(duel.human)
  uiState.setEnergySelected(newEnergySelected)

  // Reset hands
  // The human hand is tricky, we need to maintain hand order.
  const humanHandUICardIds = uiState.humanHandCardIds
  const humanHandStateCardIds = duel.human.hand.map((cardState) => {
    return cardState.instanceId
  })

  const newHumanHandUICardIds = [
    ...humanHandUICardIds.filter((cardId) => {
      return humanHandStateCardIds.includes(cardId)
    }),
    ...humanHandStateCardIds.filter((cardId) => {
      return !humanHandUICardIds.includes(cardId)
    }),
  ]
  uiState.setHumanHandCardIds(newHumanHandUICardIds)

  // Reset rows
  uiState.setHumanRowCardIds(
    duel.human.row
      .map((cardState) => {
        return cardState.instanceId
      })
      .reverse()
  )
}
