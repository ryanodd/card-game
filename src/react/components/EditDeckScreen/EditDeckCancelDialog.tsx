import * as Dialog from "@radix-ui/react-dialog"
import { useCallback } from "react"
import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import styles from "../designSystem/Dialog.module.css"
import { Close } from "../designSystem/Icon"

export const EditDeckCancelDialog = () => {
  const { game, setGame } = useGameStore()
  const onCancel = useCallback(() => {
    setGame({
      ...game,
      screen: {
        id: "manageDecks",
      },
    })
  }, [game, setGame])
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button data-variant="tertiary" className={`${styles.dialogCloseButton}`}>
          <Close />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`} data-size="sm">
          <Dialog.Title className={`${styles.dialogTitle}`}>Cancel</Dialog.Title>
          <Dialog.Description className={`${styles.dialogDescription}`}>
            Are you sure you want to cancel without saving?
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className={`${styles.dialogCloseButton}`}>Close</button>
          </Dialog.Close>
          <div className="flex p-2 gap-2 justify-end">
            <Dialog.Close asChild>
              <Button>Never mind</Button>
            </Dialog.Close>
            <Button data-variant="destructive" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
