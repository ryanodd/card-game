import { Target, getDefaultCreatureTargets, getEnergyDefaultTargets } from "./Choices"
import { CardState, DuelState, EnergyCounts, PlayerID } from "./DuelData"
import {
  air_energy,
  earth_energy,
  eerie_vision_play,
  ember_foxling_after_attack,
  fire_energy,
  startle_play,
  stegowulf_attack_modifier,
  stegowulf_opponent_attack_modifier,
  water_energy,
} from "./Effects"

export type EnergyType = "neutral" | "fire" | "water" | "earth" | "air"

export type CardType = "creature" | "spell" | "energy"

export type Rarity = "base" | "common" | "uncommon" | "rare" | "epic" | "mythic"

export type Keyword = "Support"

export type CardData = {
  name: string
  imageSrc: string
  imageCenterYPercent: number
  rarity: Rarity
  cardType: CardType
  energyType: EnergyType | "multi" | "neutral"
  text?: string
  keywords?: Keyword[]
  cost: EnergyCounts
  attack?: number
  health?: number
  getValidTargets: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => Target[]
  effects?: {
    play?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string, target: Target) => DuelState
    summon?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => DuelState
    afterAttack?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => DuelState
    attackModifier?: (
      inputDuel: DuelState,
      playerId: PlayerID,
      instanceId: string,
      attackAmount: number
    ) => number | "miss"
    opponentAttackModifier?: (
      inputDuel: DuelState,
      playerId: PlayerID,
      instanceId: string,
      attackAmount: number
    ) => number | "miss"
  }
}

let cards: CardData[] = []

cards.push({
  name: "Fire Energy",
  imageSrc: "/card-art/energyFire.png",
  imageCenterYPercent: 50,
  rarity: "base",
  energyType: "fire",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  getValidTargets: getEnergyDefaultTargets,
  effects: {
    play: fire_energy,
  },
})

cards.push({
  name: "Water Energy",
  imageSrc: "/card-art/energyWater.png",
  imageCenterYPercent: 50,
  rarity: "base",
  energyType: "water",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  getValidTargets: () => [{ targetType: "playArea" }],
  effects: {
    play: water_energy,
  },
})

cards.push({
  name: "Earth Energy",
  imageSrc: "/card-art/energyEarth.png",
  imageCenterYPercent: 53,
  rarity: "base",
  energyType: "earth",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  getValidTargets: () => [{ targetType: "playArea" }],
  effects: {
    play: earth_energy,
  },
})

cards.push({
  name: "Air Energy",
  imageSrc: "/card-art/energyAir.png",
  imageCenterYPercent: 50,
  rarity: "base",
  energyType: "air",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  getValidTargets: () => [{ targetType: "playArea" }],
  effects: {
    play: air_energy,
  },
})

cards.push({
  name: "Golden Friend",
  imageSrc: "/card-art/goldenFriend.png",
  imageCenterYPercent: 40,
  rarity: "common",
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
  getValidTargets: getDefaultCreatureTargets,
})

// Support: the opposing active creature has a 20% chance of getting poisoned
cards.push({
  name: "Snake Network",
  imageSrc: "/card-art/snakeNetwork.png",
  imageCenterYPercent: 75,
  rarity: "uncommon",
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
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Ember Foxling",
  imageSrc: "/card-art/emberFoxling.png",
  imageCenterYPercent: 70,
  rarity: "uncommon",
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
  getValidTargets: getDefaultCreatureTargets,
  effects: {
    afterAttack: ember_foxling_after_attack,
  },
})

cards.push({
  name: "Winged Bull",
  imageSrc: "/card-art/wingedBull.png",
  imageCenterYPercent: 24,
  rarity: "common",
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
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Greenwing Caller",
  imageSrc: "/card-art/greenwingCaller.png",
  imageCenterYPercent: 40,
  rarity: "common",
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
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Elder Saurus",
  imageSrc: "/card-art/elderSaurus.png",
  imageCenterYPercent: 45,
  rarity: "common",
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
  getValidTargets: getDefaultCreatureTargets,
})

// Support: when a creature in your active slot is destroyed, gets +3 attack
// or, Enrage: +2 attack
cards.push({
  name: "Vengeful Flamewing",
  imageSrc: "/card-art/vengefulFlamewing.png",
  imageCenterYPercent: 45,
  rarity: "rare",
  energyType: "multi",
  cardType: "creature",
  attack: 2,
  health: 4,
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Sludge Amphibian",
  imageSrc: "/card-art/sludgeAmphibian.png",
  imageCenterYPercent: 30,
  rarity: "common",
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
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Merfin Yodeler",
  imageSrc: "/card-art/merfinYodeler.png",
  imageCenterYPercent: 20,
  rarity: "common",
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
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Girabu, Colossal Guardian",
  imageSrc: "/card-art/girabucolossalGuardian.png",
  imageCenterYPercent: 51,
  rarity: "mythic",
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
  getValidTargets: getDefaultCreatureTargets,
})

// When attacking this creature, your opponent has a 25% chance to miss.
cards.push({
  name: "Fairy Buckfly",
  imageSrc: "/card-art/fairyBuckFly.png",
  imageCenterYPercent: 18,
  rarity: "rare",
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
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Nyreth, Light Eater",
  imageSrc: "/card-art/nyrethLightEater.png",
  imageCenterYPercent: 60,
  rarity: "mythic",
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
  getValidTargets: getDefaultCreatureTargets,
})

// If this creature is in an inactive slot, the creature in the active slot gets +2 attack
cards.push({
  name: "Komodo Teacher",
  imageSrc: "/card-art/komodoTeacher.png",
  imageCenterYPercent: 50,
  rarity: "epic",
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
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Living Hillside",
  imageSrc: "/card-art/livingHillside.png",
  imageCenterYPercent: 20,
  rarity: "uncommon",
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
  getValidTargets: getDefaultCreatureTargets,
})

cards.push({
  name: "Stegowulf",
  imageSrc: "/card-art/stegowulf.png",
  imageCenterYPercent: 40,
  rarity: "epic",
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
  getValidTargets: getDefaultCreatureTargets,
  effects: {
    attackModifier: stegowulf_attack_modifier,
    opponentAttackModifier: stegowulf_opponent_attack_modifier,
  },
})

cards.push({
  name: "Eerie Vision",
  imageSrc: "/card-art/eerieVision.png",
  imageCenterYPercent: 20,
  rarity: "rare",
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
  getValidTargets: () => [{ targetType: "playArea" }],
  effects: {
    play: eerie_vision_play,
  },
})

cards.push({
  name: "Startle",
  imageSrc: "/card-art/startle.png",
  imageCenterYPercent: 50,
  rarity: "rare",
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
  getValidTargets: () => [{ targetType: "playArea" }],
  effects: {
    play: startle_play,
  },
})

cards.push({
  name: "Sonic Dragon",
  imageSrc: "/card-art/sonicDragon.png",
  imageCenterYPercent: 30,
  rarity: "uncommon",
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
  keywords: ["Support"],
  getValidTargets: getDefaultCreatureTargets,
  effects: {
    // TODO supportOpponentAttackModifier: sonic_dragon_support_opponent_attack_modifier,
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
