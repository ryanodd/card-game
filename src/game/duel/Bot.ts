import {
  autoPayElements,
  getEnergyButtonsForPlayer,
  getEnergyCountsFromSelected,
} from "../../react/hooks/useDuelUIStore"
import { DuelState } from "./DuelData"
import { getCurrentDuelPlayer, getRandomInt } from "./DuelHelpers"
import { takeTurn_executeAdvance } from "./choices/takeTurn/executeAdvance"
import { takeTurn_executePlayCard } from "./choices/takeTurn/executePlayCard"
import { takeTurn_getValidHandTargets } from "./choices/takeTurn/getValidHandTargets"
import { takeTurn_getValidTargetsForCard } from "./choices/takeTurn/getValidTargetsForCard"

export async function executeChoiceForOpponent(inputDuel: DuelState): Promise<DuelState> {
  let duel = inputDuel
  // TODO verify somehow that it's not the human's choice to make
  const choiceId = duel.choice.id
  if (choiceId === "TAKE_TURN") {
    duel = await opponentTakeTurn(duel)
    return duel
  }
  throw Error("No choice for the opponent to make")
}

export async function opponentTakeTurn(inputDuel: DuelState) {
  let duel = inputDuel

  const handTargets = takeTurn_getValidHandTargets(duel)
  if (handTargets.length === 0) {
    duel = await takeTurn_executeAdvance(duel)
    return duel
  }

  const cardIdToPlay = handTargets[getRandomInt(handTargets.length)]
  const emptyEnergySelected = getEnergyButtonsForPlayer(getCurrentDuelPlayer(duel))
  const elementsToPay = getEnergyCountsFromSelected(autoPayElements(duel, cardIdToPlay, emptyEnergySelected))
  const targets = takeTurn_getValidTargetsForCard(duel, cardIdToPlay, elementsToPay)
  const targetToPlay = targets[getRandomInt(targets.length)]
  duel = await takeTurn_executePlayCard(duel, { cardIdToPlay, target: targetToPlay, energyPaid: elementsToPay })
  return duel
}
