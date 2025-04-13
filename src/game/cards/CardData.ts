import { EnergyCostEnergy, EnergyCounts, EnergyType } from "../duel/EnergyData"
import { CardName } from "./CardName"

export type Rarity = "base" | "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

export type Keyword = "Backup" | "Trample" | "Shield" | "Charge" | "Burn" | "Stun" | "Scry"

export const keywordDescriptions: Record<Keyword, string> = {
  Backup: "Triggered whenever another friendly monster in its row attacks.",
  Trample: "Leftover attack damage is done to the monsters and heroes behind the target.",
  Shield: "Prevents damage once, then disappears.",
  Charge: "Monsters with Charge can attack on the turn they're played.",
  Burn: "Whenever burned monsters lose HP, they lose 1 extra HP.",
  Stun: "Stunned monsters cannot deal any damage until after their next attack.",
  Scry: "Look at the top card of the deck. Choose whether to put it back, or put it on the bottom of the deck.",
}

export type CardTextIconName = "damage" | "dice" | "heart" | "sword" | EnergyType

export type CardText =
  | { plainText: string }
  | { boldText: string }
  | { keyword: Keyword }
  | { icon: CardTextIconName }
  | { energyIcons: EnergyType[] }

export type CardTextParagraph = {
  variant?: "default" | "flavor"
  textList: CardText[]
}

export type CardCost = EnergyCounts & {
  dualType?: {
    quantity: number
    primary: EnergyType
    secondary: EnergyType
  }
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
      cost: CardCost
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
