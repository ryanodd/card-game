import {
  getDateString,
  getHourString,
  getRandomInt,
  getRandomItemFromArray,
  getSeedFromString,
} from "@/src/utils/randomNumber"
import { CardName } from "../cards/CardName"
import { ShopItem } from "./ShopItem"
import { getShopCostForCard, getShopCostForPack } from "./getShopCostForCard"
import { cardDataMap } from "../cards/allCards/allCards"
import { PackVariant } from "../GameData"
import { useCallback, useEffect, useState } from "react"

export const SECOND_MS = 1000
export const MINUTE_MS = 60 * SECOND_MS
export const HOUR_MS = 60 * MINUTE_MS

const PACK_VARIANT_RATES: Record<PackVariant, number> = {
  "Standard Pack": 80,
  "Elite Pack": 20,
}

// As currently implemented, must be divisible evenly into 24h
export const HOURS_INTERVAL = 1
const getShopSeedString = () => {
  return `${getDateString()}-${parseInt(getHourString()) % HOURS_INTERVAL}`
}

const getMsUntilShopRefresh = () => {
  const msNow = Date.now()
  const intervalMs = HOURS_INTERVAL * HOUR_MS
  return intervalMs - (msNow % intervalMs)
}

export const useMsUntilShopRefreshText = () => {
  const [text, setText] = useState("")
  const updateText = useCallback(() => {
    const secondsUntilRefresh = Math.floor(getMsUntilShopRefresh() / 1000)
    const minutesUntilRefresh = Math.floor(secondsUntilRefresh / 60)
    const hoursUntilRefresh = Math.floor(minutesUntilRefresh / 60)
    const secondsToDisplay = secondsUntilRefresh % 60
    const minutesToDisplay = minutesUntilRefresh % 60
    const hoursToDisplay = hoursUntilRefresh

    const hoursString = hoursToDisplay >= 10 ? hoursToDisplay.toString() : `0${hoursToDisplay}`
    const minutesString = minutesToDisplay >= 10 ? minutesToDisplay.toString() : `0${minutesToDisplay}`
    const secondsString = secondsToDisplay >= 10 ? secondsToDisplay.toString() : `0${secondsToDisplay}`

    setText(
      hoursString === "00" ? `${minutesString}:${secondsString}` : `${hoursString}:${minutesString}:${secondsString}`
    )
  }, [setText])
  useEffect(() => {
    updateText()
    const interval = setInterval(updateText)
    return () => {
      clearInterval(interval)
    }
  }, [updateText])
  return text
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
    const selectedCardName = getRandomItemFromArray(weightedCardList, getSeedFromString(`${getShopSeedString()}-${x}`))
    if (selectedCardName === undefined) {
      throw Error("decide shop cards no available cards")
    }

    selectedCardNames.push(selectedCardName)

    weightedCardList = weightedCardList.filter((cardName) => {
      return cardName !== selectedCardName
    })
  }

  const randomPackVariantPercentile = getRandomInt(100, getSeedFromString(getShopSeedString()))
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
