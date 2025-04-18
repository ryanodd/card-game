import Image from "next/image"
import { CardDetailed, getCostIcons } from "../Card/CardDetailed"
import { Tooltip } from "../designSystem/Tooltip"
import { useCallback } from "react"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import styles from "./Inventory.module.css"
import { calculateTranslateYOffsetRem } from "@/src/utils/calculateYOffsetRem"
import { CardName } from "@/src/game/cards/CardName"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"

export const DECK_LIST_CARD_WIDTH_REMS = 20
export const DECK_LIST_CARD_IMAGE_WIDTH_REMS = 16
export const DECK_LIST_CARD_IMAGE_HEIGHT_REMS = 3

export const BLANK_AREA_WIDTH = DECK_LIST_CARD_WIDTH_REMS - DECK_LIST_CARD_IMAGE_WIDTH_REMS

const GRADIENT_SPREAD = 6

export type DeckListCardProps = {
  cardName: string
  quantity: number
}

export const DeckListCard = ({ cardName, quantity }: DeckListCardProps) => {
  const cardData = cardDataMap[cardName as CardName]
  const { editDeck, setEditDeck } = useEditDeckState()

  const onClick = useCallback(() => {
    const removedCardIndex = editDeck.cardNames.findIndex((value) => value === cardData.name)
    if (removedCardIndex === -1) {
      throw Error(`Removed card not found in deck: ${cardData.name}`)
    }

    const newCardNames = [...editDeck.cardNames]
    newCardNames.splice(removedCardIndex, 1)
    setEditDeck({
      ...editDeck,
      cardNames: newCardNames,
    })
  }, [editDeck, cardData.name, setEditDeck])

  return (
    <Tooltip content={<CardDetailed cardData={cardData} />} side="left">
      <button
        className="relative shrink-0 flex justify-end rounded-md overflow-hidden hover:opacity-60"
        style={{ width: `${DECK_LIST_CARD_WIDTH_REMS}rem` }}
        onClick={onClick}
      >
        <Image
          className="object-cover"
          src={cardData.imageSrcLarge}
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
        />
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
          <span className={`${styles.deckListCardText} text-outline `}>{cardData.name}</span>
          <div className="flex flex-row">{getCostIcons(cardData)}</div>
        </div>
      </button>
    </Tooltip>
  )
}
