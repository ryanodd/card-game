import { DuelState } from "../DuelData"
import { getCardByInstanceId, getDuelPlayerById, getPlayerIdByCardInstanceId } from "../DuelHelpers"
import { removeCard } from "./removeCard"

export async function destroyCard(inputDuel: DuelState, cardId: string) {
  let duel = inputDuel

  const card = getCardByInstanceId(duel, cardId)
  const playerId = getPlayerIdByCardInstanceId(duel, cardId)
  const player = getDuelPlayerById(duel, playerId)

  player.discard.push(card)

  duel = await removeCard(duel, cardId)

  return duel
}
