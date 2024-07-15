import { Deck } from "@/src/game/Deck"
import { useGameStore } from "../../hooks/useGameStore"
import { createNewEditDeckState } from "../../hooks/useEditDeckState"
import { Button } from "../designSystem/Button"
import styles from "./ManageDecksScreen.module.css"
import { DeckboxMenuButton } from "./DeckboxMenuButton"

export type DeckboxProps = {
  deck: Deck
}

export const Deckbox = ({ deck }: DeckboxProps) => {
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
  return (
    <li
      key={`${deck.id}`}
      className={`${styles.deckCell} rounded-md bg-stone-200 flex flex-col p-4 gap-2 shadow-lg relative h-72`}
    >
      <div className="flex justify-between">
        <h3 className=" text-xl text-stone-900">{deck.name}</h3>

        <DeckboxMenuButton deckId={deck.id} />
      </div>
      <h4 className="text-md text-stone-900">
        {deck.cardNames.length} {`${deck.cardNames.length === 1 ? "card" : "cards"}`}
      </h4>
      <div className="flex-grow" />
      <div className="flex gap-1 items-center end">
        {game.activeDeckId === deck.id && (
          <p className=" justify-self-start bg-red-600 rounded-full text-sm text-white px-3 py-1">Active</p>
        )}
        {game.activeDeckId !== deck.id && (
          <Button
            onClick={() => {
              onMakeActive(deck.id)
            }}
          >
            Make Active
          </Button>
        )}
        <div className="flex-grow" />
        <Button
          onClick={() => {
            onEditDeck(deck.id)
          }}
        >
          Edit
        </Button>
      </div>
    </li>
  )
}
