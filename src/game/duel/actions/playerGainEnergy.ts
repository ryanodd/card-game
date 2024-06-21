import { DuelState, PlayerID } from "../DuelData"
import { getCurrentDuelPlayer } from "../DuelHelpers"

export type PlayerGainEnergyParams = {
  playerId: PlayerID
  neutral?: number
  fire?: number
  water?: number
  earth?: number
  air?: number
}

const MAX_ENERGY = 5

export const playerGainEnergy = (
  inputDuel: DuelState,
  { neutral, fire, water, earth, air }: PlayerGainEnergyParams
) => {
  let duel = inputDuel
  const player = getCurrentDuelPlayer(duel)
  player.energy.neutral = Math.min(player.energy.neutral + (neutral ?? 0), MAX_ENERGY)
  player.energy.fire = Math.min(player.energy.fire + (fire ?? 0), MAX_ENERGY)
  player.energy.water = Math.min(player.energy.water + (water ?? 0), MAX_ENERGY)
  player.energy.earth = Math.min(player.energy.earth + (earth ?? 0), MAX_ENERGY)
  player.energy.air = Math.min(player.energy.air + (air ?? 0), MAX_ENERGY)
  return duel
}