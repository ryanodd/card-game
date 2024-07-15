import * as MenuButton from "@radix-ui/react-dropdown-menu"
import { Button } from "../designSystem/Button"
import styles from "../designSystem/MenuButton.module.css"
import { useCallback } from "react"
import { useGameStore } from "../../hooks/useGameStore"
import { useDuelState } from "../../hooks/useDuelState"
import { DeleteDeckDialog } from "./DeleteDeckDialog"

export type DeckboxMenuButtonProps = {
  deckId: string
}

export const DeckboxMenuButton = ({ deckId }: DeckboxMenuButtonProps) => {
  const onRenameDeck = () => {}

  return (
    <MenuButton.Root modal={false}>
      <MenuButton.Trigger asChild>
        <Button className="">☰</Button>
      </MenuButton.Trigger>
      <MenuButton.Portal>
        <MenuButton.Content align="end" className={`${styles.menuButtonContent} z-10`} sideOffset={5}>
          <MenuButton.Item className={`${styles.menuButtonItem}`} onClick={onRenameDeck}>
            Rename deck
          </MenuButton.Item>
          <DeleteDeckDialog
            trigger={
              <MenuButton.Item
                className={`${styles.menuButtonItem}`}
                onSelect={(event) => {
                  // Prevent the Menu from closing when the Dialog opens.
                  // This is critical because the Dialog exists in the context
                  // of this menu. If the menu unmounts then so does the dialog.
                  event.preventDefault()
                }}
              >
                Delete deck
              </MenuButton.Item>
            }
            deckId={deckId}
          />
          <MenuButton.Arrow className={`${styles.menuButtonArrow}`} />
        </MenuButton.Content>
      </MenuButton.Portal>
    </MenuButton.Root>
  )
}
