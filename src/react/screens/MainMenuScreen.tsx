import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { deckMap } from "@/src/game/Decks"
import { GameBackground } from "../components/GameBackground"
import { GoldTotal } from "../components/GoldTotal"
import { createNewDuel } from "@/src/game/duel/createNewDuel"
import { SettingsDialog } from "../components/SettingsDialog"
import { Footer } from "../components/Footer"

export const MainMenuScreen = () => {
  const { game, setGame } = useGameStore()
  const onCampaignClick = () => {
    // if (game.currentCampaign) {
    //   setGame({ ...game, screen: { id: "" } })
    // } else {
    setGame({ ...game, screen: { id: "campaignSelect" } })

    // }
  }

  const onShopClick = () => {
    setGame({ ...game, screen: { id: "shop" } })
  }

  const onManageDeckClick = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }
  const onStartDuelClick = () => {
    setGame({ ...game, screen: createNewDuel({ game, opponentDeck: deckMap.firstOpponent }) })
  }
  const onDragAndDropDemoClick = () => {
    setGame({ ...game, screen: { id: "dragAndDropDemo" } })
  }
  return (
    <MainView>
      <GameBackground />
      <div className="h-full flex flex-col">
        <div className="grow flex flex-col justify-center items-center gap-4  p-4">
          <h1 className="text-3xl">{"It's a card game!"}</h1>
          <h2>{`Active deck: ${getActiveDeck(game)?.name ?? "None"}`}</h2>
          <div className="flex flex-col mt-8 gap-4">
            <div className="flex flex-col gap-4">
              <Button data-variant="primary" data-size="large" onClick={onStartDuelClick}>
                Play Now
              </Button>
              <Button data-size="large" onClick={onCampaignClick}>
                Campaign
              </Button>
            </div>
            <div className="flex flex-col mt-8 gap-4">
              <div className="flex gap-4">
                <Button className="w-48 flex-grow" data-size="large" onClick={onManageDeckClick}>
                  Decks
                </Button>
                <Button className="w-48 flex-grow" data-size="large" onClick={onManageDeckClick}>
                  Collection
                </Button>
              </div>
              <Button data-size="large" onClick={onShopClick}>
                Shop
              </Button>
            </div>
            <div className="flex flex-col mt-8 gap-4">
              <SettingsDialog trigger={<Button data-size="large">Settings</Button>} />
              <Button data-size="large" onClick={onDragAndDropDemoClick}>
                Drag and drop demo
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MainView>
  )
}
