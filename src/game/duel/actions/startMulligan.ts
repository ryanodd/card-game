import { DuelState, GAME_START_NUM_TO_DRAW } from "../DuelData"
import { PlayerID } from "../PlayerData"
import { drawToCardSelect } from "./drawToCardSelect"

export async function startMulligan(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  duel = await drawToCardSelect(duel, playerId, GAME_START_NUM_TO_DRAW)
  duel.choice = { id: "MULLIGAN", playerId }
  return duel
}
