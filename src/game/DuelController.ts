import { getEnergyButtonsForPlayer, useDuelUIStore } from "../react/hooks/useDuelUIStore"
import { executeChoiceForOpponent } from "./Bot"
import { AnimatedDuelState, DuelState } from "./DuelData"
import { addAnimationToDuel, duelWinner } from "./DuelHelpers"
import { GameState } from "./GameData"
import { useGameStore } from "../react/hooks/useGameStore"
import { getDuelState } from "../react/hooks/useDuelState"
import { Deck } from "./Deck"
import { ChoiceID } from "./Choices"

export type DuelParams = {
  game: GameState
  opponentDeck: Deck
}

export const resetDuelUIStore = (duel: DuelState) => {
  useDuelUIStore.getState().setCardIdToBePlayed(null)

  const newEnergySelected = getEnergyButtonsForPlayer(duel.human)
  useDuelUIStore.getState().setEnergySelected(newEnergySelected)
}

export const saveAndAdvanceDuelUntilChoice = (inputDuel: DuelState) => {
  let duel = inputDuel
  const { setDuel } = getDuelState()

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

      // Recursive call
      saveAndAdvanceDuelUntilChoice(duelToAnimate) // Caution - this is recursion until animationQueue is done
    }, nextAnimation.duration)

    resetDuelUIStore(duel)
    setDuel(duel)
    useGameStore.getState().rerender()
    return
  }

  if (duelWinner(duel)) {
    duel.choice = { id: "CONFIRM_DUEL_END", playerId: "human" }
    resetDuelUIStore(duel)

    resetDuelUIStore(duel)
    setDuel(duel)
    useGameStore.getState().rerender()
    return
  }

  // Execute choices for opponent until human choice is next
  if (duel.choice.playerId === "opponent") {
    // Animate a pause
    duel = addAnimationToDuel(duel, { id: "PAUSE", duration: 800 })
    resetDuelUIStore(duel)
    setDuel(duel)
    useGameStore.getState().rerender()

    // Render the choice having been made
    duel = executeChoiceForOpponent(duel)
    saveAndAdvanceDuelUntilChoice(duel)
    return
  }

  // player choice
  resetDuelUIStore(duel)
  setDuel(duel)
  useGameStore.getState().rerender()
}
