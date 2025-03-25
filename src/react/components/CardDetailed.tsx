import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import cardStyles from "./Card.module.css"

import { CardData, CardTextIconName } from "@/src/game/cards/CardData"
import { CardState } from "@/src/game/duel/DuelData"
import { calculateTranslateYOffsetRem } from "@/src/utils/calculateYOffsetRem"
import { ReactElement, ReactNode } from "react"
import { Dice, Heart, IconProps, Scratch, Sword } from "./designSystem/Icon"

export const CARD_IMAGE_WIDTH_REMS = 16 - 1.75
export const CARD_IMAGE_HEIGHT_REMS = 11

export type CardDetailedProps = {
  cardData: CardData
  cardState?: CardState
}

export const getCostIcons = (cardData: CardData) => {
  const icons = []
  if (cardData.cost.neutral !== 0) {
    icons.push(<EnergyIcon energyType="neutral" size="small" amount={cardData.cost.neutral} key="neutral" />)
  }
  if (cardData.cost.fire !== undefined) {
    for (let x = 0; x < cardData.cost.fire; x++) {
      icons.push(<EnergyIcon energyType="fire" size="small" key={`fire-${x}`} />)
    }
  }
  if (cardData.cost.water !== undefined) {
    for (let x = 0; x < cardData.cost.water; x++) {
      icons.push(<EnergyIcon energyType="water" size="small" key={`water-${x}`} />)
    }
  }
  if (cardData.cost.earth !== undefined) {
    for (let x = 0; x < cardData.cost.earth; x++) {
      icons.push(<EnergyIcon energyType="earth" size="small" key={`earth-${x}`} />)
    }
  }
  if (cardData.cost.air !== undefined) {
    for (let x = 0; x < cardData.cost.air; x++) {
      icons.push(<EnergyIcon energyType="air" size="small" key={`air-${x}`} />)
    }
  }
  return icons
}

export type CardTextIconProps = IconProps & {
  cardTextIconName: CardTextIconName
}

const cardTextIconMap = {
  damage: Scratch,
  dice: Dice,
  heart: Heart,
  sword: Sword,
}

export const CardTextIcon = ({ cardTextIconName, ...props }: CardTextIconProps) => {
  const IconElement = cardTextIconMap[cardTextIconName]
  return <IconElement className={cardStyles.cardTextIcon} {...props} />
}

export const CardDetailed = ({ cardData, cardState }: CardDetailedProps) => {
  return (
    <div
      className={`${cardStyles.card} ${cardStyles.full_card_size} ${cardStyles.full_card_border} bg-zinc-300 relative p-2 gap-2`}
      data-background={cardData.energyType}
    >
      <div className={`${cardStyles.cardNameContainer}`}>
        {getCostIcons(cardData)}
        <h2 className={`${cardStyles.cardName} tracking-tight`}>{cardData.name}</h2>
      </div>
      <Image
        className="object-cover self-center rounded-md shadow-md pointer-events-none"
        src={cardData.imageSrcLarge}
        alt={cardData.name}
        width={512}
        height={512}
        style={{
          width: `${CARD_IMAGE_WIDTH_REMS}rem`,
          height: `${CARD_IMAGE_HEIGHT_REMS}rem`,
          objectPosition: `left 0 top ${calculateTranslateYOffsetRem(
            cardData,
            CARD_IMAGE_WIDTH_REMS,
            CARD_IMAGE_HEIGHT_REMS
          )}rem`,
        }}
      />
      <div className={`${cardStyles.cardCaptionRow}`}>
        <span className={`${cardStyles.cardCaptionLeftSection}`}></span>
        {cardData.rarity !== "base" && (
          <div className={`${cardStyles.rarityIndicator}`} data-rarity={cardData.rarity} />
        )}
        {!cardData.complete && <span className="justify-self-end self-center text-xs text-red-950">Incomplete</span>}
      </div>

      <div className={cardStyles.textContainer}>
        {cardData.text?.map((textParagraph, i) => {
          return (
            <p key={i} className={`${cardStyles.cardText}`}>
              {textParagraph.textList.map((textItem, i) => {
                if ("plainText" in textItem) {
                  return (
                    <span key={i} className={cardStyles.cardTextPlain}>
                      {textItem.plainText}
                    </span>
                  )
                }
                if ("boldText" in textItem) {
                  return (
                    <span key={i} className={cardStyles.cardTextBold}>
                      {textItem.boldText}
                    </span>
                  )
                }
                if ("keyword" in textItem) {
                  return (
                    <span key={i} className={cardStyles.cardTextBold}>
                      {textItem.keyword}
                    </span>
                  )
                }
                if ("icon" in textItem) {
                  return <CardTextIcon key={i} cardTextIconName={textItem.icon} size="sm" />
                }
                return null
              })}
            </p>
          )
        })}
      </div>
      <div className={`${cardStyles.cardFooter} h-8 -mb-2 -mx-2 gap-2`}>
        {cardData.cardType === "creature" && (
          <div className={`${cardStyles.attackIndicator} pl-2 pr-2.5 rounded-tr-xl `}>
            <h2 className="text-2xl text-stone-50 text-outline">{cardData.attack}</h2>
          </div>
        )}

        {cardData.cardType === "creature" && (
          <div className={`${cardStyles.healthIndicator} w-10 rounded-tl-xl pl-0.5`}>
            <h2 className="text-2xl text-stone-50 text-outline">{cardData.health}</h2>
          </div>
        )}
      </div>
    </div>
  )
}
