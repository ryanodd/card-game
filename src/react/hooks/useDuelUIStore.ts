import { create } from "zustand"
import { getCardById, getCurrentDuelPlayer } from "@/src/game/DuelHelpers"
import { DuelState, EnergyCounts, SpaceID } from "@/src/game/DuelData"
import { v4 } from "uuid"
import { EnergyType } from "@/src/game/Cards"

export type EnergySelected = {
  neutral: { id: string; selected: boolean }[]
  fire: { id: string; selected: boolean }[]
  water: { id: string; selected: boolean }[]
  earth: { id: string; selected: boolean }[]
  air: { id: string; selected: boolean }[]
}

export const getEmptyEnergySelectedFromCounts = (energyCounts: EnergyCounts): EnergySelected => {
  const newEnergySelected: EnergySelected = {
    neutral: [],
    fire: [],
    water: [],
    earth: [],
    air: [],
  }
  for (let x = 0; x < energyCounts.fire; x++) {
    newEnergySelected.fire.push({ id: v4(), selected: false })
  }
  for (let x = 0; x < energyCounts.water; x++) {
    newEnergySelected.water.push({ id: v4(), selected: false })
  }
  for (let x = 0; x < energyCounts.earth; x++) {
    newEnergySelected.earth.push({ id: v4(), selected: false })
  }
  for (let x = 0; x < energyCounts.air; x++) {
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
  cardIdToBePlayed: string | null
  setCardIdToBePlayed: (cardId: string | null) => void

  energySelected: EnergySelected
  setEnergySelected: (energy: EnergySelected) => void

  attackersToDeclare: string[]
  setAttackersToDeclare: (cardIds: string[]) => void

  defendersToAttackers: Record<string, string>
  setDefendersToAttackers: (newAttackersToDefenders: Record<string, string>) => void

  spaceIdToDefend: SpaceID | null
  setSpaceIdToDefend: (newSpaceId: SpaceID | null) => void

  spaceIdToAttack: SpaceID | null
  setSpaceIdToAttack: (spaceId: SpaceID | null) => void
}

export const useDuelUIStore = create<DuelUIStorePayload>((set) => ({
  cardIdToBePlayed: null,
  setCardIdToBePlayed: (cardId) => set({ cardIdToBePlayed: cardId }),

  energySelected: {
    neutral: [],
    fire: [],
    water: [],
    earth: [],
    air: [],
  },
  setEnergySelected: (newEnergy) => set({ energySelected: newEnergy }),

  attackersToDeclare: [],
  setAttackersToDeclare: (cardId) => set({ attackersToDeclare: cardId }),

  spaceIdToDefend: null,
  setSpaceIdToDefend: (newSpaceId) => set({ spaceIdToDefend: newSpaceId }),

  defendersToAttackers: {},
  setDefendersToAttackers: (newDefendersToAttackers) => set({ defendersToAttackers: newDefendersToAttackers }),

  spaceIdToAttack: null,
  setSpaceIdToAttack: (spaceId) => set({ spaceIdToAttack: spaceId }),
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
  cardIdToBePlayed: string,
  inputSelectedEnergy: EnergySelected
): EnergySelected => {
  let selectedEnergy = window.structuredClone(inputSelectedEnergy)
  const playerEnergy = getCurrentDuelPlayer(duel).energy
  const selectedEnergyCounts = getEnergyCountsFromSelected(inputSelectedEnergy)
  const card = getCardById(duel, cardIdToBePlayed)

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
