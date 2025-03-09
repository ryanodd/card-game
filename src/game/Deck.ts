import { CardName } from "./cards/CardName"
import { HeroName } from "./duel/heroBehaviour/HeroName"

export const DECK_MIN_SIZE = 50

export type Deck = {
  id: string
  name: string
  heroName: HeroName
  cardNames: CardName[]
}
