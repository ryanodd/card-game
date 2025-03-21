import styles from "./Energy.module.css"
import { EnergyType } from "@/src/game/duel/EnergyData"
import { Air, Earth, Fire, Water } from "./designSystem/Icon"

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
          <Fire className={styles.energyIcon} size="md" />
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
          <Water size="md" />
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
          <Earth size="md" />
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
          <Air size="sm" />
        </div>
      )
    }
    throw Error("invalid energy type")
  }

  return getEnergySvg()
}

export type EmptyEnergyIconProps = {
  size: EnergyIconSize
}

export const EmptyEnergyIcon = ({ size }: EmptyEnergyIconProps) => {
  return (
    <div
      className={`${styles.emptyEnergyIcon} ${size === "small" ? styles.energy_icon_small : styles.energy_icon_large}`}
    />
  )
}
