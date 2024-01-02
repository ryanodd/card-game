import { combat, duelSetup, endTurn, playCardFromHand } from "./Actions"
import { DuelState, EnergyCounts, PlayerID } from "./DuelData"
import {
  addAnimationToDuel,
  getCardByInstanceId,
  getCurrentDuelPlayer,
  getNonCurrentDuelPlayer,
  getSpaceByInstanceId,
  isEnergySufficient,
} from "./DuelHelpers"

export enum ChoiceID {
  CONFIRM_START,
  TAKE_TURN,
  DECLARE_ATTACKERS,
  DECLARE_DEFENDS,
  RESOLVE_ATTACKS,
  CONFIRM_END_ATTACKS,
}

export type ChoiceType = "target" | "targets" | "confirm"

export type ChoiceTarget = string | "human" | "opponent" | "confirm"

export type DuelChoiceData = {
  id: ChoiceID
  playerId: PlayerID
}

export const confirmStart_execute = (duel: DuelState): DuelState => {
  duelSetup(duel)
  return duel
}

export const takeTurn_getValidHandTargets = (duel: DuelState): string[] => {
  // First, check if there are any valid spaces
  const playerCreatureSpaces = getCurrentDuelPlayer(duel).creatureSpaces
  const validSpaceIds: string[] = []
  for (let x = 0; x < playerCreatureSpaces.length; x++) {
    if (playerCreatureSpaces[x].occupant === null) {
      validSpaceIds.push(playerCreatureSpaces[x].id)
    }
  }
  if (validSpaceIds.length === 0) {
    return []
  }

  const playerHand = getCurrentDuelPlayer(duel).hand
  const energyCounts = getCurrentDuelPlayer(duel).energy
  const cardsAfforded = []
  for (let x = 0; x < playerHand.length; x++) {
    const card = playerHand[x]
    if (isEnergySufficient(energyCounts, card.cost, false)) {
      cardsAfforded.push(card.instanceId)
    }
  }
  return cardsAfforded
}

export const takeTurn_getValidSpaceTargets = (
  duel: DuelState,
  cardIdToPlay: string,
  energyToPay: EnergyCounts
): string[] => {
  console.log(energyToPay)
  if (!isEnergySufficient(energyToPay, getCardByInstanceId(duel, cardIdToPlay).cost, true)) {
    return []
  }

  const playerCreatureSpaces = getCurrentDuelPlayer(duel).creatureSpaces
  const validSpaceIds: string[] = []
  for (let x = 0; x < playerCreatureSpaces.length; x++) {
    if (playerCreatureSpaces[x].occupant === null) {
      validSpaceIds.push(playerCreatureSpaces[x].id)
    }
  }
  return validSpaceIds
}

export const takeTurn_executePlayCard = (
  duel: DuelState,
  params: {
    cardIdToPlay: string
    targetSpaceId: string
    energyPaid: EnergyCounts
  }
) => {
  duel = playCardFromHand(duel, {
    playerId: duel.currentPlayerId,
    cardId: params.cardIdToPlay,
    targetId: params.targetSpaceId,
    energyPaid: params.energyPaid,
  })
  return duel
}
export const takeTurn_executeAdvance = (duel: DuelState): DuelState => {
  // TODO

  return endTurn(duel)
}

export const resolveAttacks_execute = (
  inputDuel: DuelState,
  params: {
    attackingSpaceId: string
    defendingSpaceId: string | null
  }
) => {
  let duel = inputDuel
  const attackingCard = getSpaceByInstanceId(duel, params.attackingSpaceId).occupant

  if (attackingCard === null) {
    throw Error(`No card to resolve attack for at space ${params.attackingSpaceId}`)
  }

  duel = addAnimationToDuel(duel, {
    id: "ATTACK_START",
    duration: 200,
    attackingSpaceId: params.attackingSpaceId,
    defendingSpaceId: params.defendingSpaceId,
  })

  // Do damage
  if (params.defendingSpaceId === null) {
    const otherPlayer = getNonCurrentDuelPlayer(duel)
    otherPlayer.health -= attackingCard.attack
  }
  if (params.defendingSpaceId !== null) {
    const defendingCard = getSpaceByInstanceId(duel, params.defendingSpaceId).occupant
    if (defendingCard) {
      duel = combat(duel, attackingCard.instanceId, defendingCard.instanceId)
    }
  }

  duel = addAnimationToDuel(duel, {
    id: "ATTACK_END",
    duration: 200,
    attackingSpaceId: params.attackingSpaceId,
    defendingSpaceId: params.defendingSpaceId,
  })

  return duel
}

export const confirmEndAttacks_execute = (duel: DuelState): DuelState => {
  duel.choice = { id: ChoiceID.TAKE_TURN, playerId: duel.choice.playerId }

  return duel
}
