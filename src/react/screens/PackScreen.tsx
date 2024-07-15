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
import { ShopCell } from "../components/ShopScreen/ShopCell"
import { decideShopCards } from "@/src/game/shop/decideShopCards"
import { PackCell } from "../components/PackScreen/PackCell"

export const PackScreen = () => {
  const { game, setGame } = useGameStore()

  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  const packs = game.packs

  return (
    <MainView>
      <GameBackground />
      <div className="w-full h-full flex flex-col">
        <div className="grow flex flex-col p-8 gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-stone-50">Packs</h1>
          </div>
          <div className="grow flex gap-2">
            {Object.keys(packs).map((packRarity) => {
              return <PackCell key={packRarity} />
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
