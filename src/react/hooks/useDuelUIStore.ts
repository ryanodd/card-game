import { create } from "zustand"

import { v4 } from "uuid"
import { DuelState, PlayerState } from "@/src/game/duel/DuelData"
import { getCardByInstanceId, getCurrentDuelPlayer } from "@/src/game/duel/DuelHelpers"
import { EnergyCounts, EnergyType } from "@/src/game/duel/EnergyData"
import { getEnergyRequiredFromCost } from "@/src/game/duel/energy/isEnergySufficient"

export type EnergySelected = {
  neutral: { id: string; selected: boolean }[]
  fire: { id: string; selected: boolean }[]
  water: { id: string; selected: boolean }[]
  earth: { id: string; selected: boolean }[]
  air: { id: string; selected: boolean }[]
}

export const getEnergyButtonsForPlayer = (player: PlayerState): EnergySelected => {
  const newEnergySelected: EnergySelected = {
    neutral: [],
    fire: [],
    water: [],
    earth: [],
    air: [],
  }
  for (let x = 1; x <= player.energy.neutral; x++) {
    newEnergySelected.neutral.push({ id: v4(), selected: false })
  }
  for (let x = 1; x <= player.energy.fire; x++) {
    newEnergySelected.fire.push({ id: v4(), selected: false })
  }
  for (let x = 1; x <= player.energy.water; x++) {
    newEnergySelected.water.push({ id: v4(), selected: false })
  }
  for (let x = 1; x <= player.energy.earth; x++) {
    newEnergySelected.earth.push({ id: v4(), selected: false })
  }
  for (let x = 1; x <= player.energy.air; x++) {
    newEnergySelected.air.push({ id: v4(), selected: false })
  }

  return newEnergySelected
}

export const getEnergyCountsFromSelected = (energySelected: EnergySelected): EnergyCounts => {
  return {
    neutral: energySelected.neutral.filter(({ selected }) => selected).length,
    fire: energySelected.fire.filter(({ selected }) => selected).length,
    water: energySelected.water.filter(({ selected }) => selected).length,
    earth: energySelected.earth.filter(({ selected }) => selected).length,
    air: energySelected.air.filter(({ selected }) => selected).length,
  }
}

export type DuelUIStorePayload = {
  cardIdDragging: string | null
  setCardIdDragging: (cardId: string | null) => void

  humanHandCardIds: string[]
  setHumanHandCardIds: (humanHandCardIds: string[]) => void

  humanRowCardIds: string[]
  setHumanRowCardIds: (humanRowCardIds: string[]) => void

  energySelected: EnergySelected
  setEnergySelected: (energy: EnergySelected) => void
  resetEnergySelected: (duel: DuelState) => void

  debugEnabled: boolean
  setDebugEnabled: (debugEnabled: boolean) => void

  dialogShowBattlefield: boolean
  setDialogShowBattlefield: (dialogShowBattlefield: boolean) => void
}

export const useDuelUIStore = create<DuelUIStorePayload>((set) => ({
  cardIdDragging: null,
  setCardIdDragging: (cardId) => set({ cardIdDragging: cardId }),

  humanHandCardIds: [],
  setHumanHandCardIds: (humanHandCardIds) => set({ humanHandCardIds }),

  humanRowCardIds: [],
  setHumanRowCardIds: (humanRowCardIds) => set({ humanRowCardIds }),

  energySelected: {
    neutral: [],
    fire: [],
    water: [],
    earth: [],
    air: [],
  },
  setEnergySelected: (newEnergy) => set({ energySelected: newEnergy }),
  resetEnergySelected: () => {},

  debugEnabled: false,
  setDebugEnabled: (debugEnabled) => {
    set({ debugEnabled })
  },

  dialogShowBattlefield: false,
  setDialogShowBattlefield: (dialogShowBattlefield) => {
    set({ dialogShowBattlefield })
  },
}))

export const selectEnergyOfType = (
  selectedEnergy: EnergySelected,
  energyToSelect: EnergyType,
  quantity: number
): EnergySelected => {
  if (quantity === 0) return selectedEnergy
  let quantitySoFar = 0
  for (let x = 0; x < selectedEnergy[energyToSelect].length; x++) {
    const energy = selectedEnergy[energyToSelect][x]
    if (!energy.selected) {
      energy.selected = true
      quantitySoFar += 1
      if (quantitySoFar === quantity) {
        return selectedEnergy
      }
    }
  }
  throw Error("Couldn't find energy of type to add")
}

export const resetEnergySelected = (energySelected: EnergySelected) => {
  for (let x = 0; x < energySelected.neutral.length; x++) {
    energySelected.neutral[x].selected = false
  }
  for (let x = 0; x < energySelected.fire.length; x++) {
    energySelected.fire[x].selected = false
  }
  for (let x = 0; x < energySelected.water.length; x++) {
    energySelected.water[x].selected = false
  }
  for (let x = 0; x < energySelected.earth.length; x++) {
    energySelected.earth[x].selected = false
  }
  for (let x = 0; x < energySelected.air.length; x++) {
    energySelected.air[x].selected = false
  }
}

