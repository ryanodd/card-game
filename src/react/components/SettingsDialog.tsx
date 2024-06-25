import * as Dialog from "@radix-ui/react-dialog"
import { ReactNode, useCallback, useState } from "react"
import styles from "./designSystem/Dialog.module.css"
import { useGameStore } from "../hooks/useGameStore"
import { Button } from "./designSystem/Button"
import { GameState } from "@/src/game/GameData"
import { deckMap } from "@/src/game/Decks"

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

  const onClickLogActiveDeck = useCallback(() => {
    if (game.activeDeckId === null) {
      return
    }
    console.log(JSON.stringify(game.decks.find((deck) => deck.id === game.activeDeckId)))
  }, [game.activeDeckId])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`}>
          <Dialog.Title className={`${styles.dialogTitle}`}>Settings</Dialog.Title>
          {/* <Dialog.Description className={`${styles.dialogDescription}`}>Lorem Ipsum</Dialog.Description> */}
          <Dialog.Close asChild>
            <button className={`${styles.dialogCloseButton}`}>Close</button>
          </Dialog.Close>
          <div className="flex flex-col">
            <div className="flex">
              {" "}
              <Button onClick={onClickLogActiveDeck}>Log Active Deck</Button>
            </div>
          </div>
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
