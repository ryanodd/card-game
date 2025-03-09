import { HeroName } from "../duel/heroBehaviour/HeroName"

export type HeroData = {
  name: HeroName
  stats: {
    health: number
    speed: number // Determines who goes first?
  }
  imageSrc: string
}
