import { useCallback } from "react"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import { sortDeckListNames } from "@/src/game/helpers"
import { CardData } from "@/src/game/cards/CardData"
import { Button } from "../designSystem/Button"
import { useGameStore } from "../../hooks/useGameStore"

export type AddOrSubtractFromDeckProps = {
  cardData: CardData
}

export const AddOrSubtractFromDeck = ({ cardData }: AddOrSubtractFromDeckProps) => {
  const { editDeck, setEditDeck } = useEditDeckState()

  const numInDeck = editDeck.cardNames.reduce((matches, cardName) => {
    return cardName === cardData.name ? [...matches, cardName] : matches
  }, [] as string[]).length

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
    <Button onClick={onSubtractCard} disabled={numInDeck <= 0}>
      -
    </Button>
  )
}

export type AddToDeckButtonProps = {
  cardData: CardData
}

export const AddToDeckButton = ({ cardData }: AddToDeckButtonProps) => {
  const { editDeck, setEditDeck } = useEditDeckState()
  const { game } = useGameStore()

  const numInDeck = editDeck.cardNames.reduce((matches, cardName) => {
    return cardName === cardData.name ? [...matches, cardName] : matches
  }, [] as string[]).length

  const quantityOwned = game.cardCollection[cardData.name]
  const godMode = game.settings.godMode

  const onAddCard = useCallback(() => {
    const newEditDeckState = {
      ...editDeck,
      cardNames: sortDeckListNames([cardData.name, ...editDeck.cardNames]),
    }
    setEditDeck(newEditDeckState)
  }, [editDeck, cardData.name, setEditDeck])

  return (
    <Button onClick={onAddCard} disabled={numInDeck >= quantityOwned && !godMode}>
      +
    </Button>
  )
}
