import * as MenuButton from "@radix-ui/react-dropdown-menu"
import { Button } from "../designSystem/Button"
import styles from "../designSystem/MenuButton.module.css"
import { useCallback } from "react"
import { useDuelState } from "../../hooks/useDuelState"
import { useGameStore } from "../../hooks/useGameStore"
import { rollCardAttack } from "@/src/game/Actions"

export const DuelMenuButton = () => {
  const { game, setGame } = useGameStore()
  const onQuit = useCallback(() => {
    setGame({
      ...game,
      screen: {
        id: "mainMenu",
      },
    })
  }, [game, setGame])

  const onToggleDebug = useCallback(() => {
    setGame({
      ...game,
      settings: {
        ...game.settings,
        debug: {
          ...game.settings.debug,
          enabled: !game.settings.debug.enabled,
        },
      },
    })
  }, [game, setGame])
  return (
    <MenuButton.Root>
      <MenuButton.Trigger asChild>
        <Button className="absolute z-10 right-4 top-4">☰</Button>
      </MenuButton.Trigger>
      <MenuButton.Portal>
        <MenuButton.Content align="end" className={`${styles.menuButtonContent} z-10`} sideOffset={5}>
          <MenuButton.Item className={`${styles.menuButtonItem}`} onClick={onToggleDebug}>
            Toggle debug mode
          </MenuButton.Item>
          <MenuButton.Item className={`${styles.menuButtonItem}`} onClick={onQuit}>
            Quit
          </MenuButton.Item>
          <MenuButton.Arrow className={`${styles.menuButtonArrow}`} />
        </MenuButton.Content>
      </MenuButton.Portal>
    </MenuButton.Root>
  )
}
