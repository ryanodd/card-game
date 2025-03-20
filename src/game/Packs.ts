import { getRandomInt, getRandomItemFromArray, getRandomSeed } from "../utils/randomNumber"
import { cardDataMap } from "./cards/AllCards"
import { Rarity } from "./cards/CardData"
import { CardName } from "./cards/CardName"
import { GameState } from "./GameData"

export type PackVariant = "Standard Pack" | "Elite Pack" // | "mythic"

export type RarityOdds = Record<Rarity, number>

export type PackOdds = {
  baseOdds: RarityOdds
  finalCardOdds: RarityOdds
}

export const packOddsByVariant: Record<PackVariant, PackOdds> = {
  "Standard Pack": {
    baseOdds: {
      base: 0,
      common: 80,
      uncommon: 17,
      rare: 2,
      epic: 0.9,
      legendary: 0.09,
      mythic: 0.01,
    },
    finalCardOdds: {
      base: 0,
      common: 0,
      uncommon: 0,
      rare: 92,
      epic: 7,
      legendary: 0.99,
      mythic: 0.01,
    },
  },
  "Elite Pack": {
    baseOdds: {
      base: 0,
      common: 35,
      uncommon: 35,
      rare: 25,
      epic: 4,
      legendary: 0.45,
      mythic: 0.05,
    },
    finalCardOdds: {
      base: 0,
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 40,
      legendary: 40,
      mythic: 10,
    },
  },
  // mythic: {
  //   baseOdds: {
  //     base: 0,
  //     common: 80,
  //     uncommon: 0,
  //     rare: 0,
  //     epic: 0,
  //     legendary: 0,
  //     mythic: 0,
  //   },
  //   finalCardOdds: {
  //     base: 0,
  //     common: 80,
  //     uncommon: 0,
  //     rare: 0,
  //     epic: 0,
  //     legendary: 0,
  //     mythic: 0,
  //   },
  // },
}

const cardNamesByRarity: Record<Rarity, CardName[]> = {
  base: Object.values(cardDataMap)
    .filter((cardData) => {
      return cardData.rarity === "base"
    })
    .map((cardData) => cardData.name),
  common: Object.values(cardDataMap)
    .filter((cardData) => {
      return cardData.rarity === "common"
    })
    .map((cardData) => cardData.name),
  uncommon: Object.values(cardDataMap)
    .filter((cardData) => {
      return cardData.rarity === "uncommon"
    })
    .map((cardData) => cardData.name),
  rare: Object.values(cardDataMap)
    .filter((cardData) => {
      return cardData.rarity === "rare"
    })
    .map((cardData) => cardData.name),
  epic: Object.values(cardDataMap)
    .filter((cardData) => {
      return cardData.rarity === "epic"
    })
    .map((cardData) => cardData.name),
  legendary: Object.values(cardDataMap)
    .filter((cardData) => {
      return cardData.rarity === "legendary"
    })
    .map((cardData) => cardData.name),
  mythic: Object.values(cardDataMap)
    .filter((cardData) => {
      return cardData.rarity === "mythic"
    })
    .map((cardData) => cardData.name),
}

const CARDS_PER_PACK = 4
// Smallest possible percent difference between card rarities
const RANDOMNESS_SENSITIVITY = 0.001

export const getRandomRarityByRarityOdds = (rarityodds: RarityOdds) => {
  const randomInt = getRandomInt(100 / RANDOMNESS_SENSITIVITY, getRandomSeed())
  const rarityPercentile = randomInt * RANDOMNESS_SENSITIVITY // A random number from 1 to 100

  let raritySelected: Rarity = "base"
  let runningTotal = 0
  for (let [rarity, odd] of Object.entries(rarityodds)) {
    runningTotal += odd
    if (rarityPercentile < runningTotal) {
      raritySelected = rarity as Rarity
      break
    }
  }
  return raritySelected
}

export const openPack = (game: GameState, packVariant: PackVariant): GameState => {
  const odds = packOddsByVariant[packVariant]

  // Select cards
  const cardsOpened: CardName[] = []
  for (let x = 0; x < CARDS_PER_PACK - 1; x++) {
    const raritySelected = getRandomRarityByRarityOdds(odds.baseOdds)
    const cardSelected = getRandomItemFromArray(cardNamesByRarity[raritySelected], getRandomSeed()) as CardName
    cardsOpened.push(cardSelected)
  }
  const raritySelected = getRandomRarityByRarityOdds(odds.finalCardOdds)
  const cardSelected = getRandomItemFromArray(cardNamesByRarity[raritySelected], getRandomSeed()) as CardName
  cardsOpened.push(cardSelected)

  // Check if we actually own the pack we're opening
  if (game.packs[packVariant] < 1) {
    throw Error("Tried to open pack with none owned!")
  }

  // Add cards to collection
  for (let x = 0; x < cardsOpened.length; x++) {
    const quantityAlreadyInCollection = game.cardCollection[cardsOpened[x]]
    if (quantityAlreadyInCollection < 4) {
      game.cardCollection[cardsOpened[x]] += 1
    } else {
      // TODO compensate for cards that you're maxed out on
    }
  }

  // Remove pack
  game.packs[packVariant] -= 1

  // Change to pack opening screen
  return { ...game, screen: { id: "openPack", cardsOpened } }
}
