import { DuelState } from "../DuelData"
import { playerDrawN } from "./playerDrawN"
import { shuffleDeck } from "./shuffleDeck"
import { turnStart } from "./turnStart"

export const duelSetup = (inputDuel: DuelState) => {
  let duel = inputDuel

  duel = shuffleDeck(duel, "human")
  duel = shuffleDeck(duel, "opponent")

  duel = playerDrawN(duel, { playerId: "human", numberToDraw: 6 })
  duel = playerDrawN(duel, { playerId: "opponent", numberToDraw: 6 })

  // TODO randomize
  const humanGoesFirst = true
  if (humanGoesFirst) {
    duel.playerGoingFirst === "human"
    duel.currentPlayerId === "human"
  } else {
    duel.playerGoingFirst === "opponent"
    duel.currentPlayerId === "opponent"
  }

  duel = turnStart(duel)

  return duel
}
