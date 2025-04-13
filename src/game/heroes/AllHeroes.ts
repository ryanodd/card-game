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
  text: [
    {
      variant: "default",
      textList: [{ energyIcons: ["fire", "fire", "fire", "fire", "fire", "fire", "fire", "fire", "fire", "fire"] }],
    },
  ],
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
  text: [
    {
      variant: "default",
      textList: [
        { energyIcons: ["water", "water", "water", "water", "water", "water", "water", "water", "water", "water"] },
      ],
    },
  ],
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
  text: [
    {
      variant: "default",
      textList: [
        { energyIcons: ["earth", "earth", "earth", "earth", "earth", "earth", "earth", "earth", "earth", "earth"] },
      ],
    },
  ],
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
  text: [
    {
      variant: "default",
      textList: [{ energyIcons: ["air", "air", "air", "air", "air", "air", "air", "air", "air", "air"] }],
    },
  ],
  health: 25,
  speed: 25,
  complete: true,
})

////////////////// DUAL-TYPE /////////////////////

heroes.push({
  name: "Jet",
  imageSrc: "/heroes/jet.jpg",
  imageCenterYPercent: 25,
  rarity: "base",
  energyType: "multi",
  energyTypes: ["fire", "water"],
  text: [
    {
      variant: "default",
      textList: [
        { energyIcons: ["fire", "fire", "fire", "fire", "fire", "water", "water", "water", "water", "water"] },
      ],
    },
  ],
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Scorch",
  imageSrc: "/heroes/scorch.jpg",
  imageCenterYPercent: 25,
  rarity: "base",
  energyType: "multi",
  energyTypes: ["fire", "earth"],
  text: [
    {
      variant: "default",
      textList: [
        { energyIcons: ["fire", "fire", "fire", "fire", "fire", "earth", "earth", "earth", "earth", "earth"] },
      ],
    },
  ],
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Pyroenix",
  imageSrc: "/heroes/pyroenix.jpg",
  imageCenterYPercent: 25,
  rarity: "base",
  energyType: "multi",
  energyTypes: ["fire", "air"],
  text: [
    {
      variant: "default",
      textList: [{ energyIcons: ["fire", "fire", "fire", "fire", "fire", "air", "air", "air", "air", "air"] }],
    },
  ],
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Rocco",
  imageSrc: "/heroes/rocco.jpg",
  imageCenterYPercent: 25,
  rarity: "base",
  energyType: "multi",
  energyTypes: ["water", "earth"],
  text: [
    {
      variant: "default",
      textList: [
        { energyIcons: ["water", "water", "water", "water", "water", "earth", "earth", "earth", "earth", "earth"] },
      ],
    },
  ],
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Wishtopher",
  imageSrc: "/heroes/wishtopher.jpg",
  imageCenterYPercent: 25,
  rarity: "base",
  energyType: "multi",
  energyTypes: ["water", "air"],
  text: [
    {
      variant: "default",
      textList: [{ energyIcons: ["water", "water", "water", "water", "water", "air", "air", "air", "air", "air"] }],
    },
  ],
  health: 25,
  speed: 25,
  complete: true,
})

heroes.push({
  name: "Robbyn",
  imageSrc: "/heroes/robbyn.jpg",
  imageCenterYPercent: 25,
  rarity: "base",
  energyType: "multi",
  energyTypes: ["earth", "air"],
  text: [
    {
      variant: "default",
      textList: [{ energyIcons: ["earth", "earth", "earth", "earth", "earth", "air", "air", "air", "air", "air"] }],
    },
  ],
  health: 25,
  speed: 25,
  complete: true,
})

export const heroDataMap: Record<HeroName, HeroData> = heroes.reduce((heroesByName, hero) => {
  heroesByName[hero.name] = hero
  return heroesByName
}, {} as Record<HeroName, HeroData>)
