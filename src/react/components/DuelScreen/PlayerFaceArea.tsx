import styles from "./PlayerFaceArea.module.css"
import { EnergyIcon } from "../EnergyIcon"
import { ClickableEnergy } from "../ClickableEnergy"
import { EnergySelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { HeroPreview } from "../HeroPreview"
import { heroDataMap } from "@/src/game/Hero"
import { useCallback, useEffect, useRef, useState } from "react"
import { getDuelPlayerById } from "@/src/game/duel/DuelHelpers"
import { DuelState } from "@/src/game/duel/DuelData"
import { PlayerID } from "@/src/game/duel/PlayerData"
import { EnergyCounts, EnergyType } from "@/src/game/duel/EnergyData"

export type PlayerFaceAreaProps = {
  duel: DuelState
  playerId: PlayerID
}

export const PlayerFaceArea = ({ duel, playerId }: PlayerFaceAreaProps) => {
  const { energySelected } = useDuelUIStore()
  const player = getDuelPlayerById(duel, playerId)

  // Animate when health is lost
  const oldHealthValueRef = useRef(player.health)
  const [animatedHealthValue, setAnimatedHealthValue] = useState<number | null>(null)
  const [animationKey, setAnimationKey] = useState<number>(0)
  const [shaking, setShaking] = useState(false)
  useEffect(() => {
    if (oldHealthValueRef.current === player.health) {
      return
    }
    setAnimatedHealthValue(player.health - oldHealthValueRef.current)
    oldHealthValueRef.current = player.health

    setAnimationKey(animationKey + 1)

    setShaking(true)
    setTimeout(() => {
      setShaking(false)
    }, 225)
  }, [player.health, animationKey])

  const onAnimationEnd = useCallback(() => {}, [])

  const getFire = (playerId: PlayerID) => {
    const list = []
    if (playerId === "human") {
      for (let x = 0; x < energySelected.fire.length; x++) {
        list.push(
          <ClickableEnergy energyType="fire" index={x} id={energySelected.fire[x].id} key={energySelected.fire[x].id} />
        )
      }
    } else {
      for (let x = 0; x < player.energyIncome.fire; x++) {
        list.push(<EnergyIcon energyType="fire" size="large" available={x < player.energy.fire} key={x} />)
      }
    }

    return list
  }

  const getWater = (playerId: PlayerID) => {
    const list = []
    if (playerId === "human") {
      for (let x = 0; x < energySelected.water.length; x++) {
        list.push(
          <ClickableEnergy
            energyType="water"
            index={x}
            id={energySelected.water[x].id}
            key={energySelected.water[x].id}
          />
        )
      }
    } else {
      for (let x = 0; x < player.energyIncome.water; x++) {
        list.push(<EnergyIcon energyType="water" size="large" available={x < player.energy.water} key={x} />)
      }
    }
    return list
  }

  const getEarth = (playerId: PlayerID) => {
    const list = []
    if (playerId === "human") {
      for (let x = 0; x < energySelected.earth.length; x++) {
        list.push(
          <ClickableEnergy
            energyType="earth"
            index={x}
            id={energySelected.earth[x].id}
            key={energySelected.earth[x].id}
          />
        )
      }
    } else {
      for (let x = 0; x < player.energyIncome.earth; x++) {
        list.push(<EnergyIcon energyType="earth" size="large" available={x < player.energy.earth} key={x} />)
      }
    }
    return list
  }

  const getAir = (playerId: PlayerID) => {
    const list = []
    if (playerId === "human") {
      for (let x = 0; x < energySelected.air.length; x++) {
        list.push(
          <ClickableEnergy energyType="air" index={x} id={energySelected.air[x].id} key={energySelected.air[x].id} />
        )
      }
    } else {
      for (let x = 0; x < player.energyIncome.air; x++) {
        list.push(<EnergyIcon energyType="air" size="large" available={x < player.energy.air} key={x} />)
      }
    }
    return list
  }

  const [animationEnergyAddedType, setAnimationEnergyAddedType] = useState<EnergyType | null>(null)

  const oldEnergyIncome = useRef<EnergyCounts>({ ...player.energyIncome })
  useEffect(() => {
    if (!oldEnergyIncome.current) {
      return
    }
    if (player.energyIncome.fire > oldEnergyIncome.current.fire) {
      setAnimationEnergyAddedType("fire")
    }
    if (player.energyIncome.water > oldEnergyIncome.current.water) {
      setAnimationEnergyAddedType("water")
    }
    if (player.energyIncome.earth > oldEnergyIncome.current.earth) {
      setAnimationEnergyAddedType("earth")
    }
    if (player.energyIncome.air > oldEnergyIncome.current.air) {
      setAnimationEnergyAddedType("air")
    }
    oldEnergyIncome.current = { ...player.energyIncome }
  }, [
    player.energyIncome,
    player.energyIncome.fire,
    player.energyIncome.water,
    player.energyIncome.earth,
    player.energyIncome.air,
  ])

  return (
    <div className={`flex flex-col relative ${shaking ? styles.shaking : ""}`} onAnimationEnd={onAnimationEnd}>
      <div className="relative">
        <HeroPreview playerId={playerId} heroData={heroDataMap[player.heroId]} />
        <div className={`${styles.player_health_positioning} rounded-full bg-red-600 border border-neutral-900 px-2`}>
          <h2 className="font-medium text-2xl text-white">{Math.max(0, player.health)}</h2>
          {animatedHealthValue && (
            <h2 key={animationKey} className={`${styles.animated_health_value} font-medium text-4xl text-outline-2`}>
              {Math.max(animatedHealthValue)}
            </h2>
          )}
        </div>
      </div>
      <div className={`flex gap-1 px-1 justify-center items-start`}>
        <div
          className={`${styles.energyRowAnimationArea} w-10 bg-red-600 rounded-b-xl shadow-md border border-neutral-900 flex flex-col items-center gap-1 p-2`}
          data-animation-energy-added={animationEnergyAddedType === "fire"}
        >
          {getFire(playerId)}
        </div>
        <div
          className={`${styles.energyRowAnimationArea} w-10 bg-violet-600 rounded-b-xl shadow-md border border-neutral-900 flex flex-col items-center gap-1 p-2`}
          data-animation-energy-added={animationEnergyAddedType === "air"}
        >
          {getAir(playerId)}
        </div>
        <div
          className={`${styles.energyRowAnimationArea} w-10 bg-lime-600 rounded-b-xl shadow-md border border-neutral-900 flex flex-col items-center gap-1 p-2`}
          data-animation-energy-added={animationEnergyAddedType === "earth"}
        >
          {getEarth(playerId)}
        </div>
        <div
          className={`${styles.energyRowAnimationArea} w-10 bg-sky-600 rounded-b-xl border shadow-md border-neutral-900 flex flex-col items-center gap-1 p-2`}
          data-animation-energy-added={animationEnergyAddedType === "water"}
        >
          {getWater(playerId)}
        </div>
      </div>
    </div>
  )
}
