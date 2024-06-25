import { CardData } from "./CardData"
import { CardName } from "./CardName"

let cards: CardData[] = []

cards.push({
  name: "Fire Energy",
  imageSrc: "/card-art/energyFire.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: true,
  energyType: "fire",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Water Energy",
  imageSrc: "/card-art/energyWater.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: true,
  energyType: "water",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Earth Energy",
  imageSrc: "/card-art/energyEarth.png",
  imageCenterYPercent: 53,
  rarity: "base",
  complete: true,
  energyType: "earth",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Air Energy",
  imageSrc: "/card-art/energyAir.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: true,
  energyType: "air",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Golden Friend",
  imageSrc: "/card-art/goldenFriend.png",
  imageCenterYPercent: 40,
  rarity: "common",
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

// Support: the opposing active creature has a 20% chance of getting poisoned
cards.push({
  name: "Snake Network",
  imageSrc: "/card-art/snakeNetwork.png",
  imageCenterYPercent: 75,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 1,
  health: 3,
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
})

cards.push({
  name: "Ember Foxling",
  imageSrc: "/card-art/emberFoxling.png",
  imageCenterYPercent: 70,
  rarity: "uncommon",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 2,
  health: 1,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: "Whenever this creature attacks, deal 1 damage to the opposing player.",
})

cards.push({
  name: "Winged Bull",
  imageSrc: "/card-art/wingedBull.png",
  imageCenterYPercent: 24,
  rarity: "common",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 3,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
})

cards.push({
  name: "Greenwing Caller",
  imageSrc: "/card-art/greenwingCaller.png",
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

cards.push({
  name: "Elder Saurus",
  imageSrc: "/card-art/elderSaurus.png",
  imageCenterYPercent: 45,
  rarity: "common",
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
  name: "Vengeful Flamewing",
  imageSrc: "/card-art/vengefulFlamewing.png",
  imageCenterYPercent: 45,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: "Enrage: +2 attack.",
})

cards.push({
  name: "Sludge Amphibian",
  imageSrc: "/card-art/sludgeAmphibian.png",
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

cards.push({
  name: "Merfin Yodeler",
  imageSrc: "/card-art/merfinYodeler.png",
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
  text: "Support: If this creature is in the top row, the attacking creature of the top row gets +1 attack and +1 health.",
})

cards.push({
  name: "Spirit Giant",
  imageSrc: "/card-art/girabucolossalGuardian.png",
  imageCenterYPercent: 51,
  rarity: "legendary",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 5,
  health: 6,
  cost: {
    neutral: 3,
    fire: 2,
    water: 0,
    earth: 0,
    air: 0,
  },
})

// When attacking this creature, your opponent has a 25% chance to miss.
cards.push({
  name: "Fairy Buckfly",
  imageSrc: "/card-art/fairyBuckFly.png",
  imageCenterYPercent: 18,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 2,
  health: 4,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 1,
  },
})

cards.push({
  name: "Nyreth, Light Eater",
  imageSrc: "/card-art/nyrethLightEater.png",
  imageCenterYPercent: 60,
  rarity: "mythic",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 7,
  health: 7,
  cost: {
    neutral: 5,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
})

// If this creature is in an inactive slot, the creature in the active slot gets +2 attack
cards.push({
  name: "Komodo Teacher",
  imageSrc: "/card-art/komodoTeacher.png",
  imageCenterYPercent: 50,
  rarity: "epic",
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
})

cards.push({
  name: "Living Hillside",
  imageSrc: "/card-art/livingHillside.png",
  imageCenterYPercent: 20,
  rarity: "common",
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

cards.push({
  name: "Stegowulf",
  imageSrc: "/card-art/stegowulf.png",
  imageCenterYPercent: 45,
  rarity: "epic",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: "If Stegowulf attacks with no creatures behind, it deals +2 damage.\n\nStegowulf has a 20% chance of evading attacks.",
})

cards.push({
  name: "Eerie Vision",
  imageSrc: "/card-art/eerieVision.png",
  imageCenterYPercent: 20,
  rarity: "rare",
  complete: false,
  energyType: "air",
  cardType: "spell",
  attack: undefined,
  health: undefined,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: "Scry 3. Draw 1. Take 3 damage.",
})

cards.push({
  name: "Startle",
  imageSrc: "/card-art/startle.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "spell",
  attack: undefined,
  health: undefined,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: "Return target creature to its owner's hand.",
})

cards.push({
  name: "Sonic Dragon",
  imageSrc: "/card-art/sonicDragon.png",
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
  text: "Support: 20% chance to cause the opposing attacking creature to miss.",
  keywords: ["support"],
})

cards.push({
  name: "Cave Swimmer",
  imageSrc: "/card-art/caveSwimmer.png",
  imageCenterYPercent: 70,
  rarity: "uncommon",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 1,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  text: "Support: has a 10% chance of drawing a card.",
  keywords: ["support"],
})

cards.push({
  name: "Darkwoods Hyena",
  imageSrc: "/card-art/darkwoodsHyena.png",
  imageCenterYPercent: 50,
  rarity: "rare",
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
  text: "Support: has a 50% change to gain +1 attack.",
  keywords: ["support"],
})

cards.push({
  name: "Monstrous Flamebeast",
  imageSrc: "/card-art/monstrousFlamebeast.png",
  imageCenterYPercent: 40,
  rarity: "uncommon",
  complete: false,
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
  text: "Trample",
  keywords: ["trample"],
})

// Ideas
// - fire attack: 2 mana, 3 damage to something
// - wind: Target creature in an inactive slot swaps places with the active slot
// - wind: destroy monument
// - earth: monument, gives all creatures +2 health
// - blue: draw cards
// - green: lil guys
// - green: deathrattle
// - red: attack buff

export const cardDataMap: Record<CardName, CardData> = cards.reduce((cardsByName, card) => {
  cardsByName[card.name] = card
  return cardsByName
}, {} as Record<string, CardData>)
