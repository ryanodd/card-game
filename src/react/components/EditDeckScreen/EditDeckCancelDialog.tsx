import * as Dialog from "@radix-ui/react-dialog"
import { useCallback } from "react"
import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import styles from "../designSystem/Dialog.module.css"

export const EditDeckCancelDialog = () => {
  const { game, setGame } = useGameStore()
  const onCancel = useCallback(() => {
    setGame({
      ...game,
      screen: {
        id: "manageDecks",
      },
    })
  }, [])
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Cancel</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`}>
          <Dialog.Title className={`${styles.dialogTitle}`}>Cancel</Dialog.Title>
          <Dialog.Description className={`${styles.dialogDescription}`}>
            Are you sure you want to cancel?
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
