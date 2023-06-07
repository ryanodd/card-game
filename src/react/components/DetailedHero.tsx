import { CardData, cardDataMap } from "@/src/game/Cards"
import { CardState } from "@/src/game/DuelData"
import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import { SummonSickIcon } from "./SummonSickIcon"
import { useState } from "react"
import styles from "./Card.module.css"
import { HeroData } from "@/src/game/Hero"

export type DetailedHeroProps = {
  heroData: HeroData
}

export const DetailedHero = ({ heroData }: DetailedHeroProps) => {
  const [hovering, setHovering] = useState(false)

  return (
    <div className={`relative`} onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
      <div className={`${styles.full_card_size} ${styles.full_card_border} bg-slate-200 relative px-2 flex flex-col`}>
        <div className={`${styles.full_image_border} relative`}>
          <Image src={heroData.imageSrc} alt={heroData.name} width={512} height={512} />
        </div>
      </div>
    </div>
  )
}
