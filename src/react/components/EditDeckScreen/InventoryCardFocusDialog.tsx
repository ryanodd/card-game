import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "../designSystem/Button"
import { useGameStore } from "../../hooks/useGameStore"
import { ReactNode, useCallback } from "react"
import dialogStyles from "../designSystem/Dialog.module.css"
import { CardDetailed } from "../CardDetailed"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import styles from "./InventoryCardFocusDialog.module.css"
import { CardData } from "@/src/game/cards/CardData"
import { AddOrSubtractFromDeck } from "./AddOrSubtractFromDeck"

export type InventoryCardFocusDialogProps = {
  cardData: CardData
  trigger: ReactNode
}

export const InventoryCardFocusDialog = ({ trigger, cardData }: InventoryCardFocusDialogProps) => {
  const { game } = useGameStore()
  const isEditingDeck = game.screen.id === "editDeck"
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`}>
          <CardDetailed cardData={cardData} />
          {isEditingDeck && <AddOrSubtractFromDeck cardData={cardData} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
