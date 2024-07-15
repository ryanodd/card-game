import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { GameBackground } from "../components/GameBackground"
import { useMemo } from "react"
import { Footer } from "../components/Footer"
import { ShopCell } from "../components/ShopScreen/ShopCell"
import { decideShopCards } from "@/src/game/shop/decideShopCards"

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
            <h2 className="text-xl text-stone-50">The shop&apos;s contents change daily.</h2>
          </div>
          <div className="grow flex gap-4">
            {cardsInShop.map((cardName) => {
              return <ShopCell key={cardName} cardName={cardName} />
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
