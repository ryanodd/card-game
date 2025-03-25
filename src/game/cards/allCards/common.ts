import { CardData } from "../CardData"

export const commonCards: CardData[] = []

commonCards.push({
  name: "Scrungy",
  imageSrcSmall: "/card-art/96x96/scrungy.png",
  imageSrcLarge: "/card-art/512x512/scrungy.png",
  imageCenterYPercent: 51,
  rarity: "common",
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
  text: [],
})

commonCards.push({
  name: "Desert Crawler",
  imageSrcSmall: "/card-art/96x96/desertCrawler.png",
  imageSrcLarge: "/card-art/512x512/desertCrawler.png",
  imageCenterYPercent: 50,
  rarity: "common",
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
  text: [],
})

commonCards.push({
  name: "Molten Loaf",
  imageSrcSmall: "/card-art/96x96/moltenLoaf.png",
  imageSrcLarge: "/card-art/512x512/moltenLoaf.png",
  imageCenterYPercent: 50,
  rarity: "common",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [],
})

commonCards.push({
  name: "Bubblebloop",
  imageSrcSmall: "/card-art/96x96/bubblebloop.png",
  imageSrcLarge: "/card-art/512x512/bubblebloop.png",
  imageCenterYPercent: 43,
  rarity: "common",
  complete: false,
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
  text: [],
})

commonCards.push({
  name: "Spade Manta",
  imageSrcSmall: "/card-art/96x96/spadeManta.png",
  imageSrcLarge: "/card-art/512x512/spadeManta.png",
  imageCenterYPercent: 43,
  rarity: "common",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 3,
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
        { plainText: "When played, " },
        { icon: "dice" },
        { boldText: "25%" },
        { plainText: " to " },
        { keyword: "Stun" },
        { plainText: " the front enemy monster in this row." },
      ],
    },
  ],
})

commonCards.push({
  name: "Hulking Menace",
  imageSrcSmall: "/card-art/96x96/hulkingMenace.png",
  imageSrcLarge: "/card-art/512x512/hulkingMenace.png",
  imageCenterYPercent: 50,
  rarity: "common",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 5,
  health: 6,
  cost: {
    neutral: 5,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: [],
})

commonCards.push({
  name: "Shark",
  imageSrcSmall: "/card-art/96x96/shark.png",
  imageSrcLarge: "/card-art/512x512/shark.png",
  imageCenterYPercent: 47,
  rarity: "common",
  complete: true,
  energyType: "water",
  cardType: "creature",
  attack: 4,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  text: [],
})

commonCards.push({
  name: "Cleansing Storm",
  imageSrcSmall: "/card-art/96x96/cleansingStorm.png",
  imageSrcLarge: "/card-art/512x512/cleansingStorm.png",
  imageCenterYPercent: 55,
  rarity: "common",
  complete: true,
  energyType: "water",
  cardType: "spell",
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
      textList: [{ plainText: "Remove all status effects on your monsters." }],
    },
  ],
})

commonCards.push({
  name: "Snail",
  imageSrcSmall: "/card-art/96x96/snail.png",
  imageSrcLarge: "/card-art/512x512/snail.png",
  imageCenterYPercent: 55,
  rarity: "common",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 1,
  health: 2,
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: [],
})

commonCards.push({
  name: "Bouldering Brawler",
  imageSrcSmall: "/card-art/96x96/boulderingBrawler.png",
  imageSrcLarge: "/card-art/512x512/boulderingBrawler.png",
  imageCenterYPercent: 55,
  rarity: "common",
  complete: true,
  energyType: "earth",
  cardType: "creature",
  attack: 4,
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

commonCards.push({
  name: "Narples",
  imageSrcSmall: "/card-art/96x96/narples.png",
  imageSrcLarge: "/card-art/512x512/narples.png",
  imageCenterYPercent: 47,
  rarity: "common",
  complete: true,
  energyType: "air",
  cardType: "creature",
  attack: 1,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [],
})

commonCards.push({
  name: "Grassland Scout",
  imageSrcSmall: "/card-art/96x96/grasslandScout.png",
  imageSrcLarge: "/card-art/512x512/grasslandScout.png",
  imageCenterYPercent: 47,
  rarity: "common",
  complete: true,
  energyType: "air",
  cardType: "creature",
  attack: 1,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [],
})

commonCards.push({
  name: "Bad Chicken",
  imageSrcSmall: "/card-art/96x96/badChicken.png",
  imageSrcLarge: "/card-art/512x512/badChicken.png",
  imageCenterYPercent: 42,
  rarity: "common",
  complete: true,
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
  text: [],
})

//////////////////////////////////////////////

commonCards.push({
  name: "Winged Bull",
  imageSrcSmall: "/card-art/96x96/wingedBull.png",
  imageSrcLarge: "/card-art/512x512/wingedBull.png",
  imageCenterYPercent: 24,
  rarity: "common",
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
      textList: [
        { plainText: "When played in the front, " },
        { icon: "dice" },
        { boldText: "50%" },
        { plainText: " to gain " },
        { boldText: "+2" },
        { icon: "sword" },
        { plainText: "." },
      ],
    },
  ],
})

commonCards.push({
  name: "Greenwing Caller",
  imageSrcSmall: "/card-art/96x96/greenwingCaller.png",
  imageSrcLarge: "/card-art/512x512/greenwingCaller.png",
  imageCenterYPercent: 40,
  rarity: "common",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 3,
  health: 5,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
})

commonCards.push({
  name: "Sludge Amphibian",
  imageSrcSmall: "/card-art/96x96/sludgeAmphibian.png",
  imageSrcLarge: "/card-art/512x512/sludgeAmphibian.png",
  imageCenterYPercent: 30,
  rarity: "common",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 3,
  health: 4,
  cost: {
    neutral: 3,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
})

commonCards.push({
  name: "Canyon Burrower",
  imageSrcSmall: "/card-art/96x96/canyonBurrower.png",
  imageSrcLarge: "/card-art/512x512/canyonBurrower.png",
  imageCenterYPercent: 30,
  rarity: "common",
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
      textList: [
        { plainText: "When attacked, " },
        { icon: "dice" },
        { boldText: "30%" },
        { plainText: " for opponent to miss." },
      ],
    },
  ],
})

commonCards.push({
  name: "Something Bandit",
  imageSrcSmall: "/card-art/96x96/somethingBandit.png",
  imageSrcLarge: "/card-art/512x512/somethingBandit.png",
  imageCenterYPercent: 50,
  rarity: "common",
  complete: true,
  energyType: "water",
  cardType: "creature",
  attack: 3,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
})

commonCards.push({
  name: "Huddolin",
  imageSrcSmall: "/card-art/96x96/huddolin.png",
  imageSrcLarge: "/card-art/512x512/huddolin.png",
  imageCenterYPercent: 50,
  rarity: "common",
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
      textList: [
        { plainText: "When played, give " },
        { boldText: "+1" },
        { icon: "heart" },
        { plainText: " to a random friendly monster." },
      ],
    },
  ],
})

commonCards.push({
  name: "Hyllophant",
  imageSrcSmall: "/card-art/96x96/hyllophant.png",
  imageSrcLarge: "/card-art/512x512/hyllophant.png",
  imageCenterYPercent: 55,
  rarity: "common",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 3,
  health: 4,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
})
