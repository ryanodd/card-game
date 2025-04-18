import { CardData } from "../CardData"

export const uncommonCards: CardData[] = []

uncommonCards.push({
  name: "Sun King Salamander",
  imageSrcSmall: "/card-art/512x512/sunKingSalamander.png",
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
  name: "Spewing Cavern",
  imageSrcSmall: "/card-art/512x512/spewingCavern.png",
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

uncommonCards.push({
  name: "Eruption of Boulders",
  imageSrcSmall: "/card-art/512x512/eruptionOfBoulders.png",
  imageSrcLarge: "/card-art/512x512/eruptionOfBoulders.png",
  imageCenterYPercent: 35,
  rarity: "uncommon",
  complete: false,
  energyType: "fire",
  cardType: "spell",
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
      textList: [
        { plainText: "Deal " },
        { icon: "damage" },
        { boldText: "1" },
        { plainText: " to a random enemy minion 5 times." },
      ],
    },
  ],
})

uncommonCards.push({
  name: "Icy Herder",
  imageSrcSmall: "/card-art/512x512/icyHerder.jpg",
  imageSrcLarge: "/card-art/512x512/icyHerder.jpg",
  imageCenterYPercent: 46,
  rarity: "uncommon",
  complete: true,
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
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "Before attacking, monster behind gets " },
        { boldText: "+1" },
        { icon: "heart" },

        { plainText: " and " },
        { boldText: "+1" },
        { icon: "sword" },
        { plainText: "." },
      ],
    },
  ],
  keywords: ["Backup"],
})

uncommonCards.push({
  name: "Bloodthirsty Bear",
  imageSrcSmall: "/card-art/512x512/bloodthirstyBear.png",
  imageSrcLarge: "/card-art/512x512/bloodthirstyBear.png",
  imageCenterYPercent: 45,
  rarity: "uncommon",
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
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "Before attacking, deals " },
        { boldText: "+2" },
        { icon: "damage" },
        { plainText: " if not at maximum health." },
      ],
    },
  ],
  keywords: ["Backup"],
})

uncommonCards.push({
  name: "Gnarldebeast",
  imageSrcSmall: "/card-art/512x512/gnarldebeast.jpg",
  imageSrcLarge: "/card-art/512x512/gnarldebeast.jpg",
  imageCenterYPercent: 30,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 5,
  health: 5,
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
        { icon: "sword" },
        { plainText: "." },
      ],
    },
  ],
  keywords: ["Backup"],
})

uncommonCards.push({
  name: "Sky Dino",
  imageSrcSmall: "/card-art/512x512/skyDino.png",
  imageSrcLarge: "/card-art/512x512/skyDino.png",
  imageCenterYPercent: 49,
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
  imageSrcSmall: "/card-art/512x512/featheredScrapper.png",
  imageSrcLarge: "/card-art/512x512/featheredScrapper.png",
  imageCenterYPercent: 43,
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
  text: [
    {
      variant: "default",
      textList: [{ icon: "dice" }, { boldText: "33%" }, { plainText: " for opponent to miss." }],
    },
  ],
})

///////////////////////////////////////////

uncommonCards.push({
  name: "Bed of Snakes",
  imageSrcSmall: "/card-art/512x512/bedOfSnakes.png",
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
  imageSrcSmall: "/card-art/512x512/merfinYodeler.png",
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
  imageSrcSmall: "/card-art/512x512/livingHillside.png",
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
  imageSrcSmall: "/card-art/512x512/sonicDragon.png",
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
  imageSrcSmall: "/card-art/512x512/caveSwimmer.png",
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
  name: "Brash Splasher",
  imageSrcSmall: "/card-art/512x512/brashSplasher.png",
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
  name: "Dazzling Fennec",
  imageSrcSmall: "/card-art/512x512/dazzlingFennec.png",
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
  name: "Volcanic Shellster",
  imageSrcSmall: "/card-art/512x512/volcanicShellster.png",
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

uncommonCards.push({
  name: "Spirit Woomlet",
  imageSrcSmall: "/card-art/512x512/spiritWoomlet.jpg",
  imageSrcLarge: "/card-art/512x512/spiritWoomlet.jpg",
  imageCenterYPercent: 47,
  rarity: "uncommon",
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
  text: [
    {
      variant: "default",
      textList: [{ plainText: "When destroyed, draw a card." }],
    },
  ],
})
