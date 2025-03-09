import * as Dialog from "@radix-ui/react-dialog"
import { FormEventHandler, ReactNode, useCallback, useState } from "react"
import styles from "./designSystem/Dialog.module.css"
import { useGameStore } from "../hooks/useGameStore"
import { Button } from "./designSystem/Button"
import { GameState } from "@/src/game/GameData"
import { deckMap } from "@/src/game/Decks"
import { Checkbox } from "./designSystem/Checkbox"
import { Close } from "./designSystem/Icon"

export type SettingsDialogProps = {
  trigger: ReactNode
}

export const SettingsDialog = ({ trigger }: SettingsDialogProps) => {
  const { game, setGame } = useGameStore()

  const [open, setOpen] = useState(false)
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
  }, [game.activeDeckId, game.decks])

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    setGame({
      ...game,
      settings,
    })
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`} data-size="md">
          <Dialog.Title className={`${styles.dialogTitle}`}>Settings</Dialog.Title>
          {/* <Dialog.Description className={`${styles.dialogDescription}`}>Lorem Ipsum</Dialog.Description> */}
          <Dialog.Close asChild>
            <Button className={`${styles.dialogCloseButton}`} data-variant="tertiary" data-icon-only>
              <Close />
            </Button>
          </Dialog.Close>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col p-4 gap-4">
              <Checkbox
                id="godMode"
                labelContent={"God mode"}
                checked={settings.godMode}
                onClick={(checked) => {
                  setSettings({
                    ...game.settings,
                    godMode: checked,
                  })
                }}
              />

              <div className="flex">
                <Button onClick={onClickLogActiveDeck}>Log Active Deck</Button>
              </div>
            </div>
            <div className="flex p-2 gap-2 justify-end">
              <Dialog.Close asChild>
                <Button data-variant="secondary">Cancel</Button>
              </Dialog.Close>
              <Button type="submit" data-variant="primary">
                Save
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
