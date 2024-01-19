import { autoPayElements } from "../react/hooks/useDuelUIStore"
import { combat, creaturesMarchIfNecessary, duelSetup, endTurn, playCardFromHand } from "./Actions"
import { DuelState, EnergyCounts, PlayerID, SpaceID } from "./DuelData"
import {
  addAnimationToDuel,
  getCardByInstanceId,
  getCurrentDuelPlayer,
  getNonCurrentDuelPlayer,
  getSpaceById,
  isEnergySufficient,
} from "./DuelHelpers"

export enum ChoiceID {
  CONFIRM_DUEL_START,
  CONFIRM_DUEL_END,
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

export const confirmEnd_execute = (duel: DuelState): DuelState => {
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
  const cardsAffordedWithTargets = cardsAfforded.filter((cardInstanceId) => {
    const card = getCardByInstanceId(duel, cardInstanceId)
    const targets = takeTurn_getValidTargetsForCard(duel, cardInstanceId)
    return targets.length > 0
  })
  return cardsAffordedWithTargets
}

export type Target =
  | {
      targetType: "space"
      spaceId: SpaceID
    }
  | {
      targetType: "playArea"
      playerId: PlayerID
    }
  | {
      targetType: "player"
      playerId: PlayerID
    }

export const takeTurn_getValidTargetsForCard = (
  duel: DuelState,
  cardIdToPlay: string,
  energyToPay?: EnergyCounts
): Target[] => {
  if (energyToPay && !isEnergySufficient(energyToPay, getCardByInstanceId(duel, cardIdToPlay).cost, true)) {
    return []
  }
  const validTargets: Target[] = []
  const card = getCardByInstanceId(duel, cardIdToPlay)
  const player = getCurrentDuelPlayer(duel)

  if (card.cardType === "creature") {
    const playerCreatureSpaces = getCurrentDuelPlayer(duel).creatureSpaces
    for (let x = 0; x < playerCreatureSpaces.length; x++) {
      if (playerCreatureSpaces[x].occupant === null) {
        validTargets.push({ targetType: "space", spaceId: playerCreatureSpaces[x].id })
      }
    }
  }
  if (card.cardType === "energy" && !player.playedEnergyThisTurn) {
    validTargets.push({ targetType: "playArea", playerId: duel.currentPlayerId })
  }
  return validTargets
}

export const takeTurn_executePlayCard = (
  duel: DuelState,
  params: {
    cardIdToPlay: string
    target: Target
    energyPaid: EnergyCounts
  }
) => {
  duel = playCardFromHand(duel, {
    playerId: duel.currentPlayerId,
    cardId: params.cardIdToPlay,
    target: params.target,
    energyPaid: params.energyPaid,
  })
  return duel
}
export const takeTurn_executeAdvance = (duel: DuelState): DuelState => {
  duel = combat(duel)
  duel = creaturesMarchIfNecessary(duel)
  return endTurn(duel)
}

export const confirmEndAttacks_execute = (duel: DuelState): DuelState => {
  duel.choice = { id: ChoiceID.TAKE_TURN, playerId: duel.choice.playerId }

  return duel
}
