import { DuelState } from "../../DuelData"
import { combatPhase } from "../../actions/combatPhase"
import { endTurn } from "../../actions/endTurn"

export async function takeTurn_executeAdvance(inputDuel: DuelState) {
  let duel = await combatPhase(inputDuel)
  duel = await endTurn(duel)
  return duel
}