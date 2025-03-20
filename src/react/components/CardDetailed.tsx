import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import cardStyles from "./Card.module.css"

import { CardData } from "@/src/game/cards/CardData"
import { CardState } from "@/src/game/duel/DuelData"
import { calculateTranslateYOffsetRem } from "@/src/utils/calculateYOffsetRem"

export const CARD_IMAGE_WIDTH_REMS = 16
export const CARD_IMAGE_HEIGHT_REMS = 12

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

export const CardDetailed = ({ cardData, cardState }: CardDetailedProps) => {
  return (
    <div
      className={`${cardStyles.card} ${cardStyles.full_card_size} ${cardStyles.full_card_border} bg-zinc-300 relative p-2 gap-2`}
      data-background={cardData.energyType}
    >
      <div className="flex gap-0.5 items-center -ml-1 -my-1">
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
        <p className={`${cardStyles.cardText}  `}>{cardData.text}</p>
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
