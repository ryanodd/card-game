import { HeroName } from "../duel/heroBehaviour/HeroName"
import { HeroData } from "./HeroData"

let heroes: HeroData[] = []

heroes.push({
  name: "Fire Hero",
  imageSrc: "/card-art/512x512/spiritGiant.png",
  imageCenterYPercent: 50,
  rarity: "base",
  energyType: "fire",
  energyTypes: ["fire"],
  text: "Produces fire energy.",
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Water Hero",
  imageSrc: "/card-art/512x512/somethingCaptain.png",
  imageCenterYPercent: 50,
  rarity: "base",
  energyType: "water",
  energyTypes: ["water"],
  text: "Produces water energy.",
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Earth Hero",
  imageSrc: "/card-art/512x512/hero3.png",
  imageCenterYPercent: 50,
  rarity: "base",
  energyType: "earth",
  energyTypes: ["earth"],
  text: "Produces earth energy.",
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Air Hero",
  imageSrc: "/card-art/512x512/hero4.png",
  imageCenterYPercent: 50,
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
