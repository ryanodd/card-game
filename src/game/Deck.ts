import { CardName } from "./cards/CardData"

export type Deck = {
  id: string
  name: string
  cardNames: CardName[]
}

export type EditDeckState = {
  id: "editDeck"
  deck: Deck
}
