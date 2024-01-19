import { cardDataMap } from "@/src/game/Cards"
import { CardState, DuelState } from "@/src/game/DuelData"
import styles from "./Card.module.css"
import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import { useState } from "react"
import { DetailedCard } from "./DetailedCard"
import { Tooltip } from "./Tooltip"
import { getAllSpaces } from "@/src/game/DuelHelpers"

export type CardPreviewProps = {
  duel: DuelState
  cardState: CardState
  isTooltipOpen?: boolean
  setIsTooltipOpen?: (open: boolean) => void
}

export const CardPreview = ({ duel, cardState, isTooltipOpen, setIsTooltipOpen }: CardPreviewProps) => {
  const cardData = cardDataMap[cardState.name]

  const getCostIcons = () => {
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

  const isOnField =
    getAllSpaces(duel).find((space) => space.occupant?.instanceId === cardState.instanceId) !== undefined

  return (
    <Tooltip content={<DetailedCard cardData={cardData} />} open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      <div
        className={`${styles.card} ${styles.card_size} ${styles.card_border} relative`}
        data-background={cardData.energyType}
      >
        {!isOnField && <div className="absolute -top-2 -left-2 z-20 flex">{getCostIcons()}</div>}
        <div className={`${styles.image_border} relative`}>
          <Image src={cardData.imageSrc} alt={cardData.name} width={512} height={512} />
        </div>
        {cardState.cardType === "creature" && (
          <div className="w-8 h-8 rounded-tr-xl bg-amber-500 absolute bottom-0 left-0 flex border-t border-r border-neutral-900 pr-0.5 justify-center items-center">
            <h2 className="text-2xl font-semibold text-shadow">{cardState.attack}</h2>
          </div>
        )}
        {cardState.health !== undefined && cardState.initialHealth !== undefined && (
          <div className="w-8 h-8 rounded-tl-xl bg-red-500 absolute bottom-0 right-0 flex border-t border-l border-neutral-900 justify-center items-center">
            <h2
              className={`text-2xl font-semibold text-shadow ${
                cardState.health < cardState.initialHealth ? "text-red-300" : ""
              }`}
            >
              {cardState.health}
            </h2>
          </div>
        )}
      </div>
    </Tooltip>
  )
}
