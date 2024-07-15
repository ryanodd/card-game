import { v4 } from "uuid"
import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import { Deckbox } from "./Deckbox"
import styles from "./ManageDecksScreen.module.css"
import { createNewEditDeckState } from "../../hooks/useEditDeckState"

export const DeckGrid = () => {
  const { game, setGame } = useGameStore()
  const onCreateNewDeck = () => {
    const newDeck = { id: v4(), name: "My Deck", cardNames: [] }

    setGame({
      ...game,
      screen: createNewEditDeckState(newDeck),
    })
  }
  return (
    <div className="align-middle overflow-y-scroll">
      <ul className={`${styles.deckGrid} grid auto-rows-fr gap-8 items-center`}>
        {game.decks.map((deck, i) => (
          <Deckbox key={i} deck={deck} />
        ))}
        <li>
          <Button data-variant="primary" className="flex flex-col items-center" onClick={onCreateNewDeck}>
            <span className="text-4xl">+</span>
            <span>New deck</span>
          </Button>
        </li>
      </ul>
    </div>
  )
}
