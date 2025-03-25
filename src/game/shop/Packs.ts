import { Rarity } from "../cards/CardData"
import { GameState, PackVariant } from "../GameData"

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
      uncommon: 70,
      rare: 22,
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

export const getTotalPacksInInventory = (game: GameState) => {
  let sum = 0
  for (const [packVariant, numPacks] of Object.entries(game.packs)) {
    sum += numPacks
  }
  return sum
}
