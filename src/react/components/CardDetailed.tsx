import { CardData, cardDataMap } from "@/src/game/Cards"
import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import cardStyles from "./Card.module.css"
import { CardState } from "@/src/game/DuelData"
import { getAttackText } from "@/src/game/helpers"
import { calculateTranslateYOffsetRem } from "./EditDeckScreen/DeckListCard"

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
        className="object-cover self-center rounded-md shadow-md"
        src={cardData.imageSrc}
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

      <p className={`${cardStyles.cardText} text-sm rounded-md px-2 py-4 grow leading-4`}>{cardData.text}</p>
      <div className={`${cardStyles.cardFooter} h-8 -mb-2 -mx-2 gap-2`}>
        {cardData.attack !== undefined && (
          <div className={`${cardStyles.attackIndicator} pl-2 pr-2.5 rounded-tr-xl `}>
            <h2 className="text-2xl text-shadow">{getAttackText(cardData, cardState)}</h2>
          </div>
        )}

        {cardData.health !== undefined && (
          <div className={`${cardStyles.healthIndicator} w-10 rounded-tl-xl pl-0.5`}>
            <h2 className="text-2xl text-shadow">{cardData.health}</h2>
          </div>
        )}
      </div>
    </div>
  )
}
