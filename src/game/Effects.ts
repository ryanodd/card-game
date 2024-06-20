import { dealDamageToPlayer, playerDrawN, removeCard } from "./Actions"
import { Target } from "./Choices"
import { DuelState, PlayerID } from "./DuelData"
import {
  addAnimationToDuel,
  getDuelPlayerById,
  getOtherPlayerId,
  getRandomInt,
  getRowByCardInstanceId,
} from "./DuelHelpers"

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

export const ember_foxling_after_attack = (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => {
  let duel = inputDuel
  const opponent = getDuelPlayerById(duel, getOtherPlayerId(playerId))

  duel = addAnimationToDuel(duel, { id: "EMBER_FOXLING", duration: 600, attackingCardId: instanceId })

  opponent.health -= 1
  return duel
}

export const stegowulf_attack_modifier = (
  inputDuel: DuelState,
  playerId: PlayerID,
  instanceId: string,
  attackAmount: number
) => {
  const row = getRowByCardInstanceId(inputDuel, instanceId)
  if (row === undefined) {
    throw Error("Stegowulf attack modifier: Couldn't find Stegowulf's row")
  }
  if (row.length === 1) {
    return attackAmount + 2
  }
  return attackAmount
}

export const stegowulf_opponent_attack_modifier = (
  inputDuel: DuelState,
  playerId: PlayerID,
  instanceId: string,
  attackAmount: number
) => {
  const random100 = getRandomInt(100)
  if (random100 < 20) {
    return "miss"
  }
  return attackAmount
}

export const eerie_vision_play = (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => {
  let duel = inputDuel
  // TODO scry 3
  duel = playerDrawN(duel, { numberToDraw: 1, playerId })
  duel = dealDamageToPlayer(duel, playerId, 3)
  return duel
}

export const startle_play = (inputDuel: DuelState, playerId: PlayerID, instanceId: string, target: Target) => {
  let duel = inputDuel
  // TODO
  return duel
}
