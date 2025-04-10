import { DuelState } from "../DuelData"
import { PlayerID } from "../PlayerData"
import { drawToCardSelect } from "./drawToCardSelect"

export async function startMulligan(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  duel = await drawToCardSelect(duel, playerId, 5)
  duel.choice = { id: "MULLIGAN", playerId }
  return duel
}
