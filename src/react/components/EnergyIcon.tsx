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

export type EnergyIconSize = "xs" | "sm" | "md" | "lg" | "xl"

export const EnergyIcon = ({ energyType, secondaryEnergyType, amount, size, available }: EnergyIconProps) => {
  const getEnergySvg = () => {
    if (energyType === "neutral") {
      return (
        <div
          className={`${styles.energyIcon} ${styles.neutral_element}`}
          data-size={size}
          data-available={available ?? true}
        >
          <p className="text-md font-bold">{amount ?? 1}</p>
        </div>
      )
    }
    return (
      <div
        className={`${styles.energyIcon} ${styles[`${energyType}_element`]}`}
        data-size={size}
        data-available={available ?? true}
      >
        {energyType === "fire" && <Fire className={styles.energyIconSvg} size={size} />}
        {energyType === "water" && <Water className={styles.energyIconSvg} size={size} />}
        {energyType === "earth" && <Earth className={styles.energyIconSvg} size={size} />}
        {energyType === "air" && <Air className={styles.energyIconSvg} size={size} />}
        {secondaryEnergyType && (
          <div
            className={`${styles.energyIcon} ${styles.secondaryEnergy} ${styles[`${secondaryEnergyType}_element`]}`}
            data-size="size"
          >
            {secondaryEnergyType === "fire" && <Fire className={styles.secondaryEnergyIcon} size={size} />}
            {secondaryEnergyType === "water" && <Water className={styles.secondaryEnergyIcon} size={size} />}
            {secondaryEnergyType === "earth" && <Earth className={styles.secondaryEnergyIcon} size={size} />}
            {secondaryEnergyType === "air" && <Air className={styles.secondaryEnergyIcon} size={size} />}
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
  return <div className={`${styles.energyIcon} ${styles.emptyEnergyIcon}`} data-size={size} />
}
