import { deckMap } from "@/src/game/Decks"
import { GameState } from "@/src/game/GameData"
import { cardDataMap } from "@/src/game/cards/AllCards"
import { CardName } from "@/src/game/cards/CardData"
import { create } from "zustand"

export const initialGameState: GameState = {
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
    // "Ember Foxling": 4,
    // "Golden Friend": 4,
    // "Winged Bull": 4,
    // "Vengeful Flamewing": 4,
    // "Greenwing Caller": 4,
    // "Elder Saurus": 4,
    // "Snake Network": 4,
    // "Sludge Amphibian": 4,
    // "Merfin Yodeler": 4,
    // "Girabu, Colossal Guardian": 4,
    // "Fairy Buckfly": 4,
    // "Nyreth, Light Eater": 4,
    // "Komodo Teacher": 4,
    // "Living Hillside": 4,
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
