import { getDateString, getRandomItemFromArray, getSeedFromString } from "@/src/utils/randomNumber"
import { CardName } from "../cards/CardName"
import { cardDataMap } from "../cards/AllCards"

export const decideShopCards = (): CardName[] => {
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

  const NUM_CARDS_TO_GENERATE = 4
  const cardsToReturn: CardName[] = []
  for (let x = 0; x < NUM_CARDS_TO_GENERATE; x++) {
    const selectedCardName = getRandomItemFromArray(weightedCardList, getSeedFromString(`${getDateString()}-${x}`))
    if (selectedCardName === undefined) {
      throw Error("decide shop cards no available cards")
    }

    cardsToReturn.push(selectedCardName)

    weightedCardList = weightedCardList.filter((cardName) => {
      return cardName !== selectedCardName
    })
  }
  return cardsToReturn
}
