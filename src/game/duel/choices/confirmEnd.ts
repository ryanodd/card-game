import { DuelState } from "../DuelData"
import { duelSetup } from "../actions/duelSetup"

export async function confirmEnd_execute(inputDuel: DuelState) {
  let duel = duelSetup(inputDuel)
  return duel
}
