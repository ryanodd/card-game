import { v4 } from "uuid"
import { useDuelStore } from "../react/hooks/useDuelStore"
import { EnergySelected, getEmptyEnergySelectedFromCounts, useDuelUIStore } from "../react/hooks/useDuelUIStore"
import { executeChoiceForOpponent } from "./Bot"
import { ChoiceID } from "./Choices"
import { DuelState } from "./DuelData"
import { duelWinner, getCurrentDuelPlayer } from "./DuelHelpers"
import { GameState } from "./GameData"
import { useGameStore } from "../react/hooks/useGameStore"

export type DuelParams = {
  game: GameState
  opponentDeckCardNos: number[]
}

export const resetDuelUIStore = (duel: DuelState) => {
  useDuelUIStore.getState().setCardIdToBePlayed(null)
  useDuelUIStore.getState().setAttackersToDeclare([])
  useDuelUIStore.getState().setSpaceIdToAttack(null)
  useDuelUIStore.getState().setSpaceIdToDefend(null)
  useDuelUIStore.getState().setDefendersToAttackers({})

  const newEnergySelected = getEmptyEnergySelectedFromCounts(duel.human.energy)
  useDuelUIStore.getState().setEnergySelected(newEnergySelected)
}

export const saveAndRerenderDuel = (inputDuel: DuelState) => {
  let duel = inputDuel
  const winner = duelWinner(duel)

  if (winner !== null) {
  }

  while (duel.choice.playerId === "opponent") {
    duel = executeChoiceForOpponent(duel)
  }

  resetDuelUIStore(duel)
  useGameStore.getState().rerender()
  useDuelStore.getState().setDuel(duel)
}
