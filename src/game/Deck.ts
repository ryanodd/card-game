import { CardName } from "./cards/CardName"

export const DECK_MIN_SIZE = 50

export type Deck = {
  id: string
  name: string
  cardNames: CardName[]
}

export type EditDeckState = {
  id: "editDeck"
  deck: Deck
}
