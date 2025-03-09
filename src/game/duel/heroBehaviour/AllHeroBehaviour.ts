import { DuelState } from "../DuelData"
import { getDuelPlayerByCardInstanceId, getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

import { removeCard } from "../actions/removeCard"
import { HeroBehaviour } from "./HeroBehaviourData"

import { HeroName } from "./HeroName"

export async function fire_hero_turn_start(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.fire += 3
  return duel
}

export async function water_hero_turn_start(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.water += 3
  return duel
}

export async function earth_hero_turn_start(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.earth += 3
  return duel
}

export async function air_hero_turn_start(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energy.air += 3
  return duel
}

export const heroBehaviourMap: Record<HeroName, HeroBehaviour> = {
  "Fire Hero": {
    turnStart: fire_hero_turn_start,
  },
  "Water Hero": {
    turnStart: water_hero_turn_start,
  },
  "Earth Hero": {
    turnStart: earth_hero_turn_start,
  },
  "Air Hero": {
    turnStart: air_hero_turn_start,
  },
}
