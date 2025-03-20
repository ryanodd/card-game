import { cardDataMap } from "./cards/AllCards"
import { CardData } from "./cards/CardData"
import { CardName } from "./cards/CardName"
import { EnergyCounts, EnergyType } from "./duel/EnergyData"

export const hasDuplicates = (array: any[]) => {
  return new Set(array).size !== array.length
}

export const delayMs = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getEnergyTotalFromEnergyCounts = (energyCounts: EnergyCounts) => {
  return energyCounts.fire + energyCounts.water + energyCounts.earth + energyCounts.air + energyCounts.neutral
}

export const getConvertedEnergyCost = (cardData: CardData) => {
  return getEnergyTotalFromEnergyCounts(cardData.cost)
}

export const getEnergyTypesFromEnergyCounts = (counts: EnergyCounts) => {
  const energyTypesToReturn: EnergyType[] = []

  if (counts.fire > 0) {
    energyTypesToReturn.push("fire")
  }
  if (counts.water > 0) {
    energyTypesToReturn.push("water")
  }
  if (counts.earth > 0) {
    energyTypesToReturn.push("earth")
  }
  if (counts.air > 0) {
    energyTypesToReturn.push("air")
  }
  if (counts.neutral > 0) {
    energyTypesToReturn.push("neutral")
  }
  return energyTypesToReturn
}

export const sortCardNames = (cardNames: CardName[]) => {
  return cardNames.sort((cardNameA, cardNameB) => {
    const cardA = cardDataMap[cardNameA]
    const cardB = cardDataMap[cardNameB]

    if (cardA.energyType === cardB.energyType) {
      if (getConvertedEnergyCost(cardA) !== getConvertedEnergyCost(cardB)) {
        return getConvertedEnergyCost(cardA) < getConvertedEnergyCost(cardB) ? -1 : 1
      }
      return cardNameA < cardNameB ? -1 : 1
    }

    if (cardA.energyType === "fire" || cardB.energyType === "fire") {
      return cardA.energyType === "fire" ? -1 : 1
    }
    if (cardA.energyType === "water" || cardB.energyType === "water") {
      return cardA.energyType === "water" ? -1 : 1
    }
    if (cardA.energyType === "earth" || cardB.energyType === "earth") {
      return cardA.energyType === "earth" ? -1 : 1
    }
    if (cardA.energyType === "air" || cardB.energyType === "air") {
      return cardA.energyType === "air" ? -1 : 1
    }
    if (cardA.energyType === "neutral" || cardB.energyType === "neutral") {
      return cardA.energyType === "neutral" ? -1 : 1
    }
    if (cardA.energyType === "multi" || cardB.energyType === "multi") {
      return cardA.energyType === "multi" ? -1 : 1
    }
    return -1
  })
}

export const sortDeckListNames = (cardNames: CardName[]) => {
  return cardNames.sort((cardNameA, cardNameB) => {
    const cardA = cardDataMap[cardNameA]
    const cardB = cardDataMap[cardNameB]

    if (getConvertedEnergyCost(cardA) !== getConvertedEnergyCost(cardB)) {
      return getConvertedEnergyCost(cardA) < getConvertedEnergyCost(cardB) ? -1 : 1
    }

    if (cardA.energyType === "fire" || cardB.energyType === "fire") {
      return cardA.energyType === "fire" ? -1 : 1
    }
    if (cardA.energyType === "water" || cardB.energyType === "water") {
      return cardA.energyType === "water" ? -1 : 1
    }
    if (cardA.energyType === "earth" || cardB.energyType === "earth") {
      return cardA.energyType === "earth" ? -1 : 1
    }
    if (cardA.energyType === "air" || cardB.energyType === "air") {
      return cardA.energyType === "air" ? -1 : 1
    }
    if (cardA.energyType === "neutral" || cardB.energyType === "neutral") {
      return cardA.energyType === "neutral" ? -1 : 1
    }
    if (cardA.energyType === "multi" || cardB.energyType === "multi") {
      return cardA.energyType === "multi" ? -1 : 1
    }
    return -1
  })
}
