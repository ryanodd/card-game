import { CardData } from "@/src/game/cards/CardData"
import { InventoryCard } from "./InventoryCard"
import { useGameStore } from "../../hooks/useGameStore"
import { InventoryQuantityIndicator } from "./InventoryQuantityIndicator"
import { CardDetailed } from "../CardDetailed"
import { Button } from "../designSystem/Button"
import { AddToDeckButton, SubtractFromDeckButton } from "./AddOrSubtractFromDeck"
import styles from "./Inventory.module.css"

export type InventoryCardProps = {
  cardData: CardData
  showAddSubtractControls?: boolean
  draggable?: boolean
}

export const InventoryCardCell = ({
  cardData,
  showAddSubtractControls = false,
  draggable = false,
}: InventoryCardProps) => {
  const { game } = useGameStore()

  const collectionQuantity = game.cardCollection[cardData.name]
  const deckQuantity =
    game.screen.id === "editDeck"
      ? game.screen.cardNames.filter((cardName) => cardName === cardData.name).length
      : collectionQuantity

  return (
    <div className={styles.inventoryCardCell}>
      <div
        className={styles.inventoryCardCardContainer}
        data-unowned={!game.settings.godMode && collectionQuantity === 0}
      >
        {draggable ? <InventoryCard cardData={cardData} /> : <CardDetailed cardData={cardData} />}
      </div>
      <div className="flex items-center gap-1 p-1">
        {showAddSubtractControls && <SubtractFromDeckButton cardData={cardData} />}
        <InventoryQuantityIndicator
          variant={showAddSubtractControls ? "pips" : "owned-number"}
          quantity={collectionQuantity}
          quantityInDeck={deckQuantity}
        />
        {showAddSubtractControls && <AddToDeckButton cardData={cardData} />}
      </div>
    </div>
  )
}
