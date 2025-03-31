import { DuelState } from "../DuelData"
import { getCardByInstanceId, getDuelPlayerById, getPlayerIdByCardInstanceId } from "../DuelHelpers"
import { removeCard } from "./removeCard"
import { resetCard } from "./resetCard"

export async function destroyCard(inputDuel: DuelState, cardId: string) {
  let duel = inputDuel

  const card = getCardByInstanceId(duel, cardId)
  const playerId = getPlayerIdByCardInstanceId(duel, cardId)
  const player = getDuelPlayerById(duel, playerId)

  duel = await removeCard(duel, cardId)

  resetCard(card)

  player.discard.push(card)

  return duel
}
