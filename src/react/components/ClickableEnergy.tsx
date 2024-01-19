import { EnergyType } from "@/src/game/Cards"
import { EnergyIcon } from "./EnergyIcon"
import { EnergySelected, findEnergyById, useDuelUIStore } from "../hooks/useDuelUIStore"

import styles from "./Energy.module.css"

export type ClickableEnergyProps = {
  index: number
  energyType: EnergyType
  id: string
}

const onEnergyClick = (
  index: number,
  energyType: EnergyType,
  energySelected: EnergySelected,
  setEnergySelected: (energyToPay: EnergySelected) => void
) => {
  const newEnergySelected = structuredClone(energySelected)

  newEnergySelected[energyType][index].selected = !energySelected[energyType][index].selected
  setEnergySelected(newEnergySelected)
}

export const ClickableEnergy = ({ index, id, energyType }: ClickableEnergyProps) => {
  const { energySelected, setEnergySelected } = useDuelUIStore()
  const energy = findEnergyById(energySelected, id)
  const selected = energy.selected

  return (
    <button
      onClick={() => {
        if (energy.available) {
          onEnergyClick(index, energyType, energySelected, setEnergySelected)
        }
      }}
      data-available={energy.available}
      data-selected={energy.selected}
      className={styles.energy}
    >
      <EnergyIcon energyType={energyType} size="large" />
    </button>
  )
}
