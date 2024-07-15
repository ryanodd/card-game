import { DuelState } from "@/src/game/duel/DuelData"
import { useGameStore } from "./useGameStore"

export type DuelStorePayload = {
  duel: DuelState
  setDuel: (newDuel: DuelState) => void
}

// This can only be used on the duel screen. All these ts-ignores are a consequence of that
export const useDuelState = () => {
  const { game, setGame } = useGameStore()

  const duelScreenState = game.screen
  if (duelScreenState.id !== "duel") {
    throw Error("Tried to use duel state when not on the duel screen!")
  }

  const setDuel = (duel: DuelState) => {
    setGame({
      ...game,
      screen: {
        ...game.screen,
        // @ts-ignore
        duel,
      },
    })
  }
  return {
    // @ts-ignore
    duel: game.screen.duel as DuelState,
    setDuel,
  }
}

export const getDuelState = () => {
  const game = useGameStore.getState().game
  if (game.screen.id !== "duel") {
    throw Error("Tried to get duel state when not on the duel screen!")
  }

  const setGame = useGameStore.getState().setGame
  const setDuel = (duel: DuelState) => {
    setGame({
      ...game,
      screen: {
        ...game.screen,
        // @ts-ignore
        duel,
      },
    })
  }

  return { duel: game.screen, setDuel }
}
