import { combat, duelSetup, endTurn, playCardFromHand } from "./Actions"
import { cardDataMap } from "./Cards"
import { DuelParams } from "./DuelController"
import { DuelState, EnergyCounts, PlayerID, SpaceID } from "./DuelData"
import {
  getCardById,
  getCurrentDuelPlayer,
  getNonCurrentDuelPlayer,
  getOtherPlayerId,
  getSpaceById,
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
      cardsAfforded.push(card.id)
    }
  }
  return cardsAfforded
}

export const takeTurn_getValidSpaceTargets = (
  duel: DuelState,
  cardIdToPlay: string,
  energyToPay: EnergyCounts
): string[] => {
  if (!isEnergySufficient(energyToPay, getCardById(duel, cardIdToPlay).cost, true)) {
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
  if (duel.attackedThisTurn) {
    return endTurn(duel)
  }

  // If there are potential attackers to declare
  if (declareAttackers_getValidSpaceTargets(duel).length > 0) {
    duel.choice = { id: ChoiceID.DECLARE_ATTACKERS, playerId: duel.choice.playerId }
    // If we're entering attacks with nothing to use, skip to end
  } else {
    duel.choice = { id: ChoiceID.CONFIRM_END_ATTACKS, playerId: duel.choice.playerId }
  }

  return duel
}
export const declareAttackers_getValidSpaceTargets = (duel: DuelState): SpaceID[] => {
  const playerCreatureSpaces = getCurrentDuelPlayer(duel).creatureSpaces
  const validSpaceIds: SpaceID[] = []
  for (let x = 0; x < playerCreatureSpaces.length; x++) {
    const occupant = playerCreatureSpaces[x].occupant
    if (occupant !== null && !occupant.summonSick) {
      validSpaceIds.push(playerCreatureSpaces[x].id)
    }
  }
  return validSpaceIds
}

export const declareAttackers_execute = (duel: DuelState, params: { attackingSpaceIds: string[] }) => {
  duel.attackingSpaceIds = params.attackingSpaceIds
  if (duel.attackingSpaceIds.length === 0) {
    duel.choice = { id: ChoiceID.CONFIRM_END_ATTACKS, playerId: duel.currentPlayerId }
  } else {
    duel.choice = { id: ChoiceID.DECLARE_DEFENDS, playerId: getOtherPlayerId(duel.choice.playerId) }
  }

  return duel
}

export const declareDefenders_getValidDefenderTargets = (duel: DuelState): string[] => {
  const attackingPlayerSpaces = getCurrentDuelPlayer(duel).creatureSpaces
  const defendingPlayerSpaces = getNonCurrentDuelPlayer(duel).creatureSpaces
  const validSpaceIds: string[] = []
  for (let x = 0; x < defendingPlayerSpaces.length; x++) {
    if (
      defendingPlayerSpaces[x].occupant !== null &&
      defendingPlayerSpaces[x].occupant?.attackedThisTurn === false &&
      (duel.attackingSpaceIds.includes(attackingPlayerSpaces[x - 1]?.id) ||
        duel.attackingSpaceIds.includes(attackingPlayerSpaces[x]?.id) ||
        duel.attackingSpaceIds.includes(attackingPlayerSpaces[x + 1]?.id))
    ) {
      validSpaceIds.push(defendingPlayerSpaces[x].id)
    }
  }
  return validSpaceIds
}

export const declareDefenders_getValidAttackerTargets = (duel: DuelState, defendingSpaceId: SpaceID): SpaceID[] => {
  const attackingPlayerSpaces = getCurrentDuelPlayer(duel).creatureSpaces
  const defendingPlayerSpaces = getNonCurrentDuelPlayer(duel).creatureSpaces
  const validSpaceIds: SpaceID[] = []
  for (let x = 0; x < attackingPlayerSpaces.length; x++) {
    if (
      duel.attackingSpaceIds.includes(attackingPlayerSpaces[x].id) &&
      (defendingPlayerSpaces[x - 1]?.id === defendingSpaceId ||
        defendingPlayerSpaces[x]?.id === defendingSpaceId ||
        defendingPlayerSpaces[x + 1]?.id === defendingSpaceId)
    ) {
      validSpaceIds.push(attackingPlayerSpaces[x].id)
    }
  }
  return validSpaceIds
}

export const declareDefenders_execute = (
  duel: DuelState,
  params: { defendersToAttackers: Record<SpaceID, SpaceID> }
): DuelState => {
  // TODO DO THINGS TO DUELSTATE HERE!!!
  duel.defendersToAttackers = params.defendersToAttackers

  if (duel.attackingSpaceIds.length >= 1) {
    duel.choice = { id: ChoiceID.RESOLVE_ATTACKS, playerId: getOtherPlayerId(duel.choice.playerId) }
  }

  return duel
}

export const resolveAttacks_getValidAttackerTargets = (duel: DuelState): SpaceID[] => {
  const attackingSpaceIds = duel.attackingSpaceIds
  const playerCreatureSpaces = getCurrentDuelPlayer(duel).creatureSpaces
  const validSpaceIds: SpaceID[] = []
  for (let x = 0; x < playerCreatureSpaces.length; x++) {
    const occupant = playerCreatureSpaces[x].occupant
    if (occupant?.attackedThisTurn === false && attackingSpaceIds.includes(playerCreatureSpaces[x].id)) {
      validSpaceIds.push(playerCreatureSpaces[x].id)
    }
  }
  return validSpaceIds
}

export const resolveAttacks_getValidDefenderTargets = (duel: DuelState, attackingSpaceId: SpaceID): string[] => {
  const attackingSpace = getSpaceById(duel, attackingSpaceId)
  const defenders = Object.keys(duel.defendersToAttackers)
  return defenders.filter((defendingSpaceId) => {
    return duel.defendersToAttackers[defendingSpaceId] === attackingSpaceId
  })
}

export const resolveAttacks_execute = (
  duel: DuelState,
  params: {
    attackingSpaceId: string
    defendingSpaceId: string | null
  }
) => {
  const attackingCard = getSpaceById(duel, params.attackingSpaceId).occupant

  if (attackingCard === null) {
    throw Error(`No card to resolve attack for at space ${params.attackingSpaceId}`)
  }

  // Do damage
  if (params.defendingSpaceId === null) {
    const otherPlayer = getNonCurrentDuelPlayer(duel)
    otherPlayer.health -= attackingCard.attack
  }
  if (params.defendingSpaceId !== null) {
    delete duel.defendersToAttackers[params.defendingSpaceId]
    const defendingCard = getSpaceById(duel, params.defendingSpaceId).occupant
    if (defendingCard) {
      duel = combat(duel, attackingCard.id, defendingCard.id)
    }
  }

  // If the attacker has more defenders remaining to hit, do that.
  const remainingDefenders = Object.keys(duel.defendersToAttackers).filter((defendingSpaceId) => {
    return duel.defendersToAttackers[defendingSpaceId] === params.attackingSpaceId
  })
  if (remainingDefenders.length > 0) {
    duel.choice = { id: ChoiceID.RESOLVE_ATTACKS, playerId: duel.currentPlayerId }
    return duel
  }

  // This attacker is done attacking this turn:
  // Remove attacker from list of pending attackers
  duel.attackingSpaceIds = duel.attackingSpaceIds.filter((spaceId) => {
    return spaceId !== params.attackingSpaceId
  })
  attackingCard.attackedThisTurn = true

  if (duel.attackingSpaceIds.length === 0) {
    // End attack phase
    duel.attackedThisTurn = true
    duel.choice = { id: ChoiceID.CONFIRM_END_ATTACKS, playerId: duel.currentPlayerId }
  } else {
    // Continue resolving attacks
    duel.choice = { id: ChoiceID.RESOLVE_ATTACKS, playerId: duel.currentPlayerId }
  }

  return duel
}

export const confirmEndAttacks_execute = (duel: DuelState): DuelState => {
  duel.attackedThisTurn = true
  duel.attackingSpaceIds = []
  duel.defendersToAttackers = {}
  duel.choice = { id: ChoiceID.TAKE_TURN, playerId: duel.choice.playerId }

  return duel
}
