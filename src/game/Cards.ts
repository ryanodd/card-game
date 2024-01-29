import { CardState, DuelState, EnergyCounts, PlayerID } from "./DuelData"
import { air_energy, earth_energy, ember_foxling_after_attack, fire_energy, water_energy } from "./Effects"

export type EnergyType = "neutral" | "fire" | "water" | "earth" | "air"

export type CardType = "creature" | "spell" | "energy"

export type CardData = {
  name: string
  imageSrc: string
  imageCenterYPercent: number
  cardType: CardType
  energyType: EnergyType | "multi" | "neutral"
  text?: string
  cost: EnergyCounts
  attack?: {
    min: number
    max: number
  }
  health?: number
  effects?: {
    summon?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => DuelState
    afterAttack?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => DuelState
  }
}

let cards: CardData[] = []

cards.push({
  name: "Fire Energy",
  imageSrc: "/card-art/energyFire.png",
  imageCenterYPercent: 50,
  energyType: "fire",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  effects: {
    summon: fire_energy,
  },
})

cards.push({
  name: "Water Energy",
  imageSrc: "/card-art/energyWater.png",
  imageCenterYPercent: 50,
  energyType: "water",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  effects: {
    summon: water_energy,
  },
})

cards.push({
  name: "Earth Energy",
  imageSrc: "/card-art/energyEarth.png",
  imageCenterYPercent: 53,
  energyType: "earth",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  effects: {
    summon: earth_energy,
  },
})

cards.push({
  name: "Air Energy",
  imageSrc: "/card-art/energyAir.png",
  imageCenterYPercent: 50,
  energyType: "air",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  effects: {
    summon: air_energy,
  },
})

cards.push({
  name: "Golden Friend",
  imageSrc: "/card-art/goldenFriend.png",
  imageCenterYPercent: 50,
  energyType: "neutral",
  cardType: "creature",
  attack: {
    min: 2,
    max: 2,
  },
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
  energyType: "earth",
  cardType: "creature",
  attack: {
    min: 0,
    max: 1,
  },
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
  energyType: "fire",
  cardType: "creature",
  attack: {
    min: 2,
    max: 2,
  },
  health: 1,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: "Whenever this creature attacks, deal 1 damage to the opposing player.",
  effects: {
    afterAttack: ember_foxling_after_attack,
  },
})

cards.push({
  name: "Winged Bull",
  imageSrc: "/card-art/wingedBull.png",
  imageCenterYPercent: 24,
  energyType: "air",
  cardType: "creature",
  attack: {
    min: 2,
    max: 4,
  },
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
  energyType: "air",
  cardType: "creature",
  attack: {
    min: 1,
    max: 5,
  },
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
  energyType: "neutral",
  cardType: "creature",
  attack: {
    min: 5,
    max: 5,
  },
  health: 5,
  cost: {
    neutral: 5,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

// Support: when a creature in your active slot is destroyed, gets +3 attack
cards.push({
  name: "Vengeful Flamewing",
  imageSrc: "/card-art/vengefulFlamewing.png",
  imageCenterYPercent: 45,
  energyType: "multi",
  cardType: "creature",
  attack: {
    min: 2,
    max: 6,
  },
  health: 4,
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
})

cards.push({
  name: "Sludge Amphibian",
  imageSrc: "/card-art/sludgeAmphibian.png",
  imageCenterYPercent: 30,
  energyType: "water",
  cardType: "creature",
  attack: {
    min: 3,
    max: 4,
  },
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
  energyType: "water",
  cardType: "creature",
  attack: {
    min: 2,
    max: 2,
  },
  health: 3,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Girabu, Colossal Guardian",
  imageSrc: "/card-art/girabucolossalGuardian.png",
  imageCenterYPercent: 51,
  energyType: "fire",
  cardType: "creature",
  attack: {
    min: 4,
    max: 6,
  },
  health: 7,
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
  energyType: "multi",
  cardType: "creature",
  attack: {
    min: 2,
    max: 5,
  },
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
  energyType: "multi",
  cardType: "creature",
  attack: {
    min: 5,
    max: 9,
  },
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
  energyType: "water",
  cardType: "creature",
  attack: {
    min: 1,
    max: 4,
  },
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
  energyType: "earth",
  cardType: "creature",
  attack: {
    min: 2,
    max: 3,
  },
  health: 6,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
})

// Ideas
// - fire attack: 2 mana, 3 damage to something
// - wind: Target creature in an inactive slot swaps places with the active slot
// - wind: destroy monument
// - earth: monument, gives all creatures +2 health
// - neutral/blue: draw a card

export const cardDataMap: Record<string, CardData> = cards.reduce((cardsByName, card) => {
  cardsByName[card.name] = card
  return cardsByName
}, {} as Record<string, CardData>)
