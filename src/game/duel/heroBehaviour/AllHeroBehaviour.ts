import { getEnergyTotalFromEnergyCounts, getEnergyTypesFromEnergyCounts } from "../../helpers"
import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

import { HeroBehaviour } from "./HeroBehaviourData"

import { HeroName } from "./HeroName"

export async function fire_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.fire = 10
  return duel
}

export async function water_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.water = 10

  return duel
}

export async function earth_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.earth = 10

  return duel
}

export async function air_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.air = 10

  return duel
}

//////////// DUAL-TYPE ////////////////

export async function fire_water_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.fire = 5
  player.energy.water = 5

  return duel
}

export async function fire_earth_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.fire = 5
  player.energy.earth = 5

  return duel
}

export async function fire_air_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.fire = 5
  player.energy.air = 5

  return duel
}

export async function water_earth_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.water = 5
  player.energy.earth = 5

  return duel
}
export async function water_air_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.water = 5
  player.energy.air = 5

  return duel
}
export async function earth_air_hero_produce_turn_energy(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.earth = 5
  player.energy.air = 5

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
  Jet: {
    produceTurnEnergy: fire_water_hero_produce_turn_energy,
  },
  Scorch: {
    produceTurnEnergy: fire_earth_hero_produce_turn_energy,
  },
  Pyroenix: {
    produceTurnEnergy: fire_air_hero_produce_turn_energy,
  },
  Rocco: {
    produceTurnEnergy: water_earth_hero_produce_turn_energy,
  },
  Wishtopher: {
    produceTurnEnergy: water_air_hero_produce_turn_energy,
  },
  Robbyn: {
    produceTurnEnergy: earth_air_hero_produce_turn_energy,
  },
}
