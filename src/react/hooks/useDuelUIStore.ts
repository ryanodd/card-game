import { create } from "zustand"

import { v4 } from "uuid"
import { DuelState, PlayerState } from "@/src/game/duel/DuelData"
import { getCardByInstanceId, getCurrentDuelPlayer } from "@/src/game/duel/DuelHelpers"
import { EnergyCounts, EnergyType } from "@/src/game/duel/EnergyData"

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

  humanAllRowCardIds: string[][]
  setHumanAllRowCardIds: (humanAllRowCardIds: string[][]) => void

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

  humanAllRowCardIds: [[], []],
  setHumanAllRowCardIds: (humanAllRowCardIds) => set({ humanAllRowCardIds }),

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

export const autoPayElements = (
  duel: DuelState,
  cardIdDragging: string,
  inputSelectedEnergy: EnergySelected
): EnergySelected => {
  let selectedEnergy = window.structuredClone(inputSelectedEnergy)
  const playerEnergy = getCurrentDuelPlayer(duel).energy
  const selectedEnergyCounts = getEnergyCountsFromSelected(inputSelectedEnergy)
  const card = getCardByInstanceId(duel, cardIdDragging)

  let neutralNeeded = Math.max(0, card.cost.neutral - selectedEnergyCounts.neutral)
  let fireNeeded = Math.max(0, card.cost.fire - selectedEnergyCounts.fire)
  let waterNeeded = Math.max(0, card.cost.water - selectedEnergyCounts.water)
  let earthNeeded = Math.max(0, card.cost.earth - selectedEnergyCounts.earth)
  let airNeeded = Math.max(0, card.cost.air - selectedEnergyCounts.air)

  let neutralAvailable = playerEnergy.neutral - selectedEnergyCounts.neutral
  let fireAvailable = playerEnergy.fire - selectedEnergyCounts.fire
  let waterAvailable = playerEnergy.water - selectedEnergyCounts.water
  let earthAvailable = playerEnergy.earth - selectedEnergyCounts.earth
  let airAvailable = playerEnergy.air - selectedEnergyCounts.air

  let neutralToPay = Math.min(neutralNeeded, neutralAvailable)
  let fireToPay = Math.min(fireNeeded, fireAvailable)
  let waterToPay = Math.min(waterNeeded, waterAvailable)
  let earthToPay = Math.min(earthNeeded, earthAvailable)
  let airToPay = Math.min(airNeeded, airAvailable)

  if (neutralToPay > 0) {
    selectedEnergy = selectEnergyOfType(selectedEnergy, "neutral", neutralToPay)
    neutralNeeded -= neutralToPay
    neutralAvailable -= neutralToPay
  }
  if (fireToPay > 0) {
    selectedEnergy = selectEnergyOfType(selectedEnergy, "fire", fireToPay)
    fireNeeded -= fireToPay
    fireAvailable -= fireToPay
  }
  if (waterToPay > 0) {
    selectedEnergy = selectEnergyOfType(selectedEnergy, "water", waterToPay)
    waterNeeded -= waterToPay
    waterAvailable -= waterToPay
  }
  if (earthToPay > 0) {
    selectedEnergy = selectEnergyOfType(selectedEnergy, "earth", earthToPay)
    earthNeeded -= earthToPay
    earthAvailable -= earthToPay
  }
  if (airToPay > 0) {
    selectedEnergy = selectEnergyOfType(selectedEnergy, "air", airToPay)
    airNeeded -= airToPay
    airAvailable -= airToPay
  }

  // At this point only neutral energy should be needed
  while (neutralNeeded > 0) {
    if (fireAvailable > 0) {
      selectedEnergy = selectEnergyOfType(selectedEnergy, "fire", 1)
      neutralNeeded -= 1
      fireAvailable -= 1
      continue
    }
    if (waterAvailable > 0) {
      selectedEnergy = selectEnergyOfType(selectedEnergy, "water", 1)
      neutralNeeded -= 1
      waterAvailable -= 1
      continue
    }
    if (earthAvailable > 0) {
      selectedEnergy = selectEnergyOfType(selectedEnergy, "earth", 1)
      neutralNeeded -= 1
      earthAvailable -= 1
      continue
    }
    if (airAvailable > 0) {
      selectedEnergy = selectEnergyOfType(selectedEnergy, "air", 1)
      neutralNeeded -= 1
      airAvailable -= 1
      continue
    }
    throw Error("No energy found!!")
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
