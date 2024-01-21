import * as MenuButton from "@radix-ui/react-dropdown-menu"
import { Button } from "../designSystem/Button"
import styles from "../designSystem/MenuButton.module.css"
import { useCallback } from "react"
import { useDuelState } from "../../hooks/useDuelState"
import { useGameStore } from "../../hooks/useGameStore"

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
  return (
    <MenuButton.Root>
      <MenuButton.Trigger asChild>
        <Button className="absolute right-4 top-4">Menu</Button>
      </MenuButton.Trigger>
      <MenuButton.Portal>
        <MenuButton.Content className={`${styles.menuButtonContent}`} sideOffset={5}>
          <MenuButton.Item className={`${styles.menuButtonItem}`} onClick={onQuit}>
            Quit
          </MenuButton.Item>
          <MenuButton.Arrow className={`${styles.menuButtonArrow}`} />
        </MenuButton.Content>
      </MenuButton.Portal>
    </MenuButton.Root>
  )
}
