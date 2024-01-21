import { removeCard } from "./Actions"
import { DuelState, PlayerID } from "./DuelData"
import { addAnimationToDuel, getDuelPlayerById, getOtherPlayerId } from "./DuelHelpers"

export const fire_energy = (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.fire += 1
  player.energy.fire += 1
  duel = removeCard(duel, instanceId)
  return duel
}

export const water_energy = (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.water += 1
  player.energy.water += 1
  duel = removeCard(duel, instanceId)
  return duel
}

export const earth_energy = (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.earth += 1
  player.energy.earth += 1
  duel = removeCard(duel, instanceId)
  return duel
}

export const air_energy = (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.air += 1
  player.energy.air += 1
  duel = removeCard(duel, instanceId)
  return duel
}

export const ember_foxling_after_attack = (inputDuel: DuelState, playerId: PlayerID) => {
  let duel = inputDuel
  const opponent = getDuelPlayerById(duel, getOtherPlayerId(playerId))

  duel = addAnimationToDuel(duel, { id: "PAUSE", duration: 500 })

  opponent.health -= 1
  return duel
}
