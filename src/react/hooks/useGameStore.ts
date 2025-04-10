import { GameState } from "@/src/game/GameData"
import { loadGameFromLocalStorage, saveGameToLocalStorage } from "@/src/utils/localStorage"
import { create } from "zustand"
import { generateDeck } from "@/src/game/decks/generateDeck"
import { createLeague } from "@/src/game/league/createLeague"
import { gameStateSetup } from "@/src/game/gameStateSetup"
import { ALL_HEROES_COLLECTION, STARTING_COLLECTION } from "@/src/game/collections"

export const newGameState: GameState = {
  screen: { id: "mainMenu" },
  activeDeckId: null,
  cardCollection: STARTING_COLLECTION,
  heroCollection: ALL_HEROES_COLLECTION,
  league: createLeague(),
  currentCampaign: undefined,
  campaignCompletion: {
    tutorial: { unlocked: true, completed: false },
    location1: { unlocked: false, completed: false },
    location2: { unlocked: false, completed: false },
    location3: { unlocked: false, completed: false },
  },
  decks: [generateDeck({ method: "hero", heroName: "Garmuk", name: "Starter deck", collection: STARTING_COLLECTION })],
  gold: 500,
  packs: {
    "Standard Pack": 1,
    "Elite Pack": 0,
  },
  settings: {
    animationMultiplier: 1,
    godMode: false,
  },
}

export const getInitialGameState = (): GameState => {
  let gameState = loadGameFromLocalStorage() ?? newGameState
  gameState = gameStateSetup(gameState)
  return gameState
}

export type GameStorePayload = {
  game: GameState
  setGame: (newGame: GameState) => void
  rerender: () => void
  setRerenderFunction: (newRerenderFunction: () => void) => void
}

export const useGameStore = create<GameStorePayload>((set) => ({
  game: getInitialGameState(),
  setGame: (newGame) => {
    saveGameToLocalStorage(newGame)
    return set({ game: newGame })
  },
  rerender: () => {},
  setRerenderFunction: (newRerenderFunction) => set({ rerender: newRerenderFunction }),
}))
