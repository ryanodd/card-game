import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { createNewDuel } from "@/src/game/createNewDuel"
import { deckMap } from "@/src/game/Decks"
import { GameBackground } from "../components/GameBackground"
import { resetDuelUIStore } from "@/src/game/DuelController"
import { GoldTotal } from "../components/GoldTotal"

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
      <div className="w-full h-full flex flex-col p-4">
        <div className="flex flex-col justify-center items-center gap-4 grow">
          <h1 className="text-3xl">{"It's a card game!"}</h1>
          <h2>{`Active deck: ${getActiveDeck(game)?.name ?? "None"}`}</h2>
          <div className="flex flex-col mt-8 gap-4">
            <Button data-variant="primary" data-size="large" onClick={onStartDuelClick}>
              Play Now
            </Button>
            <Button data-size="large" onClick={onCampaignClick}>
              Campaign
            </Button>
            <Button data-size="large" onClick={onShopClick}>
              Shop
            </Button>
            <Button data-size="large" onClick={onManageDeckClick}>
              Manage decks
            </Button>
            <Button data-size="large" onClick={onDragAndDropDemoClick}>
              Drag and drop demo
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <GoldTotal value={game.gold} />
        </div>
      </div>
    </MainView>
  )
}
