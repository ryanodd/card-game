import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { GameBackground } from "../components/GameBackground"
import { Footer } from "../components/Footer"
import { PackCell } from "../components/PackScreen/PackCell"
import { PackVariant } from "@/src/game/GameData"

export const ManagePacksScreen = () => {
  const { game, setGame } = useGameStore()

  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  const packVariantCounts = game.packs

  return (
    <MainView>
      <div className="w-full h-full flex flex-col">
        <div className="grow flex flex-col p-8 gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-stone-50">Packs</h1>
          </div>
          <div className="grow flex items-center gap-2">
            {Object.keys(packVariantCounts).map((packVariant) => {
              if (packVariantCounts[packVariant as PackVariant] === 0) {
                return null
              }
              return <PackCell key={packVariant} variant={packVariant as PackVariant} />
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
