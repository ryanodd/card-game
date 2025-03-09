import { DECK_MIN_SIZE } from "@/src/game/Deck"
import { deckMap } from "@/src/game/Decks"
import { GameState } from "@/src/game/GameData"
import { cardDataMap } from "@/src/game/cards/AllCards"
import { CardName } from "@/src/game/cards/CardName"
import { PackRarity } from "@/src/game/shop/PackData"
import { loadGameFromLocalStorage, saveGameToLocalStorage } from "@/src/utils/localStorage"
import { create } from "zustand"

export const ALL_CARDS_COLLECTION: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    prev[cardData.name] = DECK_MIN_SIZE
    return prev
  }, {} as Record<CardName, number>),
}

export const RYANS_FAVORITE_TEST_COLLECTION: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    prev[cardData.name] = 2
    return prev
  }, {} as Record<CardName, number>),
  "Golden Friend": 1,
  "Elder Saurus": 1,
}

export const STARTING_COLLECTION: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    prev[cardData.name] = 0
    return prev
  }, {} as Record<CardName, number>),
  "Golden Friend": 2,
  "Elder Saurus": 2,
}

export const NO_PACKS: Record<PackRarity, number> = {
  common: 0,
  uncommon: 0,
  rare: 0,
  epic: 0,
  legendary: 0,
  mythic: 0,
}

export const newGameState: GameState = {
  screen: { id: "mainMenu" },
  activeDeckId: "starterDeck",
  collection: RYANS_FAVORITE_TEST_COLLECTION,
  currentCampaign: undefined,
  campaignCompletion: {
    tutorial: { unlocked: true, completed: false },
    location1: { unlocked: false, completed: false },
    location2: { unlocked: false, completed: false },
    location3: { unlocked: false, completed: false },
  },
  decks: [deckMap["testDeck"], deckMap["starterDeck"], deckMap["firstOpponent"]],
  gold: 500,
  packs: NO_PACKS,
  settings: {
    animationMultiplier: 1,
    godMode: false,
  },
}

export const getInitialGameState = (): GameState => {
  const loadedGameState = loadGameFromLocalStorage()
  if (loadedGameState === null) {
    return newGameState
  }
  return { ...loadedGameState, screen: { id: "mainMenu" } }
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
