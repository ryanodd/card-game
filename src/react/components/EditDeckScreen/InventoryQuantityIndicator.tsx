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
} & (
  | {
      variant: "pips"
      quantityInDeck: number
    }
  | { variant: "owned-number" }
)
export const InventoryQuantityIndicator = ({ quantity, ...props }: InventoryQuantityIndicatorProps) => {
  if (props.variant === "owned-number") {
    return (
      <div className={styles.inventoryQuantityOwnedTextContainer}>
        <span className={styles.inventoryQuantityOwnedText}>Owned:</span>
        <span className={styles.inventoryQuantityOwnedText2}>{quantity}</span>
      </div>
    )
  }
  if (props.variant === "pips") {
    return (
      <div className={styles.inventoryQuantityPipsContainer}>
        {getInventoryQuantityIndicatorPips(quantity, props.quantityInDeck).map((pip, i) => {
          return <div key={i} className={styles.inventoryQuantityPip} data-type={pip} />
        })}
      </div>
    )
  }
  return null
}
