import { getDateString, getRandomInt, getRandomItemFromArray, getSeedFromString } from "@/src/utils/randomNumber"
import { CardName } from "../cards/CardName"
import { ShopItem } from "./ShopItem"
import { getShopCostForCard, getShopCostForPack } from "./getShopCostForCard"
import { PackVariant } from "./Packs"
import { cardDataMap } from "../cards/allCards/allCards"

const PACK_VARIANT_RATES: Record<PackVariant, number> = {
  "Standard Pack": 80,
  "Elite Pack": 20,
}

export const decideShopItems = (): ShopItem[] => {
  let allAvailableCards = Object.values(cardDataMap).filter((cardData) => {
    return cardData.rarity !== "base"
  })

  let weightedCardList: CardName[] = []

  for (let x = 0; x < allAvailableCards.length; x++) {
    const card = allAvailableCards[x]
    if (card.rarity === "common") {
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)

      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)

      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
    }
    if (card.rarity === "uncommon") {
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)

      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
    }
    if (card.rarity === "rare") {
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)

      weightedCardList.push(card.name)
    }
    if (card.rarity === "epic") {
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
    }
    if (card.rarity === "legendary") {
      weightedCardList.push(card.name)
      weightedCardList.push(card.name)
    }
    if (card.rarity === "mythic") {
      weightedCardList.push(card.name)
    }
  }

  const NUM_CARDS_TO_GENERATE = 3
  const selectedCardNames: CardName[] = []
  for (let x = 0; x < NUM_CARDS_TO_GENERATE; x++) {
    const selectedCardName = getRandomItemFromArray(weightedCardList, getSeedFromString(`${getDateString()}-${x}`))
    if (selectedCardName === undefined) {
      throw Error("decide shop cards no available cards")
    }

    selectedCardNames.push(selectedCardName)

    weightedCardList = weightedCardList.filter((cardName) => {
      return cardName !== selectedCardName
    })
  }

  const randomPackVariantPercentile = getRandomInt(100, getSeedFromString(getDateString()))
  let packVariant: PackVariant = "Standard Pack"
  let runningTotal = 0
  for (let [packVariant, percent] of Object.entries(PACK_VARIANT_RATES)) {
    runningTotal += percent
    if (randomPackVariantPercentile < runningTotal) {
      packVariant = packVariant as PackVariant
      break
    }
  }

  const cardShopItems: ShopItem[] = selectedCardNames.map((cardName) => {
    return {
      type: "card",
      cardName,
      price: getShopCostForCard(cardName),
      title: cardName,
    }
  })

  const packShopItems: ShopItem[] = [
    {
      type: "pack",
      packVariant,
      price: getShopCostForPack(packVariant),
      title: packVariant,
    },
  ]

  return [...cardShopItems, ...packShopItems]
}
