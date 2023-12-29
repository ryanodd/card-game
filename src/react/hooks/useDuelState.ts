import { DuelState } from "@/src/game/DuelData"
import { GameState } from "@/src/game/GameData"
import { createNewDuel } from "@/src/game/createNewDuel"
import { create } from "zustand"
import { useGameStore } from "./useGameStore"

export type DuelStorePayload = {
  duel: DuelState
  setDuel: (newDuel: DuelState) => void
}

export const useDuelState = () => {
  const { game, setGame } = useGameStore()

  const duelScreenState = game.screen
  if (duelScreenState.id !== "duel") {
    throw Error("Tried to use duel state when not on the duel screen!")
  }

  const setDuel = (duel: DuelState) => {
    setGame({
      ...game,
      screen: duel,
    })
  }
  return {
    duel: game.screen as DuelState,
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
      screen: duel,
    })
  }

  return { duel: game.screen, setDuel }
}
