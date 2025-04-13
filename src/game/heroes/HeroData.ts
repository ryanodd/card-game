import { CardText, CardTextParagraph, Keyword, Rarity } from "../cards/CardData"
import { EnergyType } from "../duel/EnergyData"
import { HeroName } from "../duel/heroBehaviour/HeroName"

export type HeroData = {
  name: HeroName

  imageSrc: string
  imageCenterYPercent: number

  rarity: Rarity
  energyType: EnergyType | "multi"
  energyTypes: EnergyType[]

  text?: CardTextParagraph[]
  keywords?: Keyword[]

  health: number
  speed: number // Determines who goes first?

  complete: boolean
}
