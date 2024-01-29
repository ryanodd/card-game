import { Deck, EditDeckState } from "./Deck"
import { DuelState } from "./DuelData"

export type ScreenState = { id: "mainMenu" } | { id: "manageDecks" } | EditDeckState | DuelState // | { id: "duelEnd" }

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
  decks: Deck[]
  settings: SettingsState
}

export const getActiveDeck = (game: GameState) => {
  return game.decks.find((deck) => {
    return deck.id === game.activeDeckId
  })
}
