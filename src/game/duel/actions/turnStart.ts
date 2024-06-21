import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { playerDrawN } from "./playerDrawN"

export const turnStart = (inputDuel: DuelState) => {
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

  duel = playerDrawN(duel, { numberToDraw: 1, playerId: duel.currentPlayerId })

  duel.choice = { id: "TAKE_TURN", playerId: duel.currentPlayerId }
  return duel
}
