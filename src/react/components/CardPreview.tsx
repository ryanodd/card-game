import { cardDataMap } from "@/src/game/Cards"
import { CardState } from "@/src/game/DuelData"
import styles from "./Card.module.css"
import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import { SummonSickIcon } from "./SummonSickIcon"
import { useState } from "react"
import { DetailedCard } from "./DetailedCard"
import { Tooltip } from "./Tooltip"
import { useDuelStore } from "../hooks/useDuelStore"
import { getAllSpaces } from "@/src/game/DuelHelpers"

export type CardPreviewProps = {
  cardState: CardState
}

export const CardPreview = ({ cardState }: CardPreviewProps) => {
  const { duel } = useDuelStore()
  const cardData = cardDataMap[cardState.number]

  const [hovering, setHovering] = useState(false)

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

  const summonSick = cardState.summonSick
  const isOnField = getAllSpaces(duel).find((space) => space.occupant?.id === cardState.id) !== undefined

  return (
    <Tooltip content={<DetailedCard cardData={cardData} />}>
      <div className={`relative`} onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
        {!isOnField && <div className="absolute -top-1 -left-1 z-20 flex gap-0.5">{getCostIcons()}</div>}
        {summonSick && (
          <div className="z-20 absolute top-0 right-0 ">
            <SummonSickIcon />
          </div>
        )}

        <div
          className={`${styles.card_size} ${styles.card_border} ${styles.card_attacking} bg-slate-200 relative p-1 pt-2 `}
        >
          <div className={`${styles.image_border} relative`}>
            <Image src={cardData.imageSrc} alt={cardData.name} width={512} height={512} />
          </div>
          <div className="w-9 h-9 rounded-tr-xl bg-red-500 absolute bottom-0 left-0 flex border-t border-r border-neutral-900 pr-0.5 justify-center items-center">
            <h2 className="text-2xl font-semibold">{cardState.attack}</h2>
          </div>
          <div className="w-9 h-9 rounded-tl-xl bg-stone-500 absolute bottom-0 right-0 flex border-t border-l border-neutral-900 justify-center items-center">
            <h2 className={`text-2xl font-semibold ${cardState.health < cardData.health ? "text-red-300" : ""}`}>
              {cardState.health}
            </h2>
          </div>
        </div>
      </div>
    </Tooltip>
  )
}
