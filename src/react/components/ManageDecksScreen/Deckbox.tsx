import { Deck } from "@/src/game/decks/Deck"
import { useGameStore } from "../../hooks/useGameStore"
import { createNewEditDeckState } from "../../hooks/useEditDeckState"
import { Button } from "../designSystem/Button"
import styles from "./ManageDecksScreen.module.css"
import { DeckboxMenuButton } from "./DeckboxMenuButton"
import { EnergyIcon } from "../EnergyIcon"
import { heroDataMap } from "@/src/game/heroes/AllHeroes"

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

  const energyTypes = heroDataMap[deck.heroName].energyTypes
  return (
    <button key={`${deck.id}`} className={`${styles.deckCell}`} data-active={game.activeDeckId === deck.id}>
      {game.activeDeckId === deck.id && <p className={styles.deckCellActiveBadge}>Active</p>}
      <div className="flex justify-start items-center gap-4">
        <div className="flex flex-col gap-2">
          {energyTypes.map((energyType, i) => {
            return <EnergyIcon key={i} size="lg" energyType={energyType} />
          })}
        </div>
        <h3 className={styles.deckCellTitle}>{deck.name}</h3>
      </div>
      <h4 className="text-md text-stone-900">
        {deck.cardNames.length} {`${deck.cardNames.length === 1 ? "card" : "cards"}`}
      </h4>

      <div className="flex-grow" />

      <div className="flex gap-2 items-end justify-between">
        <div className="flex flex-col gap-2 w-40">
          {game.activeDeckId !== deck.id && (
            <Button
              onClick={() => {
                onMakeActive(deck.id)
              }}
            >
              Make active
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
        <DeckboxMenuButton deckId={deck.id} />
      </div>
    </button>
  )
}
