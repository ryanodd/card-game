import { CardData } from "../CardData"

export const baseCards: CardData[] = []

baseCards.push({
  name: "Plewb",
  imageSrcSmall: "/card-art/512x512/plewb.png",
  imageSrcLarge: "/card-art/512x512/plewb.png",
  imageCenterYPercent: 47,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 1,
  health: 1,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [],
})

baseCards.push({
  name: "Wolf",
  imageSrcSmall: "/card-art/512x512/wolf.png",
  imageSrcLarge: "/card-art/512x512/wolf.png",
  imageCenterYPercent: 55,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 2,
  health: 1,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [],
})

baseCards.push({
  name: "Little Imp Guy",
  imageSrcSmall: "/card-art/512x512/littleImpGuy.png",
  imageSrcLarge: "/card-art/512x512/littleImpGuy.png",
  imageCenterYPercent: 55,
  rarity: "base",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 0,
  health: 1,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "Before attacking, deal " },
        { boldText: "1" },
        { icon: "damage" },
        { plainText: " to the other monster." },
      ],
    },
  ],
})

baseCards.push({
  name: "Little Chublet",
  imageSrcSmall: "/card-art/512x512/littleChublet.png",
  imageSrcLarge: "/card-art/512x512/littleChublet.png",
  imageCenterYPercent: 52,
  rarity: "base",
  complete: true,
  energyType: "water",
  cardType: "creature",
  attack: 1,
  health: 1,
  cost: {
    neutral: 0,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  keywords: ["Stun"],
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "Before attacking, " },
        { icon: "dice" },
        { boldText: "10%" },
        { plainText: " to " },
        { keyword: "Stun" },
        { plainText: " the enemy monster." },
      ],
    },
  ],
})

baseCards.push({
  name: "Crab",
  imageSrcSmall: "/card-art/512x512/crab.png",
  imageSrcLarge: "/card-art/512x512/crab.png",
  imageCenterYPercent: 44,
  rarity: "base",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 2,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  keywords: ["Shield"],
  text: [
    {
      variant: "default",
      textList: [{ keyword: "Shield" }],
    },
  ],
})

baseCards.push({
  name: "Blooming Bingus",
  imageSrcSmall: "/card-art/512x512/bloomingBingus.png",
  imageSrcLarge: "/card-art/512x512/bloomingBingus.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 1,
  health: 1,
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "When defeated, " },
        { icon: "heart" },
        { boldText: "+1" },
        { plainText: " to the monster behind." },
      ],
    },
  ],
})

baseCards.push({
  name: "Stegobobo",
  imageSrcSmall: "/card-art/512x512/stegobobo.png",
  imageSrcLarge: "/card-art/512x512/stegobobo.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 3,
  health: 4,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: [],
})

baseCards.push({
  name: "Clucksworth",
  imageSrcSmall: "/card-art/512x512/clucksworth.png",
  imageSrcLarge: "/card-art/512x512/clucksworth.png",
  imageCenterYPercent: 55,
  rarity: "base",
  complete: true,
  energyType: "air",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "Before attacking, gains " },
        { boldText: "+1" },
        { icon: "sword" },
        { plainText: " if another Clucksworth is in play." },
      ],
    },
  ],
})

baseCards.push({
  name: "Cloud Pegasus",
  imageSrcSmall: "/card-art/512x512/cloudPegasus.png",
  imageSrcLarge: "/card-art/512x512/cloudPegasus.png",
  imageCenterYPercent: 47,
  rarity: "base",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 2,
  health: 4,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [],
})

baseCards.push({
  name: "Lion",
  imageSrcSmall: "/card-art/512x512/lion.png",
  imageSrcLarge: "/card-art/512x512/lion.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 4,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [],
})

//////////////////////////////////////

baseCards.push({
  name: "Elder Saurus",
  imageSrcSmall: "/card-art/512x512/elderSaurus.png",
  imageSrcLarge: "/card-art/512x512/elderSaurus.png",
  imageCenterYPercent: 45,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 4,
  health: 5,
  cost: {
    neutral: 6,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

baseCards.push({
  name: "Dragon Cub",
  imageSrcSmall: "/card-art/512x512/dragonCub.png",
  imageSrcLarge: "/card-art/512x512/dragonCub.png",
  imageCenterYPercent: 51,
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
  text: [
    {
      variant: "default",
      textList: [
        { keyword: "Backup" },
        { plainText: ": " },
        { icon: "dice" },
        { boldText: "30%" },
        { plainText: " to " },
        { keyword: "Burn" },
        { plainText: " the opponent's attacking monster." },
      ],
    },
  ],
  keywords: ["Backup", "Burn"],
})
