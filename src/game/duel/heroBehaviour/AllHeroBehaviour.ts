import { getEnergyTotalFromEnergyCounts, getEnergyTypesFromEnergyCounts } from "../../helpers"
import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

import { HeroBehaviour } from "./HeroBehaviourData"

import { HeroName } from "./HeroName"

export async function fire_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  const energyFromPreviousTurn = getEnergyTotalFromEnergyCounts(player.energy)
  for (let x = energyFromPreviousTurn; x < player.energyCapacity; x++) {
    player.energy.fire += 1
  }
  return duel
}

export async function water_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  const energyFromPreviousTurn = getEnergyTotalFromEnergyCounts(player.energy)
  for (let x = energyFromPreviousTurn; x < player.energyCapacity; x++) {
    player.energy.water += 1
  }
  return duel
}

export async function earth_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  const energyFromPreviousTurn = getEnergyTotalFromEnergyCounts(player.energy)
  for (let x = energyFromPreviousTurn; x < player.energyCapacity; x++) {
    player.energy.earth += 1
  }
  return duel
}

export async function air_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  const energyFromPreviousTurn = getEnergyTotalFromEnergyCounts(player.energy)
  for (let x = energyFromPreviousTurn; x < player.energyCapacity; x++) {
    player.energy.air += 1
  }
  return duel
}

export const heroBehaviourMap: Record<HeroName, HeroBehaviour> = {
  Garmuk: {
    produceTurnEnergy: fire_hero_produce_turn_energy,
  },
  Lappy: {
    produceTurnEnergy: water_hero_produce_turn_energy,
  },
  "Elozar the Steadfast": {
    produceTurnEnergy: earth_hero_produce_turn_energy,
  },
  "Orrin Stormwing": {
    produceTurnEnergy: air_hero_produce_turn_energy,
  },
}
