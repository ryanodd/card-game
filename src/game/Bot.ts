import {
  autoPayElements,
  getEmptyEnergySelectedFromCounts,
  getEnergyCountsFromSelected,
} from "../react/hooks/useDuelUIStore"
import {
  ChoiceID,
  confirmEndAttacks_execute,
  declareAttackers_execute,
  declareAttackers_getValidSpaceTargets,
  declareDefenders_execute,
  declareDefenders_getValidAttackerTargets,
  declareDefenders_getValidDefenderTargets,
  resolveAttacks_execute,
  resolveAttacks_getValidAttackerTargets,
  resolveAttacks_getValidDefenderTargets,
  takeTurn_executeAdvance,
  takeTurn_executePlayCard,
  takeTurn_getValidHandTargets,
  takeTurn_getValidSpaceTargets,
} from "./Choices"
import { CardState, DuelState } from "./DuelData"
import { getCardById, getCurrentDuelPlayer, getOccupantIdBySpaceId, getRandomInt, getSpaceById } from "./DuelHelpers"

export const executeChoiceForOpponent = (inputDuel: DuelState): DuelState => {
  let duel = inputDuel
  // TODO verify somehow that it's not the human's choice to make
  const choiceId = duel.choice.id
  if (choiceId === ChoiceID.TAKE_TURN) {
    duel = opponentTakeTurn(duel)
    return duel
  }
  if (choiceId === ChoiceID.DECLARE_ATTACKERS) {
    duel = opponentDeclareAttackers(duel)
    return duel
  }
  if (choiceId === ChoiceID.DECLARE_DEFENDS) {
    duel = opponentDeclareDefenders(duel)
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
  const emptyEnergySelected = getEmptyEnergySelectedFromCounts(getCurrentDuelPlayer(duel).energy)
  const elementsToPay = getEnergyCountsFromSelected(autoPayElements(duel, cardIdToPlay, emptyEnergySelected))
  const spaceTargets = takeTurn_getValidSpaceTargets(duel, cardIdToPlay, elementsToPay)
  const spaceToIdPlay = spaceTargets[getRandomInt(spaceTargets.length)]
  duel = takeTurn_executePlayCard(duel, { cardIdToPlay, targetSpaceId: spaceToIdPlay, energyPaid: elementsToPay })
  return duel
}

export const opponentDeclareAttackers = (inputDuel: DuelState): DuelState => {
  let duel = inputDuel

  const validTargets = declareAttackers_getValidSpaceTargets(duel)
  const selectedTargets = validTargets.filter((targetId) => {
    return true //getRandomInt(2) === 0
  })
  duel = declareAttackers_execute(duel, { attackingSpaceIds: selectedTargets })

  return duel
}

export const opponentDeclareDefenders = (inputDuel: DuelState): DuelState => {
  let duel = inputDuel
  const defendersToAttackers: Record<string, string> = {}

  const validDefenderTargets = declareDefenders_getValidDefenderTargets(duel)
  validDefenderTargets.forEach((defendingSpaceId) => {
    const defenderId = getOccupantIdBySpaceId(duel, defendingSpaceId)
    const validAttackers = declareDefenders_getValidAttackerTargets(duel, defendingSpaceId)
    const randomAttackerPlusOne = getRandomInt(validAttackers.length + 1)
    const attackingSpaceIdChosen: string | undefined = validAttackers[randomAttackerPlusOne]

    if (attackingSpaceIdChosen !== undefined) {
      defendersToAttackers[defendingSpaceId] = attackingSpaceIdChosen
    }
  })
  duel = declareDefenders_execute(duel, { defendersToAttackers })

  return duel
}
export const opponentResolveAttacks = (inputDuel: DuelState): DuelState => {
  let duel = inputDuel
  const validAttackerTargets = resolveAttacks_getValidAttackerTargets(duel)
  const attackingSpaceId = validAttackerTargets[getRandomInt(validAttackerTargets.length)]
  const validDefenderTargets = resolveAttacks_getValidDefenderTargets(duel, attackingSpaceId)
  const defendingSpaceId =
    validDefenderTargets.length === 0 ? null : validDefenderTargets[getRandomInt(validDefenderTargets.length)]

  duel = resolveAttacks_execute(duel, {
    attackingSpaceId,
    defendingSpaceId,
  })

  return duel
}
