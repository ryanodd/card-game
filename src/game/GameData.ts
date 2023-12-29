import { Deck, EditDeckState } from "./Deck"
import { DuelState } from "./DuelData"

export type ScreenState = { id: "mainMenu" } | { id: "manageDecks" } | DuelState | EditDeckState

export type GameState = {
  screen: ScreenState
  activeDeckId: string | null
  collection: Record<string, number>
  decks: Deck[]
}

export const getActiveDeck = (game: GameState) => {
  return game.decks.find((deck) => {
    return deck.id === game.activeDeckId
  })
}
