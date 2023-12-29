import { getEmptyEnergySelectedFromCounts, useDuelUIStore } from "../react/hooks/useDuelUIStore"
import { executeChoiceForOpponent } from "./Bot"
import { AnimatedDuelState, DuelState } from "./DuelData"
import { addAnimationToDuel, duelWinner } from "./DuelHelpers"
import { GameState } from "./GameData"
import { useGameStore } from "../react/hooks/useGameStore"
import { getDuelState, useDuelState } from "../react/hooks/useDuelState"

export type DuelParams = {
  game: GameState
  opponentDeckCardNames: string[]
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

  // Execute choices for opponent until human choice is next
  while (duel.choice.playerId === "opponent") {
    duel = addAnimationToDuel(duel, { id: "PAUSE", duration: 400 })
    duel = executeChoiceForOpponent(duel)
  }

  const { setDuel } = getDuelState()
  setDuel(duel)
  useGameStore.getState().rerender()

  // Animation Time
  if (!("animationQueue" in duel)) {
    throw Error("no animationQueue found in this duel")
  }
  const nextAnimation = duel.animationQueue[0]?.animation
  if (nextAnimation) {
    setTimeout(() => {
      const { duel: duelToAnimate } = getDuelState()
      if (!("animationQueue" in duelToAnimate)) {
        throw Error("no animationQueue found in this duel")
      }
      duelToAnimate.animationQueue.shift()
      saveAndRerenderDuel(duelToAnimate) // Caution - this is recursion until animationQueue is done
    }, nextAnimation.duration)
  } else {
    resetDuelUIStore(duel)
  }
}
