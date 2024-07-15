import { COLLECTION_MAX_PER_CARD } from "@/src/game/GameData"
import styles from "./InventoryQuantityIndicator.module.css"

type Pip = "unavailable" | "available" | "active"

const getInventoryQuantityIndicatorPips = (quantity: number, quantityInDeck: number): Pip[] => {
  const pips: Pip[] = []
  for (let x = 0; x < COLLECTION_MAX_PER_CARD; x++) {
    if (quantity <= x) {
      pips.push("unavailable")
    } else if (quantityInDeck <= x) {
      pips.push("available")
    } else {
      pips.push("active")
    }
  }
  return pips
}

export type InventoryQuantityIndicatorProps = {
  quantity: number
  quantityInDeck: number
}

export const InventoryQuantityIndicator = ({ quantity, quantityInDeck }: InventoryQuantityIndicatorProps) => {
  const pips = getInventoryQuantityIndicatorPips(quantity, quantityInDeck)
  return (
    <div className={styles.inventoryQuantityContainer}>
      {pips.map((pip, i) => {
        return <div key={i} className={styles.inventoryQuantityPip} data-type={pip} />
      })}
    </div>
  )
}
