import { CardData, cardDataMap } from "@/src/game/Cards"
import Image from "next/image"
import { CardDetailed, getCostIcons } from "../CardDetailed"
import { Tooltip } from "../Tooltip"
import { useDraggable } from "@dnd-kit/core"
import { useCallback, useEffect, useState } from "react"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import styles from "./Inventory.module.css"

export const DECK_LIST_CARD_WIDTH_REMS = 20
export const DECK_LIST_CARD_IMAGE_WIDTH_REMS = 16
export const DECK_LIST_CARD_IMAGE_HEIGHT_REMS = 3

export const BLANK_AREA_WIDTH = DECK_LIST_CARD_WIDTH_REMS - DECK_LIST_CARD_IMAGE_WIDTH_REMS

const GRADIENT_SPREAD = 6

// Assumes actual srcImage is square, and matches displayImage width
export const calculateTranslateYOffsetRem = (cardData: CardData, width: number, height: number) => {
  const imageCenterYRem = width * (cardData.imageCenterYPercent / 100) // what the 'centerY' of the image is, in rem
  const toCenterY = height / 2
  const translateYOffsetResult = toCenterY - imageCenterYRem

  const minTranslation = -(width - height) // So we clip to the bottom
  const maxTranslation = 0 // So we clip to the top

  const result = Math.max(minTranslation, Math.min(maxTranslation, translateYOffsetResult))
  return result
}

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
  }, [editDeck, cardData.name, setEditDeck])

  return (
    <Tooltip content={<CardDetailed cardData={cardData} />} side="left">
      <button
        className="relative shrink-0 flex justify-end rounded-md overflow-hidden"
        style={{ width: `${DECK_LIST_CARD_WIDTH_REMS}rem` }}
        onClick={onClick}
      >
        <Image
          className="object-cover"
          src={cardData.imageSrc}
          alt={cardData.name}
          width={512}
          height={512}
          style={{
            width: `${DECK_LIST_CARD_IMAGE_WIDTH_REMS}rem`,
            height: `${DECK_LIST_CARD_IMAGE_HEIGHT_REMS}rem`,
            objectPosition: `left 0 top ${calculateTranslateYOffsetRem(
              cardData,
              DECK_LIST_CARD_IMAGE_WIDTH_REMS,
              DECK_LIST_CARD_IMAGE_HEIGHT_REMS
            )}rem`,
          }}
        ></Image>
        <div
          className={`${styles.deckListCardContent}`}
          style={{
            // This is a gradient involving the tailwind color of the DeckList, in rgba form
            background: `linear-gradient(to right, rgba(41, 37, 36, 1) ${BLANK_AREA_WIDTH}rem, rgba(0, 0, 0, 0) ${
              BLANK_AREA_WIDTH + GRADIENT_SPREAD
            }rem)`,
          }}
        >
          {quantity > 1 && <span className={`${styles.deckListCardNumber}`}>{`${quantity}x`}</span>}
          <span className={`${styles.deckListCardText} text-shadow `}>{cardData.name}</span>
          <div className="flex flex-row">{getCostIcons(cardData)}</div>
        </div>
      </button>
    </Tooltip>
  )
}
