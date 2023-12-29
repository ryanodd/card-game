import { CardData, cardDataMap } from "@/src/game/Cards"
import styles from "../Card.module.css"
import Image from "next/image"
import { Tooltip } from "../Tooltip"
import { DetailedCard, getCostIcons } from "../DetailedCard"
import { useDraggable } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"

export type CardProps = {
  cardData: CardData
}

export const InventoryCard = ({ cardData }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-inventory-card-${cardData.name}`,
  })
  const style = transform
    ? {
        zIndex: isDragging ? 999 : "auto",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const [isTooltipOpen, setIsTooltipOpen] = useHideTooltipWhileDragging(isDragging)

  return (
    <Tooltip content={<DetailedCard cardData={cardData} />} open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      <div
        className={`${styles.inventory_card_size} ${styles.card_border} bg-slate-300 relative p-1 gap-1 flex flex-col z-40`}
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div className="flex gap-0.5 items-center">
          {getCostIcons(cardData)}
          <h2 className="ml-auto text-sm text-neutral-900 tracking-tight line-clamp-1">{cardData.name}</h2>
        </div>
        <div className={`${styles.image_border} relative`}>
          <Image src={cardData.imageSrc} alt={cardData.name} width={512} height={512} />
        </div>
        <div className="w-9 h-9 rounded-tr-xl bg-red-500 absolute bottom-0 left-0 flex border-t border-r border-neutral-900 pr-0.5 justify-center items-center">
          <h2 className="text-2xl font-semibold">{cardData.attack}</h2>
        </div>
        <div className="w-9 h-9 rounded-tl-xl bg-stone-500 absolute bottom-0 right-0 flex border-t border-l border-neutral-900 justify-center items-center">
          <h2 className="text-2xl font-semibold">{cardData.health}</h2>
        </div>
      </div>
    </Tooltip>
  )
}
