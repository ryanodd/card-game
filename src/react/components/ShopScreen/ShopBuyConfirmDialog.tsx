import * as Dialog from "@radix-ui/react-dialog"
import { ReactNode, useCallback, useState } from "react"
import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import styles from "../designSystem/Dialog.module.css"
import { Close } from "../designSystem/Icon"

export type ShopBuyConfirmDialogProps = {
  cardName: string
  cost: number
  onConfirm: () => void
  trigger: ReactNode
}
export const ShopBuyConfirmDialog = ({ cardName, cost, onConfirm, trigger }: ShopBuyConfirmDialogProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`} data-size="sm">
          <Dialog.Title className={`${styles.dialogTitle}`}>Buy {cardName}?</Dialog.Title>
          <Dialog.Description className={`${styles.dialogDescription}`}>
            Buy {cardName} for {cost} gold?
          </Dialog.Description>
          <Dialog.Close asChild>
            <Button className={`${styles.dialogCloseButton}`} data-variant="tertiary" data-icon-only>
              <Close />
            </Button>
          </Dialog.Close>
          <div className="flex p-2 gap-2 justify-end">
            <Dialog.Close asChild>
              <Button>Never mind</Button>
            </Dialog.Close>

            <Button
              data-variant="primary"
              onClick={() => {
                onConfirm()
                setOpen(false)
              }}
            >
              Buy
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
