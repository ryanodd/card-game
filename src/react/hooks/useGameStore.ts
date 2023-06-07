import { GameState } from "@/src/game/GameData"
import { createNewDuel } from "@/src/game/createNewDuel"
import { create } from "zustand"

export const initialGameState: GameState = {
  activeDeckIndex: 0,
  decks: [
    {
      name: "Starter",
      cardNumbers: [1, 3, 4, 5, 6, 7, 1, 3, 4, 5, 6, 1, 3, 4, 7, 1, 3, 4, 5, 6, 7, 1, 3, 4, 5, 6, 1, 3, 4, 7],
    },
  ],
}

export type GameStorePayload = {
  game: GameState
  setGame: (newGame: GameState) => void
  rerender: () => void
  setRerenderFunction: (newRerenderFunction: () => void) => void
}

export const useGameStore = create<GameStorePayload>((set) => ({
  game: initialGameState,
  setGame: (newGame) => set({ game: newGame }),
  rerender: () => {},
  setRerenderFunction: (newRerenderFunction) => set({ rerender: newRerenderFunction }),
}))
