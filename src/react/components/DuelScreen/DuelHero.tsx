import animationFilterStyles from "./DuelCard.module.css"
import animationLayerStyles from "./DuelCardAnimationLayer.module.css"
import { DuelState } from "@/src/game/duel/DuelData"
import { getDuelPlayerById } from "@/src/game/duel/DuelHelpers"
import { PlayerID } from "@/src/game/duel/PlayerData"
import { useEffect, useRef, useState } from "react"

import styles from "./DuelHero.module.css"
import Image from "next/image"
import { AnimatedNumber } from "../designSystem/AnimatedNumber"
import { Tooltip } from "../Tooltip"
import { HeroDetailed } from "../HeroDetailed"

export type DuelHeroProps = {
  duel: DuelState
  playerId: PlayerID
}

export const DuelHero = ({ duel, playerId }: DuelHeroProps) => {
  const player = getDuelPlayerById(duel, playerId)
  const heroData = player.hero

  // Animate when health is lost
  const oldHealthValueRef = useRef(player.health)
  const [shaking, setShaking] = useState(false)
  useEffect(() => {
    if (oldHealthValueRef.current > player.health) {
      setShaking(true)
      setTimeout(() => {
        setShaking(false)
      }, 225)
    }
  }, [player.health])

  return (
    <Tooltip content={<HeroDetailed heroData={heroData} />}>
      <div className={`${styles.duelHero} ${shaking ? styles.shaking : ""}`} data-player-id={playerId}>
        <div className={`${animationLayerStyles.duelCardOverlayLayer} `}>
          <div className={`${animationLayerStyles.duelCardOverlayLayerDrawing}`} />
        </div>
        <div className={`${animationFilterStyles.duelHeroFilterLayer} `} data-player-id={playerId}>
          <div className={`${styles.duelHeroImageContainer} relative`}>
            <Image src={heroData.imageSrc} alt={heroData.name} width={512} height={512} />
          </div>
        </div>
        <div className={`${styles.duelHeroHealthContainer}`}>
          <h2 className="font-medium text-2xl text-white">{Math.max(0, player.health)}</h2>
          <AnimatedNumber value={player.health} />
        </div>
      </div>
    </Tooltip>
  )
}
