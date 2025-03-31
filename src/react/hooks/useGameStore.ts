import { DECK_MIN_SIZE } from "@/src/game/decks/Deck"
import { GameState } from "@/src/game/GameData"
import { CardName } from "@/src/game/cards/CardName"
import { HeroName } from "@/src/game/duel/heroBehaviour/HeroName"
import { heroDataMap } from "@/src/game/heroes/AllHeroes"
import { loadGameFromLocalStorage, saveGameToLocalStorage } from "@/src/utils/localStorage"
import { create } from "zustand"
import { generateDeck } from "@/src/game/decks/generateDeck"
import { createLeague } from "@/src/game/league/createLeague"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"
import { gameStateSetup } from "@/src/game/gameStateSetup"

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
  "Elder Saurus": 1,
}

export const STARTING_COLLECTION: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    if (cardData.rarity === "base") {
      prev[cardData.name] = 4
    } else {
      prev[cardData.name] = 0
    }

    return prev
  }, {} as Record<CardName, number>),
}

export const ALL_HEROES_COLLECTION: Record<HeroName, boolean> = {
  ...Object.values(heroDataMap).reduce((prev, heroData) => {
    prev[heroData.name] = true
    return prev
  }, {} as Record<HeroName, boolean>),
}

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
  decks: [
    generateDeck({ method: "completely-random" }),
    generateDeck({ method: "hero", heroName: "Garmuk" }),
    generateDeck({ method: "hero", heroName: "Lappy" }),
    generateDeck({ method: "hero", heroName: "Elozar the Steadfast" }),
    generateDeck({ method: "hero", heroName: "Orrin Stormwing" }),
  ],
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
  return { ...gameState, screen: { id: "mainMenu" } }
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
