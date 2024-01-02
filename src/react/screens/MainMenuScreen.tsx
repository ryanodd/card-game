import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { createNewDuel } from "@/src/game/createNewDuel"
import { deckMap } from "@/src/game/Decks"

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
      <h1>{"It's a card game!"}</h1>
      <h2>{`Active deck: ${getActiveDeck(game)?.name ?? "None"}`}</h2>
      <Button onClick={onManageDeckClick}>Manage decks</Button>
      <Button onClick={onStartDuelClick}>Start duel</Button>
    </MainView>
  )
}
