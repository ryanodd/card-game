import { EnergyType } from "@/src/game/Cards"
import { EnergyIcon } from "./EnergyIcon"
import { EnergyCounts } from "@/src/game/DuelData"
import { useEffect, useState } from "react"
import { EnergySelected, findEnergyById, useDuelUIStore } from "../hooks/useDuelUIStore"

import styles from "./Energy.module.css"
import { useDuelStore } from "../hooks/useDuelStore"

export type ClickableEnergyProps = {
  index: number
  energyType: EnergyType
  id?: string
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
  const selected = id ? findEnergyById(energySelected, id).selected : false

  return (
    <button
      onClick={() => {
        onEnergyClick(index, energyType, energySelected, setEnergySelected)
      }}
      className={`${selected ? styles.energy_toggled : ""}`}
    >
      <EnergyIcon energyType={energyType} size="large" />
    </button>
  )
}
