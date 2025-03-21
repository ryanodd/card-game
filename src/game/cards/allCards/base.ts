import { CardData } from "../CardData"

const cards: CardData[] = []

cards.push({
  name: "Golden Friend",
  imageSrcSmall: "/card-art/96x96/goldenFriend.png",
  imageSrcLarge: "/card-art/512x512/goldenFriend.png",
  imageCenterYPercent: 55,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Zardian Raider",
  imageSrcSmall: "/card-art/96x96/zardianRaider.png",
  imageSrcLarge: "/card-art/512x512/zardianRaider.png",
  imageCenterYPercent: 40,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Emerald Makasaur",
  imageSrcSmall: "/card-art/96x96/emeraldMakasaur.png",
  imageSrcLarge: "/card-art/512x512/emeraldMakasaur.png",
  imageCenterYPercent: 60,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 4,
  health: 4,
  cost: {
    neutral: 4,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Elder Saurus",
  imageSrcSmall: "/card-art/96x96/elderSaurus.png",
  imageSrcLarge: "/card-art/512x512/elderSaurus.png",
  imageCenterYPercent: 45,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 5,
  health: 5,
  cost: {
    neutral: 5,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Dragon Cub",
  imageSrcSmall: "/card-art/96x96/dragonCub.png",
  imageSrcLarge: "/card-art/512x512/dragonCub.png",
  imageCenterYPercent: 30,
  rarity: "base",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: "Support: 30% chance to burn opposing creature.",
  keywords: ["support"],
})
