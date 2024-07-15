import * as Dialog from "@radix-ui/react-dialog"
import styles from "../designSystem/Dialog.module.css"
import { useGameStore } from "../../hooks/useGameStore"
import { useEffect, useState } from "react"
import { DuelState } from "@/src/game/duel/DuelData"
import { getDuelPlayerById } from "@/src/game/duel/DuelHelpers"
import { CardSelectContent } from "./CardSelectContent"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"

export type CardSelectDialogProps = {
  duel: DuelState
}

export const CardSelectDialog = ({ duel }: CardSelectDialogProps) => {
  const { dialogShowBattlefield } = useDuelUIStore()
  const open =
    duel.currentAnimation === null &&
    (duel.choice.id === "CARD_SELECT" || duel.choice.id === "MULLIGAN") &&
    duel.choice.playerId === "human" &&
    !dialogShowBattlefield
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content
          className={`absolute inset-4 z-50 flex justify-center items-center`}
          onPointerDownOutside={(event) => {
            event?.preventDefault()
          }}
        >
          <CardSelectContent duel={duel} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
