import { cardDataMap } from "@/src/game/Cards"
import Image from "next/image"
import { DetailedCard, getCostIcons } from "../DetailedCard"
import { Tooltip } from "../Tooltip"
import { useDraggable } from "@dnd-kit/core"
import { useCallback, useEffect, useState } from "react"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"
import { useEditDeckState } from "../../hooks/useEditDeckState"

export type DeckListCardProps = {
  cardNumber: number
  quantity: number
}

export const DeckListCard = ({ cardNumber, quantity }: DeckListCardProps) => {
  const cardData = cardDataMap[cardNumber]
  const { editDeck, setEditDeck } = useEditDeckState()

  const onClick = useCallback(() => {
    const removedCardIndex = editDeck.deck.cardNames.findIndex((value) => value === cardData.name)
    if (removedCardIndex === -1) {
      throw Error(`Removed card not found in deck: ${cardData.name}`)
    }

    const newCardNames = [...editDeck.deck.cardNames]
    newCardNames.splice(removedCardIndex, 1)
    setEditDeck({
      id: editDeck.id,
      deck: {
        ...editDeck.deck,
        cardNames: newCardNames,
      },
    })
  }, [editDeck])

  return (
    <Tooltip content={<DetailedCard cardData={cardData} />}>
      <button className="relative overflow-hidden" onClick={onClick}>
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
      </button>
    </Tooltip>
  )
}
