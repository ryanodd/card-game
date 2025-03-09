import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { heroBehaviourMap } from "../heroBehaviour/AllHeroBehaviour"
import { drawToHand } from "./drawToHand"
import { resetSummoningSickness } from "./resetSummoningSickness"

export async function turnStart(inputDuel: DuelState) {
  let duel = inputDuel

  const player = getDuelPlayerById(duel, duel.currentPlayerId)
  const heroTurnStartBehaviour = heroBehaviourMap[player.hero.name].turnStart
  heroTurnStartBehaviour?.(duel, duel.currentPlayerId)

  duel = await drawToHand(duel, duel.currentPlayerId, 1)

  duel = await resetSummoningSickness(duel, duel.currentPlayerId)

  duel.choice = { id: "TAKE_TURN", playerId: duel.currentPlayerId }
  return duel
}
