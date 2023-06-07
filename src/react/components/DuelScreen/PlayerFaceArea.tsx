import { EnergyCounts, PlayerID, PlayerState } from "@/src/game/DuelData"
import styles from "./PlayerFaceArea.module.css"
import { EnergyIcon } from "../EnergyIcon"
import { ClickableEnergy } from "../ClickableEnergy"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"
import { EnergyType } from "@/src/game/Cards"
import { useDuelStore } from "../../hooks/useDuelStore"
import { getDuelPlayerById } from "@/src/game/DuelHelpers"
import { HeroPreview } from "../HeroPreview"
import { heroDataMap } from "@/src/game/Hero"

export type PlayerFaceAreaProps = {
  playerId: PlayerID
}

export const PlayerFaceArea = ({ playerId }: PlayerFaceAreaProps) => {
  const { duel } = useDuelStore()

  const { energySelected } = useDuelUIStore()
  const player = getDuelPlayerById(duel, playerId)

  const getFire = (playerId: PlayerID) => {
    const list = []
    if (playerId === "human") {
      for (let x = 0; x < energySelected.fire.length; x++) {
        list.push(
          <ClickableEnergy energyType="fire" index={x} id={energySelected.fire[x].id} key={energySelected.fire[x].id} />
        )
      }
    } else {
      for (let x = 0; x < player.energy.fire; x++) {
        list.push(<EnergyIcon energyType="fire" size="large" key={x} />)
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
      for (let x = 0; x < player.energy.water; x++) {
        list.push(<EnergyIcon energyType="water" size="large" key={x} />)
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
      for (let x = 0; x < player.energy.earth; x++) {
        list.push(<EnergyIcon energyType="earth" size="large" key={x} />)
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
      for (let x = 0; x < player.energy.air; x++) {
        list.push(<EnergyIcon energyType="air" size="large" key={x} />)
      }
    }
    return list
  }

  return (
    <div className="flex relative">
      <HeroPreview heroData={heroDataMap[player.heroId]} />
      <div className="flex flex-col gap-1 py-1 justify-center items-start">
        <div className="h-10 bg-red-600 rounded-r-xl shadow-md border border-neutral-900 flex items-center gap-1 p-2">
          {getFire(playerId)}
          {/* <h2 className={`${styles.player_element_number} ml-2`}>{player.elements.fire}</h2> */}
        </div>
        <div className="h-10 bg-violet-600 rounded-r-xl shadow-md border border-neutral-900 flex items-center gap-1 p-2">
          {getAir(playerId)}
        </div>
        <div className="h-10 bg-lime-600 rounded-r-xl shadow-md border border-neutral-900 flexitems-center gap-1 p-2">
          {getEarth(playerId)}
        </div>
        <div className="h-10 bg-sky-600 rounded-r-xl border shadow-md border-neutral-900 flex items-center gap-1 p-2">
          {getWater(playerId)}
        </div>
      </div>
      <div className={`${styles.player_health_positioning} rounded-full bg-red-600 border border-neutral-900 px-2`}>
        <h2 className="font-medium text-2xl">{Math.max(0, player.health)}</h2>
      </div>
    </div>
  )
}
