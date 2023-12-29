import { cardDataMap } from "@/src/game/Cards"
import Image from "next/image"
import { DetailedCard, getCostIcons } from "../DetailedCard"
import { Tooltip } from "../Tooltip"
import { useDraggable } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"

export type DeckListCardProps = {
  cardNumber: number
  quantity: number
}

export const DeckListCard = ({ cardNumber, quantity }: DeckListCardProps) => {
  const cardData = cardDataMap[cardNumber]

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-deck-list-card-${cardData.name}`,
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
      <div {...attributes} {...listeners} ref={setNodeRef} className="relative overflow-hidden" style={style}>
        <Image
          className="absolute inset-0 object-fill"
          src={cardData.imageSrc}
          alt={cardData.name}
          width={512}
          height={512}
        ></Image>
        <div className="relative z-10 pr-2 py-2 flex flex-row gap-2">
          <span className={`bg-red-500 px-2 ${quantity === 1 ? "opacity-0" : ""}`}>{quantity}</span>
          <span className="text-shadow flex-grow text-ellipsis line-clamp-1">{cardData.name}</span>
          <div className="flex flex-row">{getCostIcons(cardData)}</div>
        </div>
      </div>
    </Tooltip>
  )
}
