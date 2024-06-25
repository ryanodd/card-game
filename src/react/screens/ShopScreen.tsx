import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { GameBackground } from "../components/GameBackground"
import { GoldTotal } from "../components/GoldTotal"
import { cardDataMap } from "@/src/game/cards/AllCards"
import { getRandomInt, getRandomItemFromArray, getRandomSeed, getSeedFromString } from "@/src/utils/randomNumber"
import { useEffect, useMemo } from "react"
import { CardDetailed } from "../components/CardDetailed"
import { CardName } from "@/src/game/cards/CardName"
import { Footer } from "../components/Footer"

export const decideShopCards = (): CardName[] => {
  let allAvailableCards = Object.values(cardDataMap).filter((cardData) => {
    return cardData.rarity !== "base"
  })

  // let weightedCardList = allAvailableCards.map((cardData) => {
  //   return cardData.name
  // })

  // weightedCardList.concat(
  //   allAvailableCards.filter((cardData) => {
  //     return cardData.rarity === "common"
  //   }).map((cardData) => {
  //     return cardData.name
  //   }).
  // )

  const NUM_CARDS_TO_GENERATE = 4
  const dateString = new Date().toISOString().slice(0, 10) // Changes each day. Always UTC time zone.
  const cardsToReturn: CardName[] = []
  for (let x = 0; x < NUM_CARDS_TO_GENERATE; x++) {
    const selectedCard = getRandomItemFromArray(allAvailableCards, getSeedFromString(`${dateString}-${x}`))
    if (selectedCard === undefined) {
      throw Error("decide shop cards no available cards")
    }
    const selectedCardName = selectedCard.name
    cardsToReturn.push(selectedCardName)
    allAvailableCards = allAvailableCards.filter((cardData) => {
      return cardData.name !== selectedCardName
    })
  }
  return cardsToReturn
}

export const ShopScreen = () => {
  const { game, setGame } = useGameStore()

  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  const cardsInShop = useMemo(() => {
    return decideShopCards()
  }, [])

  return (
    <MainView>
      <GameBackground />
      <div className="w-full h-full flex flex-col">
        <div className="grow flex flex-col p-8 gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-stone-50">Shop</h1>
            <h2 className="text-xl text-stone-50">The shop's contents change daily.</h2>
          </div>
          <div className="grow flex gap-2">
            {cardsInShop.map((cardName) => {
              return <CardDetailed key={cardName} cardData={cardDataMap[cardName]} />
            })}
          </div>
        </div>
        <Footer
          leftContent={
            <Button className="flex items-center" onClick={onBackClick}>
              ⬅ Back
            </Button>
          }
        />
      </div>
    </MainView>
  )
}
