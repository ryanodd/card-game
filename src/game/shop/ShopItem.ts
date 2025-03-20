import { CardName } from "../cards/CardName"
import { PackVariant } from "../Packs"

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
