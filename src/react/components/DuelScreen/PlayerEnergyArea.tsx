import styles from "./PlayerEnergyArea.module.css"
import { EmptyEnergyIcon, EnergyIcon } from "../EnergyIcon"
import { ClickableEnergy } from "../ClickableEnergy"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"
import { useEffect, useRef, useState } from "react"
import { getDuelPlayerById } from "@/src/game/duel/DuelHelpers"
import { DuelState } from "@/src/game/duel/DuelData"
import { PlayerID } from "@/src/game/duel/PlayerData"
import { EnergyCounts, EnergyType } from "@/src/game/duel/EnergyData"

export type PlayerEnergyAreaProps = {
  duel: DuelState
  playerId: PlayerID
}

export const PlayerEnergyArea = ({ duel, playerId }: PlayerEnergyAreaProps) => {
  const { energySelected } = useDuelUIStore()
  const player = getDuelPlayerById(duel, playerId)

  const energyIconsToRender = []

  if (playerId === "human") {
    for (let x = 0; x < energySelected.fire.length; x++) {
      energyIconsToRender.push(
        <ClickableEnergy energyType="fire" index={x} id={energySelected.fire[x].id} key={energySelected.fire[x].id} />
      )
    }
    for (let x = 0; x < energySelected.water.length; x++) {
      energyIconsToRender.push(
        <ClickableEnergy
          energyType="water"
          index={x}
          id={energySelected.water[x].id}
          key={energySelected.water[x].id}
        />
      )
    }
    for (let x = 0; x < energySelected.earth.length; x++) {
      energyIconsToRender.push(
        <ClickableEnergy
          energyType="earth"
          index={x}
          id={energySelected.earth[x].id}
          key={energySelected.earth[x].id}
        />
      )
    }
    for (let x = 0; x < energySelected.air.length; x++) {
      energyIconsToRender.push(
        <ClickableEnergy energyType="air" index={x} id={energySelected.air[x].id} key={energySelected.air[x].id} />
      )
    }
  }

  if (playerId === "opponent") {
    for (let x = 0; x < player.energy.fire; x++) {
      energyIconsToRender.push(<EnergyIcon energyType="fire" size="lg" key={x} />)
    }
    for (let x = 0; x < player.energy.water; x++) {
      energyIconsToRender.push(<EnergyIcon energyType="water" size="lg" key={x} />)
    }
    for (let x = 0; x < player.energy.earth; x++) {
      energyIconsToRender.push(<EnergyIcon energyType="earth" size="lg" key={x} />)
    }
    for (let x = 0; x < player.energy.air; x++) {
      energyIconsToRender.push(<EnergyIcon energyType="air" size="lg" key={x} />)
    }
  }

  for (let x = energyIconsToRender.length; x < 10; x++) {
    energyIconsToRender.push(<EmptyEnergyIcon size="lg" />)
  }

  const [animationEnergyAddedToggle, setAnimationEnergyAddedToggle] = useState<boolean>(false)
  const oldEnergyTotals = useRef<EnergyCounts>({ ...player.energy })
  useEffect(() => {
    if (!oldEnergyTotals.current) {
      return
    }
    if (player.energy.fire > oldEnergyTotals.current.fire) {
      setAnimationEnergyAddedToggle((toggle) => !toggle)
    }
    if (player.energy.water > oldEnergyTotals.current.water) {
      setAnimationEnergyAddedToggle((toggle) => !toggle)
    }
    if (player.energy.earth > oldEnergyTotals.current.earth) {
      setAnimationEnergyAddedToggle((toggle) => !toggle)
    }
    if (player.energy.air > oldEnergyTotals.current.air) {
      setAnimationEnergyAddedToggle((toggle) => !toggle)
    }
    oldEnergyTotals.current = { ...player.energy }
  }, [player.energy, player.energy.fire, player.energy.water, player.energy.earth, player.energy.air])

  return (
    <div className={`${styles.energyRow}`} data-animation-energy-added-toggle={animationEnergyAddedToggle}>
      {energyIconsToRender}
    </div>
  )
}
