import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { createNewDuel } from "@/src/game/createNewDuel"
import { deckMap } from "@/src/game/Decks"
import { GameBackground } from "../components/GameBackground"
import { resetDuelUIStore } from "@/src/game/DuelController"
import { campaignData } from "@/src/game/Campaign"

export const CampaignSelectScreen = () => {
  const { game, setGame } = useGameStore()

  const onCampaignSelect = ({}) => {}
  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  return (
    <MainView>
      <GameBackground />
      <div className="w-full h-full flex flex-col p-4">
        <div className="flex flex-col items-center gap-4 grow">
          <h1 className="text-3xl">Campaign Select</h1>
          <h2>Active deck: {getActiveDeck(game)?.name ?? "None"}</h2>
          <div className="flex flex-col mt-8 gap-4">
            {campaignData.map((campaign) => (
              <Button key={campaign.id}>{campaign.title}</Button>
            ))}
          </div>
        </div>
        <div className="flex justify-start">
          <Button className="flex items-center" onClick={onBackClick}>
            ⬅ Back
          </Button>
        </div>
      </div>
    </MainView>
  )
}
