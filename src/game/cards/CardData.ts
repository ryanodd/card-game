import { EnergyCounts, EnergyType } from "../duel/EnergyData"
import { CardName } from "./CardName"

export type Rarity = "base" | "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

export type Keyword = "support" | "trample"

export type CardData = {
  name: CardName
  imageSrc: string
  imageCenterYPercent: number
  rarity: Rarity
  complete: boolean
  cardType: "creature" | "spell" | "energy"
  energyType: EnergyType | "multi"
  text?: string
  keywords?: Keyword[]
  cost: EnergyCounts
  attack?: number
  health?: number
}
