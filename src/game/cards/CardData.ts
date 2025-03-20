import { EnergyCounts, EnergyType } from "../duel/EnergyData"
import { CardName } from "./CardName"

export type Rarity = "base" | "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

export type Keyword = "support" | "trample" | "shield"

export type CardData =
  | {
      name: CardName
      imageSrcSmall: string
      imageSrcLarge: string
      imageCenterYPercent: number
      rarity: Rarity
      complete: boolean

      energyType: EnergyType | "multi"
      text?: string
      keywords?: Keyword[]
      cost: EnergyCounts
    } & (
      | {
          cardType: "creature"
          attack: number
          health: number
        }
      | {
          cardType: "spell"
        }
    )
