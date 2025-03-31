import * as Dialog from "@radix-ui/react-dialog"
import { useGameStore } from "../../hooks/useGameStore"
import { ReactNode, useCallback } from "react"
import { CardDetailed } from "../Card/CardDetailed"
import styles from "./InventoryCardFocusDialog.module.css"
import { CardData } from "@/src/game/cards/CardData"

export type InventoryCardFocusDialogProps = {
  cardData: CardData
  trigger: ReactNode
}

export const InventoryCardFocusDialog = ({ trigger, cardData }: InventoryCardFocusDialogProps) => {
  const { game } = useGameStore()
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`}>
          <CardDetailed cardData={cardData} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