// When it isn't possible to pay the required cost,
// This function DOESN'T need to determine that, it can return any result it wants.
// Its results will just be ignored because of a future isEnergySufficient check.
export const autoPayElements = (
  duel: DuelState,
  cardIdDragging: string,
  inputSelectedEnergy: EnergySelected
): EnergySelected => {
  let selectedEnergy = window.structuredClone(inputSelectedEnergy)
  const playerEnergy = getCurrentDuelPlayer(duel).energy
  const card = getCardByInstanceId(duel, cardIdDragging)

  const { singleEnergiesRequired, dualEnergyRequired, dualEnergyTypes } = getEnergyRequiredFromCost(card.cost)

  // Select energy for singleEnergiesRequired
  try {
    selectedEnergy = selectEnergyOfType(selectedEnergy, "fire", singleEnergiesRequired.fire)
    selectedEnergy = selectEnergyOfType(selectedEnergy, "water", singleEnergiesRequired.water)
    selectedEnergy = selectEnergyOfType(selectedEnergy, "earth", singleEnergiesRequired.earth)
    selectedEnergy = selectEnergyOfType(selectedEnergy, "air", singleEnergiesRequired.air)

    // Determine remaining energy available to pay with
    let selectedEnergyCounts = getEnergyCountsFromSelected(selectedEnergy)
    const energyAvailableCounts: EnergyCounts = {
      neutral: playerEnergy.neutral - selectedEnergyCounts.neutral,
      fire: playerEnergy.fire - selectedEnergyCounts.fire,
      water: playerEnergy.water - selectedEnergyCounts.water,
      earth: playerEnergy.earth - selectedEnergyCounts.earth,
      air: playerEnergy.air - selectedEnergyCounts.air,
    }

    // Select energy for dual energy
    for (let x = 0; x < dualEnergyRequired; x++) {
      const [primaryEnergyType, secondaryEnergyType] = dualEnergyTypes
      if (energyAvailableCounts[primaryEnergyType] === 0) {
        selectedEnergy = selectEnergyOfType(selectedEnergy, secondaryEnergyType, 1)
        energyAvailableCounts[secondaryEnergyType] -= 1
        continue
      }
      if (energyAvailableCounts[secondaryEnergyType] === 0) {
        selectedEnergy = selectEnergyOfType(selectedEnergy, primaryEnergyType, 1)
        energyAvailableCounts[primaryEnergyType] -= 1
        continue
      }
      if (energyAvailableCounts[secondaryEnergyType] > energyAvailableCounts[primaryEnergyType]) {
        selectedEnergy = selectEnergyOfType(selectedEnergy, secondaryEnergyType, 1)
        energyAvailableCounts[secondaryEnergyType] -= 1
        continue
      }
      selectedEnergy = selectEnergyOfType(selectedEnergy, primaryEnergyType, 1)
      energyAvailableCounts[primaryEnergyType] -= 1
    }

    // Select energy for neutral energy
    for (let x = 0; x < singleEnergiesRequired.neutral; x++) {
      if (energyAvailableCounts.neutral > 0) {
        selectedEnergy = selectEnergyOfType(selectedEnergy, "neutral", 1)
        energyAvailableCounts.neutral -= 1
        continue
      }
      let mostCommonEnergy: EnergyType = "neutral"
      let mostCommonEnergyQuantity = 0
      if (energyAvailableCounts.fire > mostCommonEnergyQuantity) {
        mostCommonEnergy = "fire"
        mostCommonEnergyQuantity = energyAvailableCounts.fire
      }
      if (energyAvailableCounts.water > mostCommonEnergyQuantity) {
        mostCommonEnergy = "water"
        mostCommonEnergyQuantity = energyAvailableCounts.water
      }
      if (energyAvailableCounts.earth > mostCommonEnergyQuantity) {
        mostCommonEnergy = "earth"
        mostCommonEnergyQuantity = energyAvailableCounts.earth
      }
      if (energyAvailableCounts.air > mostCommonEnergyQuantity) {
        mostCommonEnergy = "air"
        mostCommonEnergyQuantity = energyAvailableCounts.air
      }
      selectedEnergy = selectEnergyOfType(selectedEnergy, mostCommonEnergy, 1)
      energyAvailableCounts[mostCommonEnergy] -= 1
    }
  } catch {
    console.warn("Couldn't pay energy with autoPay!")
  }

  return selectedEnergy
}

export const findEnergyById = (energySelected: EnergySelected, id: string) => {
  let result = energySelected.neutral.find((energy) => {
    return energy.id === id
  })
  if (result) {
    return result
  }
  result = energySelected.fire.find((energy) => {
    return energy.id === id
  })
  if (result) {
    return result
  }
  result = energySelected.water.find((energy) => {
    return energy.id === id
  })
  if (result) {
    return result
  }
  result = energySelected.earth.find((energy) => {
    return energy.id === id
  })
  if (result) {
    return result
  }
  result = energySelected.air.find((energy) => {
    return energy.id === id
  })
  if (result) {
    return result
  }
  throw Error("Energy not found by id")
}
