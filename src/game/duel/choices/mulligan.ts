import { DuelState } from "../DuelData"
import { mulligan } from "../actions/mulligan"

export async function mulligan_execute(inputDuel: DuelState, selectedCardIds: string[]) {
  let duel = inputDuel

  if (duel.choice.id !== "MULLIGAN") {
    throw Error("Tried to mulligan when it wasn't time to mulligan")
  }
  const playerId = duel.choice.playerId
  duel = await mulligan(inputDuel, playerId, selectedCardIds)
  return duel
}
