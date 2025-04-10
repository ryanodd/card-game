import { DuelState } from "@/src/game/duel/DuelData"
import { getDuelPlayerById } from "@/src/game/duel/DuelHelpers"
import { PlayerID } from "@/src/game/duel/PlayerData"
import { useEffect, useRef, useState } from "react"
import { Heart } from "../designSystem/Icon"
import styles from "./DuelHero.module.css"
import { AnimatedNumber } from "../designSystem/AnimatedNumber"

export type HeroHealthProps = {
  duel: DuelState
  playerId: PlayerID
}

export const HeroHealth = ({ duel, playerId }: HeroHealthProps) => {
  const player = getDuelPlayerById(duel, playerId)
  return (
    <div className={`${styles.duelHeroHealthContainer}`}>
      <Heart size="xl" data-full={player.health >= 1} />
      <Heart size="xl" data-full={player.health >= 2} />
      <Heart size="xl" data-full={player.health >= 3} />
      <AnimatedNumber value={player.health} />
    </div>
  )
}
