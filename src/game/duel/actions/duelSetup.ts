import { DuelState } from "../DuelData"
import { playerDrawN } from "./playerDrawN"
import { shuffleDeck } from "./shuffleDeck"
import { turnStart } from "./turnStart"

export async function duelSetup(inputDuel: DuelState) {
  let duel = inputDuel

  duel = shuffleDeck(duel, "human")
  duel = shuffleDeck(duel, "opponent")

  duel = await playerDrawN(duel, "human", 6)
  duel = await playerDrawN(duel, "opponent", 6)

  // TODO randomize
  const humanGoesFirst = true
  if (humanGoesFirst) {
    duel.playerGoingFirst === "human"
    duel.currentPlayerId === "human"
  } else {
    duel.playerGoingFirst === "opponent"
    duel.currentPlayerId === "opponent"
  }

  duel = await turnStart(duel)

  return duel
}
