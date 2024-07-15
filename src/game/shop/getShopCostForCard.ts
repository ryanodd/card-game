import { getDateString, getRandomInt, getSeedFromString } from "@/src/utils/randomNumber"
import { cardDataMap } from "../cards/AllCards"
import { CardName } from "../cards/CardName"

const COST_VARIANCE = 20

export const getShopCostForCard = (cardName: CardName) => {
  const cardData = cardDataMap[cardName]
  let costToReturn = 0
  if (cardData.rarity === "base") {
    costToReturn = 0
  }
  if (cardData.rarity === "common") {
    costToReturn = 50
  }
  if (cardData.rarity === "uncommon") {
    costToReturn = 100
  }
  if (cardData.rarity === "rare") {
    costToReturn = 250
  }
  if (cardData.rarity === "epic") {
    costToReturn = 500
  }
  if (cardData.rarity === "legendary") {
    costToReturn = 1000
  }
  if (cardData.rarity === "mythic") {
    costToReturn = 2500
  }

  const costModifierVariance = Math.floor(costToReturn / 5)

  const costModifier =
    -costModifierVariance + getRandomInt(costModifierVariance * 2, getSeedFromString(`${getDateString()}-${cardName}`))

  return costToReturn + costModifier
}
