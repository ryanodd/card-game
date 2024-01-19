import { cardDataMap } from "@/src/game/Cards"
import { useGameStore } from "../../hooks/useGameStore"
import { InventoryCard } from "./InventoryCard"
import { sortCardNames } from "@/src/game/helpers"
import styles from "./Inventory.module.css"

export type InventoryBrowserProps = {}

export const InventoryBrowser = ({}: InventoryBrowserProps) => {
  const { game } = useGameStore()
  const cardList = sortCardNames([...Object.keys(game.collection)])

  return (
    <div className={`${styles.inventoryGrid} flex-grow grid gap-2.5`}>
      {cardList.map((cardName) => (
        <InventoryCard key={cardName} cardData={cardDataMap[cardName]}></InventoryCard>
      ))}
    </div>
  )
}
