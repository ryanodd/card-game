import { randomUUID } from "crypto"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { createNewEditDeckState } from "../hooks/useEditDeckState"
import { useGameStore } from "../hooks/useGameStore"
import { v4 } from "uuid"
import { GameBackground } from "../components/GameBackground"
import { Deck } from "@/src/game/Deck"
import styles from "./ManageDecksScreen.module.css"

export type DeckCellProps = {
  deck: Deck
}

export const DeckCell = ({ deck }: DeckCellProps) => {
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
      className={`${styles.deckCell} rounded-md bg-stone-700 flex flex-col p-4 gap-2 shadow-lg relative h-72`}
    >
      {game.activeDeckId === deck.id && (
        <p className="absolute -top-2 -right-2 bg-red-500 rounded-full text-sm px-1">Active</p>
      )}
      <h3 className="text-xl">{deck.name}</h3>
      <div className="flex-grow" />
      <div className="flex gap-1 self-end">
        {game.activeDeckId !== deck.id && (
          <Button
            onClick={() => {
              onMakeActive(deck.id)
            }}
          >
            Make Active
          </Button>
        )}
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

export const ManageDecksScreen = () => {
  const { game, setGame } = useGameStore()

  const onCreateNewDeck = () => {
    const newDeck = { id: v4(), name: "My Deck", cardNames: [] }

    setGame({
      ...game,
      screen: createNewEditDeckState(newDeck),
    })
  }
  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  return (
    <MainView>
      <GameBackground />
      <div className="w-full h-full flex p-4 flex-col">
        <h1 className="text-5xl">Decks</h1>
        <div className="flex-grow overflow-y-scroll">
          <ul className={`${styles.deckGrid} grid auto-rows-fr p-4 gap-4 items-center`}>
            {game.decks.map((deck, i) => (
              <DeckCell key={i} deck={deck} />
            ))}
            <li>
              <Button data-variant="primary" className="flex flex-col items-center" onClick={onCreateNewDeck}>
                <span className="text-4xl">+</span>
                <span>New deck</span>
              </Button>
            </li>
          </ul>
        </div>
        <div className="flex justify-between">
          <Button className="flex items-center" onClick={onBackClick}>
            ⬅ Back
          </Button>
        </div>
      </div>
    </MainView>
  )
}
