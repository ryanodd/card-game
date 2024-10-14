import { cardDataMap } from "./cards/AllCards"
import { CardData } from "./cards/CardData"
import { CardName } from "./cards/CardName"
import { CardState } from "./duel/DuelData"

export const hasDuplicates = (array: any[]) => {
  return new Set(array).size !== array.length
}

export const delayMs = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getConvertedEnergyCost = (cardData: CardData) => {
  return cardData.cost.fire + cardData.cost.water + cardData.cost.earth + cardData.cost.air + cardData.cost.neutral
}

export const sortCardNames = (cardNames: CardName[]) => {
  return cardNames.sort((cardNameA, cardNameB) => {
    const cardA = cardDataMap[cardNameA]
    const cardB = cardDataMap[cardNameB]

    if (cardA.cardType === "energy" && cardB.cardType !== "energy") return -1
    if (cardA.cardType !== "energy" && cardB.cardType === "energy") return 1

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

    if (cardA.cardType === "energy" && cardB.cardType !== "energy") return -1
    if (cardA.cardType !== "energy" && cardB.cardType === "energy") return 1

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
