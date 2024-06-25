import { DuelState } from "../DuelData"
import { removeCard } from "./removeCard"

export async function destroyCard(inputDuel: DuelState, cardId: string) {
  let duel = inputDuel
  duel = await removeCard(duel, cardId)
  return duel
}
