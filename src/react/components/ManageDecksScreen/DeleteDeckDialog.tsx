import * as Dialog from "@radix-ui/react-dialog"
import { ReactNode, useCallback } from "react"
import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import styles from "../designSystem/Dialog.module.css"

export type DeleteDeckDialogProps = { trigger: ReactNode; deckId: string }

export const DeleteDeckDialog = ({ trigger, deckId }: DeleteDeckDialogProps) => {
  const { game, setGame } = useGameStore()
  // const deck = game.decks.find((deck) => deck.id === deckId)
  const onDelete = useCallback(() => {
    setGame({
      ...game,
      decks: game.decks.filter((deck) => {
        return deck.id !== deckId
      }),
    })
  }, [deckId, game, setGame])
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`} data-size="sm">
          <Dialog.Title className={`${styles.dialogTitle}`}>Delete deck</Dialog.Title>
          <Dialog.Description className={`${styles.dialogDescription}`}>
            {`Are you sure you want to delete this deck?`}
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className={`${styles.dialogCloseButton}`}>Close</button>
          </Dialog.Close>
          <div className="flex p-2 gap-2 justify-end">
            <Dialog.Close asChild>
              <Button>Never mind</Button>
            </Dialog.Close>
            <Button data-variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
