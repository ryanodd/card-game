import { CardData, cardDataMap } from "@/src/game/Cards"
import { CardState } from "@/src/game/DuelData"
import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import { SummonSickIcon } from "./SummonSickIcon"
import { useState } from "react"
import styles from "./Card.module.css"

export type DetailedCardProps = {
  cardData: CardData
}

export const DetailedCard = ({ cardData }: DetailedCardProps) => {
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

  return (
    <div className={`relative`}>
      <div className={`${styles.full_card_size} ${styles.full_card_border} bg-slate-200 relative px-2 flex flex-col`}>
        <div className="flex gap-0.5 items-center -ml-1">
          {getCostIcons()}
          <h2 className="ml-auto text-xl text-neutral-900 tracking-tight">{cardData.name}</h2>
        </div>
        <div className={`${styles.full_image_border} relative`}>
          <Image src={cardData.imageSrc} alt={cardData.name} width={512} height={512} />
        </div>
        <div className="w-12 h-12 rounded-tr-xl bg-red-500 absolute bottom-0 left-0 flex border-t border-r border-neutral-900 pr-0.5 justify-center items-center">
          <h2 className="text-4xl">{cardData.attack}</h2>
        </div>
        <div className="w-12 h-12 rounded-tl-xl bg-stone-500 absolute bottom-0 right-0 flex border-t border-l border-neutral-900 pl-0.5 justify-center items-center">
          <h2 className="text-4xl">{cardData.health}</h2>
        </div>
      </div>
    </div>
  )
}