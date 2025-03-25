import { CardData } from "../CardData"

export const uncommonCards: CardData[] = []

uncommonCards.push({
  name: "Sun King Salamander",
  imageSrcSmall: "/card-art/96x96/sunKingSalamander.png",
  imageSrcLarge: "/card-art/512x512/sunKingSalamander.png",
  imageCenterYPercent: 45,
  rarity: "uncommon",
  complete: false,
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
  // text: "Support: 25% chance to shield to your front monster.",
})

uncommonCards.push({
  name: "Sky Dino",
  imageSrcSmall: "/card-art/96x96/skyDino.png",
  imageSrcLarge: "/card-art/512x512/skyDino.png",
  imageCenterYPercent: 24,
  rarity: "uncommon",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 2,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  // text: "Support: 50% chance to restore +1 HP to your front monster.",
})

uncommonCards.push({
  name: "Feathered Scrapper",
  imageSrcSmall: "/card-art/96x96/featheredScrapper.png",
  imageSrcLarge: "/card-art/512x512/featheredScrapper.png",
  imageCenterYPercent: 43,
  rarity: "uncommon",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  // text: "Support: 50% chance to restore +1 HP to your front monster.",
})

uncommonCards.push({
  name: "Spewing Cavern",
  imageSrcSmall: "/card-art/96x96/spewingCavern.png",
  imageSrcLarge: "/card-art/512x512/spewingCavern.png",
  imageCenterYPercent: 24,
  rarity: "uncommon",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 1,
  health: 4,
  cost: {
    neutral: 2,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  // text: "When attacked, 20% chance to burn each opposing monster in its row.",
})

///////////////////////////////////////////

uncommonCards.push({
  name: "Bed of Snakes",
  imageSrcSmall: "/card-art/96x96/bedOfSnakes.png",
  imageSrcLarge: "/card-art/512x512/bedOfSnakes.png",
  imageCenterYPercent: 75,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 1,
  health: 3,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  //text: "When Bed of Snakes attacks, 50% chance to poison a random enemy creature in this row.",
})

uncommonCards.push({
  name: "Merfin Yodeler",
  imageSrcSmall: "/card-art/96x96/merfinYodeler.png",
  imageSrcLarge: "/card-art/512x512/merfinYodeler.png",
  imageCenterYPercent: 20,
  rarity: "uncommon",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 3,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { keyword: "Backup" },
        { plainText: ": if in top row, give " },
        { boldText: "+1" },
        { icon: "sword" },
        { plainText: " and " },
        { boldText: "+1" },
        { icon: "heart" },
        { plainText: " to the front monster in this row." },
      ],
    },
  ],
  keywords: ["Backup"],
})

uncommonCards.push({
  name: "Living Hillside",
  imageSrcSmall: "/card-art/96x96/livingHillside.png",
  imageSrcLarge: "/card-art/512x512/livingHillside.png",
  imageCenterYPercent: 20,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 2,
  health: 6,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
})

uncommonCards.push({
  name: "Sonic Dragon",
  imageSrcSmall: "/card-art/96x96/sonicDragon.png",
  imageSrcLarge: "/card-art/512x512/sonicDragon.png",
  imageCenterYPercent: 30,
  rarity: "uncommon",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 5,
  health: 5,
  cost: {
    neutral: 4,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [
    {
      variant: "default",
      textList: [
        { keyword: "Backup" },
        { plainText: ": " },
        { icon: "dice" },
        { boldText: "20%" },
        { plainText: " to " },
        { keyword: "Stun" },
        { plainText: " the front enemy creature in this row." },
      ],
    },
  ],
  keywords: ["Backup"],
})

uncommonCards.push({
  name: "Cave Swimmer",
  imageSrcSmall: "/card-art/96x96/caveSwimmer.png",
  imageSrcLarge: "/card-art/512x512/caveSwimmer.png",
  imageCenterYPercent: 70,
  rarity: "uncommon",
  complete: true,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
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
        { boldText: "10%" },
        { plainText: " to draw a card." },
      ],
    },
  ],
  keywords: ["Backup"],
})

uncommonCards.push({
  name: "Darkwoods Hyena",
  imageSrcSmall: "/card-art/96x96/darkwoodsHyena.png",
  imageSrcLarge: "/card-art/512x512/darkwoodsHyena.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 2,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { keyword: "Backup" },
        { plainText: ": " },
        { icon: "dice" },
        { boldText: "25%" },
        { plainText: " to gain " },
        { boldText: "+1" },
        { icon: "heart" },
        { plainText: "." },
      ],
    },
  ],
  keywords: ["Backup"],
})

uncommonCards.push({
  name: "Monstrous Flamebeast",
  imageSrcSmall: "/card-art/96x96/monstrousFlamebeast.png",
  imageSrcLarge: "/card-art/512x512/monstrousFlamebeast.png",
  imageCenterYPercent: 40,
  rarity: "uncommon",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 4,
  health: 3,
  cost: {
    neutral: 3,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [{ keyword: "Charge" }],
    },
  ],
  keywords: ["Charge"],
})

uncommonCards.push({
  name: "Glikki Forager",
  imageSrcSmall: "/card-art/96x96/glikkiTracker.png",
  imageSrcLarge: "/card-art/512x512/glikkiTracker.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 2,
  health: 3,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 1,
  },
})

uncommonCards.push({
  name: "Brash Splasher",
  imageSrcSmall: "/card-art/96x96/brashSplasher.png",
  imageSrcLarge: "/card-art/512x512/brashSplasher.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: true,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 1,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "After attacking, " },
        { icon: "dice" },
        { boldText: "50%" },
        { plainText: " to draw a card." },
      ],
    },
  ],
})

uncommonCards.push({
  name: "Bonehide Mole",
  imageSrcSmall: "/card-art/96x96/bonehideMole.png",
  imageSrcLarge: "/card-art/512x512/bonehideMole.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [{ keyword: "Shield" }],
    },
  ],
})

uncommonCards.push({
  name: "Dazzling Fennec",
  imageSrcSmall: "/card-art/96x96/dazzlingFennec.png",
  imageSrcLarge: "/card-art/512x512/dazzlingFennec.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: false,
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
})

uncommonCards.push({
  name: "Red Crab Brawler",
  imageSrcSmall: "/card-art/96x96/redCrabBrawler.png",
  imageSrcLarge: "/card-art/512x512/redCrabBrawler.png",
  imageCenterYPercent: 45,
  rarity: "uncommon",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 3,
  health: 2,
  cost: {
    neutral: 2,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },

  text: [
    {
      variant: "default",
      textList: [{ keyword: "Shield" }],
    },
  ],
})

uncommonCards.push({
  name: "Moltsteed Racer",
  imageSrcSmall: "/card-art/96x96/moltsteedRacer.png",
  imageSrcLarge: "/card-art/512x512/moltsteedRacer.png",
  imageCenterYPercent: 55,
  rarity: "uncommon",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 3,
  health: 2,
  cost: {
    neutral: 2,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [{ keyword: "Charge" }],
    },
  ],
})

uncommonCards.push({
  name: "Volcanic Shellster",
  imageSrcSmall: "/card-art/96x96/volcanicShellster.png",
  imageSrcLarge: "/card-art/512x512/volcanicShellster.png",
  imageCenterYPercent: 65,
  rarity: "uncommon",
  complete: false,
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
})
