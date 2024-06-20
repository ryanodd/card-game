import { autoPayElements } from "../react/hooks/useDuelUIStore"
import { combat, duelSetup, endTurn, playCardFromHand } from "./Actions"
import { cardDataMap } from "./Cards"
import { DuelState, EnergyCounts, PlayerID } from "./DuelData"
import { getCardByInstanceId, getCurrentDuelPlayer, getDuelPlayerById, isEnergySufficient } from "./DuelHelpers"

export type ChoiceID = "CONFIRM_DUEL_START" | "CONFIRM_DUEL_END" | "TAKE_TURN"

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
      targetType: "rowSpace"
      playerId: PlayerID
      rowIndex: number
      positionIndex: number
    }
  | {
      targetType: "playArea"
    }
  | {
      targetType: "player"
      playerId: PlayerID
    }

export const getEnergyDefaultTargets = (duel: DuelState, playerId: PlayerID, instanceId: string): Target[] => {
  if (getDuelPlayerById(duel, playerId).playedEnergyThisTurn) {
    return []
  }
  return [{ targetType: "playArea" }]
}

export const getDefaultCreatureTargets = (duel: DuelState, playerId: PlayerID, instanceId: string) => {
  const validTargets: Target[] = []
  const playerRows = getDuelPlayerById(duel, duel.currentPlayerId).rows
  for (let x = 0; x < playerRows.length; x++) {
    const row = playerRows[x]
    for (let y = 0; y <= row.length; y++) {
      // <= , since adding a card to the n+1th index is valid
      validTargets.push({
        targetType: "rowSpace",
        playerId: duel.currentPlayerId,
        rowIndex: x,
        positionIndex: y,
      })
    }
  }
  return validTargets
}

export const takeTurn_getValidTargetsForCard = (
  duel: DuelState,
  cardIdToPlay: string,
  energyToPay?: EnergyCounts
): Target[] => {
  if (energyToPay && !isEnergySufficient(energyToPay, getCardByInstanceId(duel, cardIdToPlay).cost, true)) {
    return []
  }

  const card = getCardByInstanceId(duel, cardIdToPlay)
  const cardData = cardDataMap[card.name]
  const validTargets = cardData.getValidTargets(duel, duel.currentPlayerId, cardIdToPlay)

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
  return endTurn(duel)
}

export const confirmEndAttacks_execute = (duel: DuelState): DuelState => {
  duel.choice = { id: "TAKE_TURN", playerId: duel.choice.playerId }

  return duel
}
