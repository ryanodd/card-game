import { CardData, cardDataMap } from "@/src/game/Cards"
import cardStyles from "../Card.module.css"
import inventoryStyles from "./Inventory.module.css"
import Image from "next/image"
import { Tooltip } from "../Tooltip"
import { CardDetailed, getCostIcons } from "../CardDetailed"
import { useDraggable } from "@dnd-kit/core"
import { useCallback, useEffect, useState } from "react"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"
import { InventoryCardFocusDialog } from "./InventoryCardFocusDialog"
import { getAttackText } from "@/src/game/helpers"

export type CardProps = {
  cardData: CardData
}

export const InventoryCard = ({ cardData }: CardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-inventory-card-${cardData.name}`,
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
    ></InventoryCardFocusDialog>
  )
}
