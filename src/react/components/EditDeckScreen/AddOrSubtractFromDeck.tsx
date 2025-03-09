import { useCallback } from "react"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import { sortDeckListNames } from "@/src/game/helpers"
import { CardData } from "@/src/game/cards/CardData"
import { Button } from "../designSystem/Button"
import { COLLECTION_MAX_PER_CARD } from "@/src/game/GameData"
import { useGameStore } from "../../hooks/useGameStore"

export type AddOrSubtractFromDeckProps = {
  cardData: CardData
}

export const AddOrSubtractFromDeck = ({ cardData }: AddOrSubtractFromDeckProps) => {
  const { editDeck, setEditDeck } = useEditDeckState()
  const { game } = useGameStore()

  const numInDeck = editDeck.cardNames.reduce((matches, cardName) => {
    return cardName === cardData.name ? [...matches, cardName] : matches
  }, [] as string[]).length

  const quantityOwned = game.collection[cardData.name]
  const godMode = game.settings.godMode

  const onAddCard = useCallback(() => {
    const newEditDeckState = {
      ...editDeck,
      cardNames: sortDeckListNames([cardData.name, ...editDeck.cardNames]),
    }
    setEditDeck(newEditDeckState)
  }, [editDeck, cardData.name, setEditDeck])

  const onSubtractCard = useCallback(() => {
    const removedCardIndex = editDeck.cardNames.findIndex((value) => value === cardData.name)
    if (removedCardIndex === -1) {
      throw Error(`Removed card not found in deck: ${cardData.name}`)
    }

    const newCardNames = [...editDeck.cardNames]
    newCardNames.splice(removedCardIndex, 1)
    setEditDeck({
      ...editDeck,
      cardNames: newCardNames,
    })
  }, [editDeck, cardData.name, setEditDeck])

  return (
    <div className={`rounded-md bg-slate-400 bg-opacity-50 py-2 px-4 flex flex-col items-center `}>
      <p className="text-lg text-stone-50">In deck:</p>
      <div className="flex items-center p-2 gap-4 ">
        <Button onClick={onSubtractCard} disabled={numInDeck <= 0}>
          -
        </Button>
        <p className="text-3xl text-stone-50 w-12 text-center">{numInDeck}</p>
        <Button onClick={onAddCard} disabled={numInDeck >= quantityOwned && !godMode}>
          +
        </Button>
      </div>
    </div>
  )
}
