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

// After combat is over, remove all cards from play.
export async function cleanUpCardsInPlay(inputDuel: DuelState) {
  let duel = inputDuel

  const humanCards = duel.human.row
  humanCards.forEach((card) => {
    resetCard(card)
  })
  duel.human.row = []
  duel.human.discard.push(...humanCards)

  const opponentCards = duel.opponent.row
  opponentCards.forEach((card) => {
    resetCard(card)
  })
  duel.opponent.row = []
  duel.opponent.discard.push(...opponentCards)

  return duel
}
