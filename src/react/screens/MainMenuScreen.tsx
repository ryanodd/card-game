import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"

export const MainMenuScreen = () => {
  const { game, setGame } = useGameStore()
  const onManageDeckClick = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }
  const onStartDuelClick = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
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
