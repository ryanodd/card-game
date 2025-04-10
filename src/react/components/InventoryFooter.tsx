import { getTotalPacksInInventory } from "@/src/game/shop/Packs"
import { Button } from "./designSystem/Button"
import styles from "./InventoryFooter.module.css"
import { useGameStore } from "../hooks/useGameStore"

export const InventoryFooter = () => {
  const { game, setGame } = useGameStore()

  const onManageDeckClick = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }
  const onCollectionClick = () => {
    setGame({ ...game, screen: { id: "collection" } })
  }

  const onPacksClick = () => {
    setGame({ ...game, screen: { id: "managePacks" } })
  }

  const totalPacks = getTotalPacksInInventory(game)

  return (
    <div className={styles.inventoryFooter}>
      <Button data-id="decks" data-size="large" onClick={onManageDeckClick}>
        Decks
      </Button>
      <Button data-id="collection" data-size="large" onClick={onCollectionClick}>
        Collection
      </Button>
      <Button
        data-size="large"
        onClick={onPacksClick}
        notificationDotText={totalPacks > 0 ? totalPacks.toString() : undefined}
      >
        Packs
      </Button>
    </div>
  )
}
