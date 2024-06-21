import { getEnergyButtonsForPlayer, useDuelUIStore } from "@/src/react/hooks/useDuelUIStore"
import { DuelState } from "../DuelData"

export const resetDuelUIStore = (duel: DuelState) => {
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
  uiState.setHumanAllRowCardIds(
    duel.human.rows.map((row) => {
      return row.map((cardState) => {
        return cardState.instanceId
      })
    })
  )
}
