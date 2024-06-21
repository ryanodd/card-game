import { shuffleArray } from "../../randomNumber"
import { DuelState, PlayerID } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"

export const shuffleDeck = (inputDuel: DuelState, playerId: PlayerID) => {
  let duel = inputDuel
  const deck = getDuelPlayerById(duel, playerId).deck
  shuffleArray(deck)
  return duel
}
