import { CardName } from "../cards/CardName"
import { PackVariant } from "../GameData"

export type ShopItem = {
  title: string
  price: number
} & (
  | {
      type: "card"
      cardName: CardName
    }
  | {
      type: "pack"
      packVariant: PackVariant
    }
)
