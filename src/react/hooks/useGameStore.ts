import { deckMap } from "@/src/game/Decks"
import { GameState } from "@/src/game/GameData"
import { cardDataMap } from "@/src/game/cards/AllCards"
import { CardName } from "@/src/game/cards/CardName"
import { create } from "zustand"

export const allCardsGameState: GameState = {
  screen: { id: "mainMenu" },
  activeDeckId: "starterDeck",
  collection: {
    ...Object.values(cardDataMap).reduce((prev, cardData) => {
      prev[cardData.name] = 4
      return prev
    }, {} as Record<CardName, number>),
    "Fire Energy": 60,
    "Water Energy": 60,
    "Earth Energy": 60,
    "Air Energy": 60,
  },
  currentCampaign: undefined,
  campaignCompletion: {},
  decks: [deckMap["starterDeck"], deckMap["firstOpponent"]],
  gold: 200,
  settings: {
    debug: {
      enabled: false,
      animationMultiplier: 1,
    },
  },
}

export const startingCollection: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    prev[cardData.name] = 0
    return prev
  }, {} as Record<CardName, number>),
  "Golden Friend": 2,
  "Elder Saurus": 2,
  "Fire Energy": 60,
  "Water Energy": 60,
  "Earth Energy": 60,
  "Air Energy": 60,
}

export const initialGameState: GameState = {
  screen: { id: "mainMenu" },
  activeDeckId: "starterDeck",
  collection: startingCollection,
  currentCampaign: undefined,
  campaignCompletion: {},
  decks: [deckMap["starterDeck"], deckMap["firstOpponent"]],
  gold: 200,
  settings: {
    debug: {
      enabled: false,
      animationMultiplier: 1,
    },
  },
}

export type GameStorePayload = {
  game: GameState
  setGame: (newGame: GameState) => void
  rerender: () => void
  setRerenderFunction: (newRerenderFunction: () => void) => void
}

export const useGameStore = create<GameStorePayload>((set) => ({
  game: allCardsGameState,
  setGame: (newGame) => set({ game: newGame }),
  rerender: () => {},
  setRerenderFunction: (newRerenderFunction) => set({ rerender: newRerenderFunction }),
}))
