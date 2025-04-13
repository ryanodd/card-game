import { useGameStore } from "../../hooks/useGameStore"
import { DefaultDialog } from "../designSystem/Dialog"
import styles from "./CardsRemovedDialog.module.css"

export const CardsRemovedDialog = () => {
  const { game, setGame } = useGameStore()
  const cardsRemoved = game.screen.id === "mainMenu" ? game.screen.cardsRemoved : undefined

  if (!cardsRemoved) {
    return null
  }
  return (
    <DefaultDialog
      title="Cards removed"
      trigger={null}
      open={!!cardsRemoved}
      onOpenChange={(open) => {
        if (!open) {
          setGame({ ...game, screen: { id: "mainMenu", cardsRemoved: undefined } })
        }
      }}
      content={
        <div className={styles.cardsRemovedSection}>
          <p>The following cards have been removed from the game:</p>
          <ul>
            {cardsRemoved.map((cardRemoved) => (
              <li key={cardRemoved} className={styles.listItem}>
                {cardRemoved}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  )
}
