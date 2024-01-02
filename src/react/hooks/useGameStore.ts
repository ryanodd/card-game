import { GameState } from "@/src/game/GameData"
import { sortCardNames } from "@/src/game/helpers"
import { create } from "zustand"

export const initialGameState: GameState = {
  screen: { id: "mainMenu" },
  activeDeckId: "starterDeck",
  collection: {
    "Ember Foxling": 4,
    "Golden Friend": 4,
    "Winged Bull": 4,
    "Vengeful Flamewing": 4,
    "Greenwing Caller": 4,
    "Elder Saurus": 4,
    "Network of Snakes": 4,
    "Sludge Amphibian": 4,
  },
  decks: [
    {
      id: "starterDeck",
      name: "Starter",
      cardNames: sortCardNames([
        "Ember Foxling",
        "Ember Foxling",
        "Ember Foxling",
        "Ember Foxling",
        "Golden Friend",
        "Golden Friend",
        "Golden Friend",
        "Golden Friend",
        "Winged Bull",
        "Winged Bull",
        "Winged Bull",
        "Winged Bull",
        "Vengeful Flamewing",
        "Vengeful Flamewing",
        "Vengeful Flamewing",
        "Vengeful Flamewing",
        "Greenwing Caller",
        "Greenwing Caller",
        "Greenwing Caller",
        "Greenwing Caller",
        "Elder Saurus",
        "Elder Saurus",
        "Elder Saurus",
        "Elder Saurus",
      ]),
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
