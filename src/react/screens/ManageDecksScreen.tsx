import { randomUUID } from "crypto"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { createNewEditDeckState } from "../hooks/useEditDeckState"
import { useGameStore } from "../hooks/useGameStore"
import { v4 } from "uuid"

export const ManageDecksScreen = () => {
  const { game, setGame } = useGameStore()
  const onEditDeck = (deckId: string) => {
    const deck = game.decks.find((deck) => deck.id === deckId)
    if (deck === undefined) {
      throw Error(`deck id ${deckId} not found`)
    }
    setGame({
      ...game,
      screen: createNewEditDeckState(deck),
    })
  }
  const onMakeActive = (deckId: string) => {
    setGame({
      ...game,
      activeDeckId: deckId,
    })
  }
  const onCreateNewDeck = () => {
    const newDeck = { id: v4(), name: "My Deck", cardNames: [] }

    setGame({
      ...game,
      decks: [...game.decks, newDeck],
      screen: createNewEditDeckState(newDeck),
    })
  }
  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  return (
    <MainView>
      <div className="w-full h-full bg-stone-700 flex flex-col p-4 gap-4">
        <ul className="flex flex-wrap gap-4">
          {game.decks.map((deck, i) => (
            <li key={`${deck.id}`} className="rounded-md bg-orange-500 flex items-center p-4 gap-4">
              <h2>{deck.name}</h2>
              <Button
                onClick={() => {
                  onEditDeck(deck.id)
                }}
              >
                Edit
              </Button>
              {game.activeDeckId === deck.id ? (
                <p>Active</p>
              ) : (
                <Button
                  onClick={() => {
                    onMakeActive(deck.id)
                  }}
                >
                  Make Active
                </Button>
              )}
            </li>
          ))}
          <li>
            <Button onClick={onCreateNewDeck}>Create new deck</Button>
          </li>
        </ul>
        <Button onClick={onBackClick}>Back</Button>
      </div>
    </MainView>
  )
}
