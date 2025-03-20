import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { heroBehaviourMap } from "../heroBehaviour/AllHeroBehaviour"
import { drawToHand } from "./drawToHand"
import { playerResetEnergy } from "./playerGainEnergy"
import { resetSummoningSickness } from "./resetSummoningSickness"

export async function turnStart(inputDuel: DuelState) {
  let duel = inputDuel

  const player = getDuelPlayerById(duel, duel.currentPlayerId)

  player.energyCapacity = Math.min(10, duel.turnNumber)

  const heroProduceTurnEnergyBehaviour = heroBehaviourMap[player.hero.name].produceTurnEnergy
  heroProduceTurnEnergyBehaviour(duel, duel.currentPlayerId)

  const heroTurnStartBehaviour = heroBehaviourMap[player.hero.name].turnStart
  heroTurnStartBehaviour?.(duel, duel.currentPlayerId)

  duel = await drawToHand(duel, duel.currentPlayerId, 1)

  duel = await resetSummoningSickness(duel, duel.currentPlayerId)

  duel.choice = { id: "TAKE_TURN", playerId: duel.currentPlayerId }
  return duel
}
