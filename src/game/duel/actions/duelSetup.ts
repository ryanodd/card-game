import { DuelState } from "../DuelData"
import { shuffleDeck } from "./shuffleDeck"
import { startMulligan } from "./startMulligan"
import { turnStart } from "./turnStart"

export async function duelSetup(inputDuel: DuelState) {
  let duel = inputDuel

  duel = await shuffleDeck(duel, "human")
  duel = await shuffleDeck(duel, "opponent")

  // TODO randomize
  const humanGoesFirst = true
  if (humanGoesFirst) {
    duel.playerGoingFirst === "human"
    duel.currentPlayerId === "human"
  } else {
    duel.playerGoingFirst === "opponent"
    duel.currentPlayerId === "opponent"
  }

  if (inputDuel.info.tutorial) {
    duel = await turnStart(duel)
  } else {
    duel = await startMulligan(duel, duel.playerGoingFirst)
  }

  return duel
}
