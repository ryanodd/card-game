import * as Dialog from "@radix-ui/react-dialog"
import styles from "../designSystem/Dialog.module.css"
import { useGameStore } from "../../hooks/useGameStore"
import { DuelCompleteContent } from "./DuelCompleteContent"
import { useEffect, useState } from "react"

export type DuelCompleteDialogProps = {}

export const DuelCompleteDialog = ({}: DuelCompleteDialogProps) => {
  const [open, setOpen] = useState(false)
  const { game } = useGameStore()
  const isDuelComplete = game.screen.id === "duel" && game.screen.duel.winner !== null
  useEffect(() => {
    if (isDuelComplete) {
      setOpen(true)
    }
  }, [isDuelComplete])
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content
          className={`absolute inset-72 z-50`}
          onPointerDownOutside={(event) => {
            event?.preventDefault()
          }}
        >
          <DuelCompleteContent />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
