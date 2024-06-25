import { randomUUID } from "crypto"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { createNewEditDeckState } from "../hooks/useEditDeckState"
import { useGameStore } from "../hooks/useGameStore"
import { v4 } from "uuid"
import { GameBackground } from "../components/GameBackground"
import { Deck } from "@/src/game/Deck"
import styles from "./ManageDecksScreen.module.css"
import { Footer } from "../components/Footer"

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
      className={`${styles.deckCell} rounded-md bg-stone-200 flex flex-col p-4 gap-2 shadow-lg relative h-72`}
    >
      <div className="flex justify-between">
        <h3 className=" text-xl text-stone-900">{deck.name}</h3>
        {game.activeDeckId === deck.id && (
          <p className=" bg-red-600 rounded-full text-sm text-white px-3 py-1">Active</p>
        )}
      </div>
      <h4 className="text-md text-stone-900">
        {deck.cardNames.length} {`${deck.cardNames.length === 1 ? "card" : "cards"}`}
      </h4>
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
      <div className="w-full h-full flex flex-col justify-between">
        <div className="grow flex flex-col p-8 gap-8">
          <h1 className="text-5xl text-stone-50">Decks</h1>
          <div className=" align-middle overflow-y-scroll">
            <ul className={`${styles.deckGrid} grid auto-rows-fr gap-8 items-center`}>
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
        </div>
        <Footer
          leftContent={
            <Button className="flex items-center" onClick={onBackClick}>
              ⬅ Back
            </Button>
          }
        />
      </div>
    </MainView>
  )
}
