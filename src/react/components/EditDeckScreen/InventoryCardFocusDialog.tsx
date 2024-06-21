import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "../designSystem/Button"
import { useGameStore } from "../../hooks/useGameStore"
import { ReactNode, useCallback } from "react"
import dialogStyles from "../designSystem/Dialog.module.css"
import { CardDetailed } from "../CardDetailed"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import { sortCardNames } from "@/src/game/helpers"
import styles from "./InventoryCardFocusDialog.module.css"
import { DeckList } from "./DeckList"
import { CardData } from "@/src/game/cards/CardData"

export type InventoryCardFocusDialogProps = {
  cardData: CardData
  trigger: ReactNode
}

export const InventoryCardFocusDialog = ({ trigger, cardData }: InventoryCardFocusDialogProps) => {
  const { editDeck, setEditDeck } = useEditDeckState()

  const onAddCard = useCallback(() => {
    const newEditDeckState = {
      ...editDeck,
      deck: {
        ...editDeck.deck,
        cardNames: sortCardNames([cardData.name, ...editDeck.deck.cardNames]),
      },
    }
    setEditDeck(newEditDeckState)
  }, [editDeck, cardData.name, setEditDeck])

  const onSubtractCard = useCallback(() => {
    const removedCardIndex = editDeck.deck.cardNames.findIndex((value) => value === cardData.name)
    if (removedCardIndex === -1) {
      throw Error(`Removed card not found in deck: ${cardData.name}`)
    }

    const newCardNames = [...editDeck.deck.cardNames]
    newCardNames.splice(removedCardIndex, 1)
    setEditDeck({
      id: editDeck.id,
      deck: {
        ...editDeck.deck,
        cardNames: newCardNames,
      },
    })
  }, [editDeck, cardData.name, setEditDeck])

  const numInDeck = editDeck.deck.cardNames.reduce((matches, cardName) => {
    return cardName === cardData.name ? [...matches, cardName] : matches
  }, [] as string[]).length

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`}>
          <CardDetailed cardData={cardData} />
          <div className={`rounded-md bg-slate-400 bg-opacity-50 py-2 px-4 flex flex-col items-center `}>
            <p>In deck:</p>
            <div className="flex items-center p-2 gap-4 ">
              <Button onClick={onSubtractCard} disabled={numInDeck === 0}>
                -
              </Button>
              <p className="text-3xl w-12 text-center">{numInDeck}</p>
              <Button onClick={onAddCard}>+</Button>
            </div>
          </div>
        </Dialog.Content>
        {/* <div className="absolute right-0 top-0 bottom-0 z-50 p-2 flex">
          <DeckList />
        </div> */}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
