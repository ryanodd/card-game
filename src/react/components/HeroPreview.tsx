import styles from "./Hero.module.css"
import Image from "next/image"
import { HeroData } from "@/src/game/Hero"
import { PlayerID } from "@/src/game/duel/PlayerData"

export type HeroPreviewProps = {
  playerId: PlayerID
  heroData: HeroData
}

export const HeroPreview = ({ playerId, heroData }: HeroPreviewProps) => {
  return (
    <div className={`relative`}>
      <div className={`${styles.hero_size} ${styles.image_border} relative`}>
        <Image src={heroData.imageSrc} alt={heroData.name} width={512} height={512} />
      </div>
    </div>
  )
}
