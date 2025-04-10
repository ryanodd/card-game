import { CardState } from "../DuelData"

export const resetCard = (card: CardState) => {
  if (card.cardType === "creature") {
    card.damage = 0
    card.modifiers = []
    card.status = null
  }
}
