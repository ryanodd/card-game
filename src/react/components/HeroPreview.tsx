import { cardDataMap } from "@/src/game/Cards"
import { CardState } from "@/src/game/DuelData"
import styles from "./Hero.module.css"
import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import { SummonSickIcon } from "./SummonSickIcon"
import { useState } from "react"
import { DetailedCard } from "./DetailedCard"
import { Tooltip } from "./Tooltip"
import { useDuelStore } from "../hooks/useDuelStore"
import { getAllSpaces } from "@/src/game/DuelHelpers"
import { DetailedHero } from "./DetailedHero"
import { HeroData, heroDataMap } from "@/src/game/Hero"

export type HeroPreviewProps = {
  heroData: HeroData
}

export const HeroPreview = ({ heroData }: HeroPreviewProps) => {
  return (
    <Tooltip content={<DetailedHero heroData={heroData} />}>
      <div className={`relative`}>
        <div className={`${styles.hero_size} ${styles.hero_border} bg-stone-700 relative p-1 pt-2 `}>
          <div className={`${styles.image_border} relative`}>
            <Image src={heroData.imageSrc} alt={heroData.name} width={512} height={512} />
          </div>
        </div>
      </div>
    </Tooltip>
  )
}
