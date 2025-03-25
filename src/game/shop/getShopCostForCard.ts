import { getDateString, getRandomInt, getSeedFromString } from "@/src/utils/randomNumber"
import { CardName } from "../cards/CardName"
import { cardDataMap } from "../cards/allCards/allCards"
import { PackVariant } from "../GameData"

const COST_VARIANCE = 20

export const getShopCostForCard = (cardName: CardName) => {
  const cardData = cardDataMap[cardName]
  let costToReturn = 0
  if (cardData.rarity === "base") {
    costToReturn = 0
  }
  if (cardData.rarity === "common") {
    costToReturn = 45
  }
  if (cardData.rarity === "uncommon") {
    costToReturn = 140
  }
  if (cardData.rarity === "rare") {
    costToReturn = 380
  }
  if (cardData.rarity === "epic") {
    costToReturn = 820
  }
  if (cardData.rarity === "legendary") {
    costToReturn = 1840
  }
  if (cardData.rarity === "mythic") {
    costToReturn = 3740
  }

  const costModifierVariance = Math.floor(costToReturn / 5)

  const costModifier =
    -costModifierVariance + getRandomInt(costModifierVariance * 2, getSeedFromString(`${getDateString()}-${cardName}`))

  return costToReturn + costModifier
}

export const getShopCostForPack = (packVariant: PackVariant) => {
  let costToReturn = 0
  if (packVariant === "Standard Pack") {
    costToReturn = 200
  }
  if (packVariant === "Elite Pack") {
    costToReturn = 400
  }

  const costModifierVariance = Math.floor(costToReturn / 5)

  const costModifier =
    -costModifierVariance + getRandomInt(costModifierVariance * 2, getSeedFromString(`${getDateString()}`))

  return costToReturn + costModifier
}
