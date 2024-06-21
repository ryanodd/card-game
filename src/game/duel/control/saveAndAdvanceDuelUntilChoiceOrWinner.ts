import { executeChoiceForOpponent } from "../Bot"
import { DuelState } from "../DuelData"
import { duelWinner } from "../DuelHelpers"
import { playAnimation } from "./playAnimation"
import { saveDuelAndRefreshUI } from "./saveAndRerenderUI"

export async function saveAndAdvanceDuelUntilChoiceOrWinner(duel: DuelState) {
  const OPPONENT_CHOICE_MS = 1000
  while (duel.choice.playerId === "opponent" && !duelWinner(duel)) {
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: OPPONENT_CHOICE_MS })
    duel = await executeChoiceForOpponent(duel)
  }

  if (duelWinner(duel)) {
    duel.choice = { id: "CONFIRM_DUEL_END", playerId: "human" }
    saveDuelAndRefreshUI(duel)
    return
  }

  saveDuelAndRefreshUI(duel)
}
