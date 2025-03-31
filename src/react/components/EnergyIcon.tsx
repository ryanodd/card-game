import styles from "./Energy.module.css"
import { EnergyType } from "@/src/game/duel/EnergyData"
import { Air, Earth, Fire, Water } from "./designSystem/Icon"

export type EnergyIconProps = {
  energyType: EnergyType
  secondaryEnergyType?: EnergyType
  size: EnergyIconSize
  amount?: number
  available?: boolean
}

export type EnergyIconSize = "small" | "large"

export const EnergyIcon = ({ energyType, secondaryEnergyType, amount, size, available }: EnergyIconProps) => {
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
    return (
      <div
        className={`${styles.energy} ${size === "small" ? styles.energy_icon_small : styles.energy_icon_large} ${
          styles[`${energyType}_element`]
        }`}
        data-available={available ?? true}
      >
        {energyType === "fire" && <Fire className={styles.energyIcon} size={size === "small" ? "sm" : "md"} />}
        {energyType === "water" && <Water className={styles.energyIcon} size={size === "small" ? "sm" : "md"} />}
        {energyType === "earth" && <Earth className={styles.energyIcon} size={size === "small" ? "sm" : "md"} />}
        {energyType === "air" && <Air className={styles.energyIcon} size={size === "small" ? "sm" : "md"} />}
        {secondaryEnergyType && (
          <div
            className={`${styles.secondaryEnergy} ${
              size === "small" ? styles.energy_icon_small : styles.energy_icon_large
            } ${styles[`${secondaryEnergyType}_element`]}`}
          >
            {secondaryEnergyType === "fire" && (
              <Fire className={styles.secondaryEnergyIcon} size={size === "small" ? "sm" : "md"} />
            )}
            {secondaryEnergyType === "water" && (
              <Water className={styles.secondaryEnergyIcon} size={size === "small" ? "sm" : "md"} />
            )}
            {secondaryEnergyType === "earth" && (
              <Earth className={styles.secondaryEnergyIcon} size={size === "small" ? "sm" : "md"} />
            )}
            {secondaryEnergyType === "air" && (
              <Air className={styles.secondaryEnergyIcon} size={size === "small" ? "sm" : "md"} />
            )}
          </div>
        )}
      </div>
    )
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
