import { Deck, EditDeckState } from "./Deck"
import { DuelState } from "./DuelData"

export type ScreenState =
  | { id: "mainMenu" }
  | { id: "campaignSelect" }
  | { id: "shop" }
  | { id: "manageDecks" }
  | EditDeckState
  | DuelState
  | { id: "dragAndDropDemo" } // | { id: "duelEnd" }

export type SettingsState = {
  debug: {
    enabled: boolean
    animationMultiplier: number
  }
}

export type GameState = {
  screen: ScreenState
  activeDeckId: string | null
  collection: Record<string, number>
  currentCampaign?: {
    campaignId: string
    round: number
    deck: Deck
  }
  campaignCompletion: Record<string, boolean>
  decks: Deck[]
  gold: number
  settings: SettingsState
}

export const getActiveDeck = (game: GameState) => {
  return game.decks.find((deck) => {
    return deck.id === game.activeDeckId
  })
}
