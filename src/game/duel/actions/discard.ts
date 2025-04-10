import { playAnimation } from "../control/playAnimation"
import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

export async function discardBothPlayerHands(duel: DuelState) {
  duel = await playAnimation(duel, { id: "DISCARD_HAND", durationMs: 250 })

  const humanHandCards = duel.human.hand
  duel.human.hand = []
  duel.human.discard.push(...humanHandCards)

  const opponentHandCards = duel.opponent.hand
  duel.opponent.hand = []
  duel.opponent.discard.push(...opponentHandCards)

  duel = await playAnimation(duel, { id: "PAUSE", durationMs: 250 })

  return duel
}
