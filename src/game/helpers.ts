import { CardData, cardDataMap } from "./Cards"

export const hasDuplicates = (array: any[]) => {
  return new Set(array).size !== array.length
}

export const getConvertedEnergyCost = (cardData: CardData) => {
  return cardData.cost.fire + cardData.cost.water + cardData.cost.earth + cardData.cost.air + cardData.cost.neutral
}

export const sortCardNames = (cardNames: string[]) => {
  return cardNames.sort((cardNameA, cardNameB) => {
    const cardA = cardDataMap[cardNameA]
    const cardB = cardDataMap[cardNameB]
    if (getConvertedEnergyCost(cardA) !== getConvertedEnergyCost(cardB)) {
      return getConvertedEnergyCost(cardA) - getConvertedEnergyCost(cardB)
    }
    if (cardA.cost.fire !== cardB.cost.fire) {
      return cardB.cost.fire - cardA.cost.fire
    }
    if (cardA.cost.water !== cardB.cost.water) {
      return cardB.cost.water - cardA.cost.water
    }
    if (cardA.cost.earth !== cardB.cost.earth) {
      return cardB.cost.earth - cardA.cost.earth
    }
    if (cardA.cost.air !== cardB.cost.air) {
      return cardB.cost.air - cardA.cost.air
    }
    return cardNameA < cardNameB ? 1 : -1
  })
}
