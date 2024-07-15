import { COLLECTION_MAX_PER_CARD, GameState } from "../GameData"
import { CardName } from "../cards/CardName"
import { getShopCostForCard } from "./getShopCostForCard"

export const buyCard = (game: GameState, cardName: CardName): GameState => {
  const quantityOwned = game.collection[cardName]

  if (quantityOwned > COLLECTION_MAX_PER_CARD) {
    throw Error("tried to buy a card when you already have the maximum owned")
  }

  const cost = getShopCostForCard(cardName)
  game.gold -= cost
  game.collection[cardName] = quantityOwned + 1

  return game
}
