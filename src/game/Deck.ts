import { CardData } from "./Cards"

export type Deck = {
  id: string
  name: string
  cardNames: string[]
}

export type EditDeckState = {
  id: "editDeck"
  deck: Deck
}
