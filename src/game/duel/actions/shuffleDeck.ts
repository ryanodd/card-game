import { shuffleArray } from "@/src/utils/randomNumber"
import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

export async function shuffleDeck(inputDuel: DuelState, playerId: PlayerID) {
  let duel = inputDuel
  const deck = getDuelPlayerById(duel, playerId).deck
  shuffleArray(deck)
  return duel
}
