import { COLLECTION_MAX_PER_CARD, GameState } from "../GameData"
import { CardName } from "../cards/CardName"
import { getShopCostForCard } from "./getShopCostForCard"

export const addCard = (game: GameState, cardName: CardName): GameState => {
  const quantityOwned = game.cardCollection[cardName]
  if (quantityOwned > COLLECTION_MAX_PER_CARD) {
    throw Error("tried to add a card when you already have the maximum owned")
  }

  game.cardCollection[cardName] = quantityOwned + 1

  return game
}
