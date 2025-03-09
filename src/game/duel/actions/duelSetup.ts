import { DuelState, GAME_START_NUM_TO_DRAW } from "../DuelData"
import { drawToCardSelect } from "./drawToCardSelect"
import { drawToHand } from "./drawToHand"
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
    duel = await drawToHand(duel, "human", GAME_START_NUM_TO_DRAW)
    duel = await drawToHand(duel, "opponent", GAME_START_NUM_TO_DRAW)
    duel = await turnStart(duel)
  } else {
    duel = await startMulligan(duel, duel.playerGoingFirst)
  }

  return duel
}
