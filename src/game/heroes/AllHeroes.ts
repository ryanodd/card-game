import { HeroName } from "../duel/heroBehaviour/HeroName"
import { HeroData } from "./HeroData"

let heroes: HeroData[] = []

heroes.push({
  name: "Fire Hero",
  stats: {
    health: 25,
    speed: 50,
  },
  imageSrc: "/card-art/spiritGiant.png",
})

heroes.push({
  name: "Water Hero",
  stats: {
    health: 25,
    speed: 50,
  },
  imageSrc: "/card-art/somethingCaptain.png",
})

heroes.push({
  name: "Earth Hero",
  stats: {
    health: 25,
    speed: 50,
  },
  imageSrc: "/card-art/hero3.png",
})

heroes.push({
  name: "Air Hero",
  stats: {
    health: 25,
    speed: 50,
  },
  imageSrc: "/card-art/hero4.png",
})

export const heroDataMap: Record<HeroName, HeroData> = heroes.reduce((heroesByName, hero) => {
  heroesByName[hero.name] = hero
  return heroesByName
}, {} as Record<HeroName, HeroData>)
