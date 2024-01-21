import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { createNewDuel } from "@/src/game/createNewDuel"
import { deckMap } from "@/src/game/Decks"
import { GameBackground } from "../components/GameBackground"
import { resetDuelUIStore } from "@/src/game/DuelController"

export const MainMenuScreen = () => {
  const { game, setGame } = useGameStore()
  const onManageDeckClick = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }
  const onStartDuelClick = () => {
    setGame({ ...game, screen: createNewDuel({ game, opponentDeck: deckMap.firstOpponent }) })
  }
  return (
    <MainView>
      <GameBackground />
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl">{"It's a card game!"}</h1>
          <h2>{`Active deck: ${getActiveDeck(game)?.name ?? "None"}`}</h2>
          <div className="flex flex-col mt-8 gap-4">
            <Button data-variant="primary" data-size="large" onClick={onStartDuelClick}>
              Start duel
            </Button>
            <Button data-size="large" onClick={onManageDeckClick}>
              Manage decks
            </Button>
          </div>
        </div>
      </div>
    </MainView>
  )
}
