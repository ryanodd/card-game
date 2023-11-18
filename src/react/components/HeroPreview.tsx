import styles from "./Hero.module.css"
import Image from "next/image"
import { HeroData, TurnEffect, heroDataMap } from "@/src/game/Hero"
import { ReactNode } from "react"
import { EnergyIcon } from "./EnergyIcon"
import { useDuelStore } from "../hooks/useDuelStore"
import { PlayerID } from "@/src/game/DuelData"
import { Tooltip } from "./Tooltip"

type TurnEffectTooltipProps = {
  turnNumber: number
  turnEffect: TurnEffect
}

const TurnEffectTooltip = ({ turnNumber, turnEffect }: TurnEffectTooltipProps) => {
  return (
    <div className="bg-slate-200 rounded-md border border-neutral-950 px-4 py-2 flex flex-col items-center">
      <h2 className="text-neutral-900 font-bold">{`Turn ${turnNumber}+`} </h2>
      <h2 className="text-neutral-900">
        {turnEffect.id === "gainFire" && "Gain 1 Fire."}
        {turnEffect.id === "gainWater" && "Gain 1 Water."}
        {turnEffect.id === "gainEarth" && "Gain 1 Earth."}
        {turnEffect.id === "gainAir" && "Gain 1 Air."}
      </h2>
    </div>
  )
}

export type HeroPreviewProps = {
  playerId: PlayerID
  heroData: HeroData
}

export const HeroPreview = ({ playerId, heroData }: HeroPreviewProps) => {
  const { duel } = useDuelStore()

  const renderTurnSections = () => {
    const turnSections: ReactNode[] = []

    for (let x = 1; x <= 6; x++) {
      const turnEffects = heroData.turnEffects[x]

      const lit =
        x <=
        (duel.playerGoingFirst !== playerId && duel.currentPlayerId !== playerId
          ? duel.turnNumber - 1
          : duel.turnNumber)

      turnSections.push(
        <div className="flex flex-col items-center justify-end w-5 h-10">
          {turnEffects &&
            turnEffects.map((turnEffect, i) => {
              if (turnEffect.uiIicon === undefined || turnEffect.uiIicon === "effect") {
                return null
              }
              return (
                <Tooltip key={i} content={<TurnEffectTooltip turnNumber={x} turnEffect={turnEffect} />}>
                  <div>
                    <EnergyIcon size="small" energyType={turnEffect.uiIicon} />
                  </div>
                </Tooltip>
              )
            })}
          <div className={`w-3 h-3 rounded-full bg-stone-800 mt-1 ${lit ? styles.lit_dot : ""}`} />
        </div>
      )
    }

    return turnSections
  }

  return (
    <div className={`relative`}>
      <div className={`${styles.hero_size} ${styles.hero_border} bg-slate-300 relative p-1 pt-2 flex flex-col`}>
        <div className={`${styles.image_border} relative`}>
          <Image src={heroData.imageSrc} alt={heroData.name} width={512} height={512} />
        </div>
        <div className="flex justify-center items-center grow">{renderTurnSections()}</div>
      </div>
    </div>
  )
}
