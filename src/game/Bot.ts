import { autoPayElements, getEnergyButtonsForPlayer, getEnergyCountsFromSelected } from "../react/hooks/useDuelUIStore"
import {
  ChoiceID,
  confirmEndAttacks_execute,
  takeTurn_executeAdvance,
  takeTurn_executePlayCard,
  takeTurn_getValidHandTargets,
  takeTurn_getValidTargetsForCard,
} from "./Choices"
import { CardState, DuelState } from "./DuelData"
import {
  getCardByInstanceId,
  getCurrentDuelPlayer,
  getOccupantIdBySpaceId,
  getRandomInt,
  getSpaceById,
} from "./DuelHelpers"

export const executeChoiceForOpponent = (inputDuel: DuelState): DuelState => {
  let duel = inputDuel
  // TODO verify somehow that it's not the human's choice to make
  const choiceId = duel.choice.id
  if (choiceId === ChoiceID.TAKE_TURN) {
    duel = opponentTakeTurn(duel)
    return duel
  }
  if (choiceId === ChoiceID.RESOLVE_ATTACKS) {
    duel = opponentResolveAttacks(duel)
    return duel
  }
  if (choiceId === ChoiceID.CONFIRM_END_ATTACKS) {
    duel = confirmEndAttacks_execute(duel)
    return duel
  }
  throw Error("No choice for the opponent to make")
}

export const opponentTakeTurn = (inputDuel: DuelState): DuelState => {
  let duel = inputDuel

  const handTargets = takeTurn_getValidHandTargets(duel)
  if (handTargets.length === 0) {
    duel = takeTurn_executeAdvance(duel)
    return duel
  }

  const cardIdToPlay = handTargets[getRandomInt(handTargets.length)]
  const emptyEnergySelected = getEnergyButtonsForPlayer(getCurrentDuelPlayer(duel))
  const elementsToPay = getEnergyCountsFromSelected(autoPayElements(duel, cardIdToPlay, emptyEnergySelected))
  const targets = takeTurn_getValidTargetsForCard(duel, cardIdToPlay, elementsToPay)
  const targetToPlay = targets[getRandomInt(targets.length)]
  duel = takeTurn_executePlayCard(duel, { cardIdToPlay, target: targetToPlay, energyPaid: elementsToPay })
  return duel
}

export const opponentResolveAttacks = (inputDuel: DuelState): DuelState => {
  let duel = inputDuel
  // duel = resolveAttacks_execute(duel, {
  //   attackingSpaceId,
  //   defendingSpaceId,
  // })

  return duel
}
