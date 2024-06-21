import { getDuelState } from "@/src/react/hooks/useDuelState"
import { DuelState } from "../DuelData"
import { useGameStore } from "@/src/react/hooks/useGameStore"
import { resetDuelUIStore } from "./resetDuelUIStore"

// Does everything you need to do after a game logic is done and the screen needs to update
export const saveDuelAndRefreshUI = (duel: DuelState) => {
  // Set up animation duration injection, every time the duel is showing an animation
  if (duel.currentAnimation !== null) {
    const root = document.documentElement
    root.style.setProperty("--current-animation-duration", `${duel.currentAnimation?.durationMs}ms`) // If this is undefined is that a problem?
  }

  // I don't know the correct order of these 2, though it may not matter
  // (1)
  const { setDuel } = getDuelState()
  setDuel(duel)
  // (2)
  resetDuelUIStore(duel)

  useGameStore.getState().rerender()
}
