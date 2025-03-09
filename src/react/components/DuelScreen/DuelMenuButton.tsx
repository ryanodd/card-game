import * as MenuButton from "@radix-ui/react-dropdown-menu"
import { Button } from "../designSystem/Button"
import styles from "../designSystem/MenuButton.module.css"
import { useCallback } from "react"
import { useGameStore } from "../../hooks/useGameStore"
import { useDuelState } from "../../hooks/useDuelState"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"
import { Menu } from "../designSystem/Icon"

export const DuelMenuButton = () => {
  const { game, setGame } = useGameStore()
  const { duel, setDuel } = useDuelState()
  const { debugEnabled, setDebugEnabled } = useDuelUIStore()
  const onConcede = useCallback(() => {
    setDuel({
      ...duel,
      winner: "opponent",
    })
  }, [duel, setDuel])

  const onToggleDebug = useCallback(() => {
    setDebugEnabled(!debugEnabled)
  }, [debugEnabled, setDebugEnabled])

  return (
    <MenuButton.Root modal={false}>
      <MenuButton.Trigger asChild>
        <Button className="absolute z-10 right-4 top-4" data-variant="tertiary" data-icon-only>
          <Menu />
        </Button>
      </MenuButton.Trigger>
      <MenuButton.Portal>
        <MenuButton.Content align="end" className={`${styles.menuButtonContent} z-10`} sideOffset={5}>
          <MenuButton.Item className={`${styles.menuButtonItem}`} onClick={onToggleDebug}>
            Toggle debug mode
          </MenuButton.Item>
          <MenuButton.Item
            className={`${styles.menuButtonItem}`}
            disabled={duel.currentAnimation !== null}
            onClick={onConcede}
          >
            Concede
          </MenuButton.Item>
          <MenuButton.Arrow className={`${styles.menuButtonArrow}`} />
        </MenuButton.Content>
      </MenuButton.Portal>
    </MenuButton.Root>
  )
}
