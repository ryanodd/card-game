import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { heroBehaviourMap } from "../heroBehaviour/AllHeroBehaviour"
import { drawToHand } from "./drawToHand"

export async function turnStart(inputDuel: DuelState) {
  let duel = inputDuel

  const player = getDuelPlayerById(duel, duel.currentPlayerId)

  const heroTurnStartBehaviour = heroBehaviourMap[player.hero.name].turnStart
  heroTurnStartBehaviour?.(duel, duel.currentPlayerId)

  if (duel.playerGoingFirst === duel.currentPlayerId) {
    const humanHeroProduceTurnEnergyBehaviour = heroBehaviourMap[duel.human.hero.name].produceTurnEnergy
    humanHeroProduceTurnEnergyBehaviour(duel, "human")
    const opponentHeroProduceTurnEnergyBehaviour = heroBehaviourMap[duel.opponent.hero.name].produceTurnEnergy
    opponentHeroProduceTurnEnergyBehaviour(duel, "opponent")

    duel = await drawToHand(duel, "human", 5)
    duel = await drawToHand(duel, "opponent", 5)
  }

  duel.choice = { id: "TAKE_TURN", playerId: duel.currentPlayerId }
  return duel
}
