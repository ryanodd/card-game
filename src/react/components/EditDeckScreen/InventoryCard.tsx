import { CardDetailed } from "../CardDetailed"
import { useDraggable } from "@dnd-kit/core"
import { useCallback } from "react"
import { InventoryCardFocusDialog } from "./InventoryCardFocusDialog"
import { CardData } from "@/src/game/cards/CardData"
import { useGameStore } from "../../hooks/useGameStore"

export type CardProps = {
  cardData: CardData
}

export const InventoryCard = ({ cardData }: CardProps) => {
  const { game } = useGameStore()

  const deckQuantity =
    game.screen.id === "editDeck" ? game.screen.cardNames.filter((cardName) => cardName === cardData.name).length : 0

  const quantityOwned = game.cardCollection[cardData.name]

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-inventory-card-${cardData.name}`,
    disabled: deckQuantity >= quantityOwned,
  })

  const onClick = useCallback(() => {}, [])

  return (
    <InventoryCardFocusDialog
      cardData={cardData}
      trigger={
        <button ref={setNodeRef} {...attributes} {...listeners} onClick={onClick}>
          <CardDetailed cardData={cardData} />
        </button>
      }
    />
  )
}
