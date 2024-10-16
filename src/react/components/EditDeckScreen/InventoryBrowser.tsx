import { useGameStore } from "../../hooks/useGameStore"
import { InventoryCard } from "./InventoryCard"
import { sortCardNames } from "@/src/game/helpers"
import styles from "./Inventory.module.css"
import { cardDataMap } from "@/src/game/cards/AllCards"
import { CardName } from "@/src/game/cards/CardName"
import { InventoryCardCell } from "./InventoryCardCell"

export type InventoryBrowserProps = {}

export const InventoryBrowser = ({}: InventoryBrowserProps) => {
  const { game } = useGameStore()
  const cardList = sortCardNames([...Object.keys(game.collection)] as CardName[])

  return (
    <div className={`flex-grow ${styles.inventoryGrid}`}>
      {cardList.map((cardName) => (
        <InventoryCardCell key={cardName} cardData={cardDataMap[cardName]} />
      ))}
    </div>
  )
}
