import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { GameBackground } from "../components/GameBackground"
import { CardDetailed } from "../components/CardDetailed"
import { Footer } from "../components/Footer"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"

export const OpenPackScreen = () => {
  const { game, setGame } = useGameStore()

  const onBackClick = () => {
    setGame({ ...game, screen: { id: "managePacks" } })
  }

  const cardsOpened = game.screen.id === "openPack" ? game.screen.cardsOpened : []

  return (
    <MainView>
      <div className="w-full h-full flex flex-col">
        <div className="grow flex flex-col p-8 gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-stone-50">Opened pack</h1>
          </div>
          <div className="grow flex gap-2">
            {cardsOpened.map((cardName, i) => {
              return <CardDetailed key={i} cardData={cardDataMap[cardName]} />
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
