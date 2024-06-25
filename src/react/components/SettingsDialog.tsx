import * as Dialog from "@radix-ui/react-dialog"
import { ReactNode, useCallback, useState } from "react"
import styles from "./designSystem/Dialog.module.css"
import { useGameStore } from "../hooks/useGameStore"
import { Button } from "./designSystem/Button"
import { GameState } from "@/src/game/GameData"

export type SettingsDialogProps = {
  trigger: ReactNode
}

export const SettingsDialog = ({ trigger }: SettingsDialogProps) => {
  const { game, setGame } = useGameStore()

  const [settings, setSettings] = useState<GameState["settings"]>(game.settings)

  const onSave = useCallback(() => {
    setGame({
      ...game,
      settings,
    })
  }, [game, setGame, settings])
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`}>
          <Dialog.Title className={`${styles.dialogTitle}`}>Settings</Dialog.Title>
          <Dialog.Description className={`${styles.dialogDescription}`}>Nothing here yet</Dialog.Description>
          <Dialog.Close asChild>
            <button className={`${styles.dialogCloseButton}`}>Close</button>
          </Dialog.Close>
          <div className="flex p-2 gap-2 justify-end">
            <Button onClick={onSave}>Save</Button>
            <Dialog.Close asChild>
              <Button data-variant="destructive">Cancel</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
