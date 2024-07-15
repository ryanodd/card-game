import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { drawToHand } from "./drawToHand"

export async function turnStart(inputDuel: DuelState) {
  let duel = inputDuel

  // Reset energy
  const player = getDuelPlayerById(duel, duel.currentPlayerId)
  player.energy = {
    fire: player.energyIncome.fire,
    water: player.energyIncome.water,
    earth: player.energyIncome.earth,
    air: player.energyIncome.air,
    neutral: player.energyIncome.neutral,
  }
  player.playedEnergyThisTurn = false

  duel = await drawToHand(duel, duel.currentPlayerId, 1)

  duel.choice = { id: "TAKE_TURN", playerId: duel.currentPlayerId }
  return duel
}
