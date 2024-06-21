import { EnergyCounts } from "../duel/DuelData"
import { CardName } from "./CardName"

export type Rarity = "base" | "common" | "uncommon" | "rare" | "epic" | "mythic"

export type EnergyType = "neutral" | "fire" | "water" | "earth" | "air"

export type Keyword = "Support"

export type CardData = {
  name: CardName
  imageSrc: string
  imageCenterYPercent: number
  rarity: Rarity
  cardType: "creature" | "spell" | "energy"
  energyType: EnergyType | "multi" | "neutral"
  text?: string
  keywords?: Keyword[]
  cost: EnergyCounts
  attack?: number
  health?: number
}
