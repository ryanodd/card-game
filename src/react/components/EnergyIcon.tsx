import styles from "./Energy.module.css"
import FireSVG from "../assets/fire.svg"
import WaterSVG from "../assets/water.svg"
import EarthSVG from "../assets/earth.svg"
import AirSVG from "../assets/air.svg"
import { EnergyType } from "@/src/game/duel/EnergyData"

export type EnergyIconProps = {
  energyType: EnergyType
  size: EnergyIconSize
  amount?: number
  available?: boolean
}

export type EnergyIconSize = "small" | "large"

export const EnergyIcon = ({ energyType, amount, size, available }: EnergyIconProps) => {
  const getEnergySvg = () => {
    if (energyType === "neutral") {
      return (
        <div
          className={`${styles.energy} ${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
            styles.neutral_element
          }`}
          data-available={available ?? true}
        >
          <p className="text-md font-bold">{amount ?? 1}</p>
        </div>
      )
    }
    if (energyType === "fire") {
      return (
        <div
          className={`${styles.energy} ${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
            styles.fire_element
          }`}
        >
          <FireSVG />
        </div>
      )
    }
    if (energyType === "water") {
      return (
        <div
          className={`${styles.energy} ${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
            styles.water_element
          }`}
          data-available={available ?? true}
        >
          <WaterSVG />
        </div>
      )
    }
    if (energyType === "earth") {
      return (
        <div
          className={`${styles.energy} ${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
            styles.earth_element
          }`}
          data-available={available ?? true}
        >
          <EarthSVG />
        </div>
      )
    }
    if (energyType === "air") {
      return (
        <div
          className={`${styles.energy} ${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
            styles.air_element
          }`}
          data-available={available ?? true}
        >
          <AirSVG />
        </div>
      )
    }
    throw Error("invalid energy type")
  }

  return getEnergySvg()
}
