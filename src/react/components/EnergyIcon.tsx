import styles from "./Energy.module.css"
import { EnergyType } from "@/src/game/Cards"
import FireSVG from "../assets/fire.svg"
import WaterSVG from "../assets/water.svg"
import EarthSVG from "../assets/earth.svg"
import AirSVG from "../assets/air.svg"

export type EnergyIconProps = {
  energyType: EnergyType
  size: EnergyIconSize
  amount?: number
}

export type EnergyIconSize = "small" | "large"

export const EnergyIcon = ({ energyType, amount, size }: EnergyIconProps) => {
  const getEnergySvg = () => {
    if (energyType === "neutral") {
      return (
        <div
          className={`${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
            styles.neutral_element
          }`}
        >
          <p className="text-md font-bold">{amount ?? 1}</p>
        </div>
      )
    }
    if (energyType === "fire") {
      return (
        <div
          className={`${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${styles.fire_element}`}
        >
          <FireSVG />
        </div>
      )
    }
    if (energyType === "water") {
      return (
        <div
          className={`${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
            styles.water_element
          }`}
        >
          <WaterSVG />
        </div>
      )
    }
    if (energyType === "earth") {
      return (
        <div
          className={`${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
            styles.earth_element
          }`}
        >
          <EarthSVG />
        </div>
      )
    }
    if (energyType === "air") {
      return (
        <div
          className={`${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${styles.air_element}`}
        >
          <AirSVG />
        </div>
      )
    }
  }

  return <>{getEnergySvg()}</>
}
