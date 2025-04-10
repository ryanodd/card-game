import { v4 } from "uuid"
import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import { Deckbox } from "./Deckbox"
import styles from "./ManageDecksScreen.module.css"
import { createNewEditDeckState } from "../../hooks/useEditDeckState"

export const DeckGrid = () => {
  const { game, setGame } = useGameStore()
  const onCreateNewDeck = () => {
    setGame({
      ...game,
      screen: createNewEditDeckState(null),
    })
  }
  return (
    <div className="align-middle overflow-y-scroll py-4">
      <ul className={`${styles.deckGrid} grid auto-rows-fr gap-8 items-center`}>
        {game.decks.map((deck, i) => (
          <Deckbox key={i} deck={deck} />
        ))}
        <li>
          <Button className="flex flex-col items-center" onClick={onCreateNewDeck}>
            <span className="text-4xl">+</span>
            <span>New deck</span>
          </Button>
        </li>
      </ul>
    </div>
  )
}
