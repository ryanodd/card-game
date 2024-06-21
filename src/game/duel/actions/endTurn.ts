import { DuelState } from "../DuelData"
import { getOtherPlayerId } from "../DuelHelpers"
import { turnStart } from "./turnStart"

export const endTurn = (inputDuel: DuelState) => {
  let duel = inputDuel
  duel.currentPlayerId = getOtherPlayerId(duel.currentPlayerId)
  if (duel.currentPlayerId === duel.playerGoingFirst) {
    duel.turnNumber = duel.turnNumber + 1
  }

  duel = turnStart(duel)

  return duel
}
