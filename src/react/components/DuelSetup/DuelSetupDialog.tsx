import * as Dialog from "@radix-ui/react-dialog"
import styles from "../designSystem/Dialog.module.css"
import { useGameStore } from "../../hooks/useGameStore"
import { DuelSetupContent } from "./DuelSetupContent"
import { ReactNode, useEffect, useState } from "react"
export type DuelSetupDialogProps = {
  trigger: ReactNode
  challengeId: string
}

export const DuelSetupDialog = ({ trigger, challengeId }: DuelSetupDialogProps) => {
  const { game, setGame } = useGameStore()
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content
          className={styles.dialogContent}
          onPointerDownOutside={(event) => {
            event?.preventDefault()
          }}
          data-size="md"
        >
          <Dialog.Close asChild>
            <button className={`${styles.dialogCloseButton}`}>Close</button>
          </Dialog.Close>
          <DuelSetupContent challengeId={challengeId} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
