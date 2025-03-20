import { GameState } from "../GameData"
import { addCard } from "./addCard"
import { addPack } from "./addPack"
import { ShopItem } from "./ShopItem"

export const buyShopItem = (game: GameState, shopItem: ShopItem): GameState => {
  game.gold -= shopItem.price
  if (shopItem.type === "card") {
    game = addCard(game, shopItem.cardName)
  }
  if (shopItem.type === "pack") {
    game = addPack(game, shopItem.packVariant)
  }
  return game
}
