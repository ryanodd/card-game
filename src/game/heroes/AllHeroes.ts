import { HeroName } from "../duel/heroBehaviour/HeroName"
import { HeroData } from "./HeroData"

let heroes: HeroData[] = []

heroes.push({
  name: "Garmuk",
  imageSrc: "/heroes/garmuk.png",
  imageCenterYPercent: 40,
  rarity: "base",
  energyType: "fire",
  energyTypes: ["fire"],
  text: "Produces fire energy.",
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Lappy",
  imageSrc: "/heroes/lappy.png",
  imageCenterYPercent: 45,
  rarity: "base",
  energyType: "water",
  energyTypes: ["water"],
  text: "Produces water energy.",
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Elozar the Steadfast",
  imageSrc: "/heroes/elozarTheSteadfast.png",
  imageCenterYPercent: 32,
  rarity: "base",
  energyType: "earth",
  energyTypes: ["earth"],
  text: "Produces earth energy.",
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Orrin Stormwing",
  imageSrc: "/heroes/orrinStormwing.png",
  imageCenterYPercent: 25,
  rarity: "base",
  energyType: "air",
  energyTypes: ["air"],
  text: "Produces air energy.",
  health: 25,
  speed: 25,
  complete: true,
})

export const heroDataMap: Record<HeroName, HeroData> = heroes.reduce((heroesByName, hero) => {
  heroesByName[hero.name] = hero
  return heroesByName
}, {} as Record<HeroName, HeroData>)
