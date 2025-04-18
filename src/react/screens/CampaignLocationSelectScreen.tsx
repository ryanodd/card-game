import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { GameBackground } from "../components/GameBackground"
import { Footer } from "../components/Footer"
import { LocationSelect } from "../components/CampaignLocationSelectScreen/LocationSelect"

export const CampaignLocationSelectScreen = () => {
  const { game, setGame } = useGameStore()

  const onCampaignSelect = ({}) => {}
  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col p-8 gap-8 grow">
        <h1 className="text-5xl text-stone-50">Campaign Select</h1>
        <h2 className="text-lg text-stone-50">Active deck: {getActiveDeck(game)?.name ?? "None"}</h2>
        <LocationSelect />
      </div>
      <Footer
        leftContent={
          <Button className="flex items-center" onClick={onBackClick}>
            ⬅ Back
          </Button>
        }
      />
    </div>
  )
}
