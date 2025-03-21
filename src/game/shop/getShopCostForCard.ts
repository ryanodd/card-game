import { getDateString, getRandomInt, getSeedFromString } from "@/src/utils/randomNumber"
import { CardName } from "../cards/CardName"
import { PackVariant } from "./Packs"
import { cardDataMap } from "../cards/allCards/allCards"

const COST_VARIANCE = 20

export const getShopCostForCard = (cardName: CardName) => {
  const cardData = cardDataMap[cardName]
  let costToReturn = 0
  if (cardData.rarity === "base") {
    costToReturn = 0
  }
  if (cardData.rarity === "common") {
    costToReturn = 80
  }
  if (cardData.rarity === "uncommon") {
    costToReturn = 160
  }
  if (cardData.rarity === "rare") {
    costToReturn = 420
  }
  if (cardData.rarity === "epic") {
    costToReturn = 750
  }
  if (cardData.rarity === "legendary") {
    costToReturn = 1200
  }
  if (cardData.rarity === "mythic") {
    costToReturn = 2500
  }

  const costModifierVariance = Math.floor(costToReturn / 5)

  const costModifier =
    -costModifierVariance + getRandomInt(costModifierVariance * 2, getSeedFromString(`${getDateString()}-${cardName}`))

  return costToReturn + costModifier
}

export const getShopCostForPack = (packVariant: PackVariant) => {
  let costToReturn = 0
  if (packVariant === "Standard Pack") {
    costToReturn = 100
  }
  if (packVariant === "Elite Pack") {
    costToReturn = 400
  }

  const costModifierVariance = Math.floor(costToReturn / 5)

  const costModifier =
    -costModifierVariance + getRandomInt(costModifierVariance * 2, getSeedFromString(`${getDateString()}`))

  return costToReturn + costModifier
}
