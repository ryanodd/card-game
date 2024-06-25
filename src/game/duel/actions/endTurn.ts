import { DuelState } from "../DuelData"
import { getOtherPlayerId } from "../DuelHelpers"
import { turnStart } from "./turnStart"

export async function endTurn(inputDuel: DuelState) {
  let duel = inputDuel
  duel.currentPlayerId = getOtherPlayerId(duel.currentPlayerId)
  if (duel.currentPlayerId === duel.playerGoingFirst) {
    duel.turnNumber = duel.turnNumber + 1
  }

  duel = await turnStart(duel)

  return duel
}
