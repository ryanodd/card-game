import { EnergyCounts, EnergyType } from "../duel/EnergyData"
import { CardName } from "./CardName"

export type Rarity = "base" | "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

export type Keyword = "Backup" | "Trample" | "Shield" | "Charge" | "Burn" | "Stun" | "Scry"

export const keywordDescriptions: Record<Keyword, string> = {
  Backup: "aaaa",
  Trample: "",
  Shield: "",
  Charge: "",
  Burn: "Burned monsters lose 1hppppppp",
  Stun: "Stunned monsters cannot deal any damage until after their next attack.",
  Scry: "",
}

export type CardTextIconName = "damage" | "dice" | "heart" | "sword"

export type CardText = { plainText: string } | { boldText: string } | { keyword: Keyword } | { icon: CardTextIconName }

export type CardTextParagraph = {
  variant: "default" | "flavor"
  textList: CardText[]
}

export type CardData =
  | {
      name: CardName
      imageSrcSmall: string
      imageSrcLarge: string
      imageCenterYPercent: number
      rarity: Rarity
      complete: boolean

      energyType: EnergyType | "multi"
      text?: CardTextParagraph[]
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
