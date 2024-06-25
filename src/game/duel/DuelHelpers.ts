import { CardState, DuelState } from "./DuelData"
import { PlayerID } from "./PlayerData"
import { EnergyCounts } from "./EnergyData"
import { getRandomItemFromArray, getRandomSeed } from "@/src/utils/randomNumber"

export const getDuelPlayerById = (duel: DuelState, playerId: PlayerID) => {
  return playerId === "human" ? duel.human : duel.opponent
}

export const getCurrentDuelPlayer = (duel: DuelState) => {
  return duel.currentPlayerId === "human" ? duel.human : duel.opponent
}
export const getNonCurrentDuelPlayer = (duel: DuelState) => {
  return duel.currentPlayerId === "human" ? duel.opponent : duel.human
}

export const getOtherPlayerId = (playerId: PlayerID): PlayerID => {
  return playerId === "human" ? "opponent" : "human"
}

export const getOtherPlayerByPlayerId = (duel: DuelState, playerId: PlayerID) => {
  return getDuelPlayerById(duel, getOtherPlayerId(playerId))
}

export const getAllCards = (duel: DuelState): CardState[] => {
  const cards = []
  const humanHand = duel.human.hand
  for (let x = 0; x < humanHand.length; x++) {
    cards.push(humanHand[x])
  }

  const humanDiscard = duel.human.discard
  for (let x = 0; x < humanDiscard.length; x++) {
    cards.push(humanDiscard[x])
  }

  const humanRows = duel.human.rows
  for (let x = 0; x < humanRows.length; x++) {
    for (let y = 0; y < humanRows[x].length; y++) {
      cards.push(humanRows[x][y])
    }
  }

  const opponentHand = duel.opponent.hand
  for (let x = 0; x < opponentHand.length; x++) {
    cards.push(opponentHand[x])
  }

  const opponentDiscard = duel.opponent.discard
  for (let x = 0; x < opponentDiscard.length; x++) {
    cards.push(opponentDiscard[x])
  }

  const opponentRows = duel.opponent.rows
  for (let x = 0; x < opponentRows.length; x++) {
    for (let y = 0; y < opponentRows[x].length; y++) {
      cards.push(opponentRows[x][y])
    }
  }

  return cards
}

export const getAllCardsForPlayer = (duel: DuelState, playerId: PlayerID): CardState[] => {
  const cards = []
  if (playerId === "human") {
    const humanHand = duel.human.hand
    for (let x = 0; x < humanHand.length; x++) {
      cards.push(humanHand[x])
    }

    const humanDiscard = duel.human.discard
    for (let x = 0; x < humanDiscard.length; x++) {
      cards.push(humanDiscard[x])
    }

    const humanRows = duel.human.rows
    for (let x = 0; x < humanRows.length; x++) {
      for (let y = 0; y < humanRows[x].length; y++) {
        cards.push(humanRows[x][y])
      }
    }
  }
  if (playerId === "opponent") {
    const opponentHand = duel.opponent.hand
    for (let x = 0; x < opponentHand.length; x++) {
      cards.push(opponentHand[x])
    }

    const opponentDiscard = duel.opponent.discard
    for (let x = 0; x < opponentDiscard.length; x++) {
      cards.push(opponentDiscard[x])
    }

    const opponentRows = duel.opponent.rows
    for (let x = 0; x < opponentRows.length; x++) {
      for (let y = 0; y < opponentRows[x].length; y++) {
        cards.push(opponentRows[x][y])
      }
    }
  }
  return cards
}

export const getCardByInstanceId = (duel: DuelState, cardId: string): CardState => {
  const card = getAllCards(duel).find((card) => {
    return card.instanceId === cardId
  })

  if (card === undefined) {
    throw new Error("card not found :(")
  }
  return card
}

export const isEnergySufficient = (energy: EnergyCounts, cost: EnergyCounts, mustMatchExactly?: boolean): boolean => {
  let remainingEnergyForNeutral = 0
  if (energy.fire < cost.fire) {
    return false
  }
  remainingEnergyForNeutral += energy.fire - cost.fire
  if (energy.water < cost.water) {
    return false
  }
  remainingEnergyForNeutral += energy.water - cost.water
  if (energy.earth < cost.earth) {
    return false
  }
  remainingEnergyForNeutral += energy.earth - cost.earth
  if (energy.air < cost.air) {
    return false
  }
  remainingEnergyForNeutral += energy.air - cost.air
  if (mustMatchExactly) {
    return remainingEnergyForNeutral + energy.neutral === cost.neutral
  } else {
    const canAffordNeutral = remainingEnergyForNeutral + energy.neutral >= cost.neutral
    return canAffordNeutral
  }
}

export const duelWinner = (duel: DuelState): PlayerID | "draw" | null => {
  if ((duel.human.health <= 0 && duel.opponent.health <= 0) || (duel.human.drawnDead && duel.opponent.drawnDead)) {
    return "draw"
  }

  if (duel.opponent.health <= 0 || duel.opponent.drawnDead) {
    return "human"
  }
  if (duel.human.health <= 0 || duel.human.drawnDead) {
    return "opponent"
  }
  return null
}

export const getCardStateByInstanceId = (duel: DuelState, instanceId: string): CardState => {
  const foundCard = getAllCards(duel).find((card) => {
    return card.instanceId === instanceId
  })

  if (!foundCard) {
    throw Error(`card instance id ${instanceId} not found!`)
  }

  return foundCard
}

export const getRowIndexByCardInstanceId = (duel: DuelState, cardInstanceId: string) => {
  const humanRows = duel.human.rows
  for (let x = 0; x < humanRows.length; x++) {
    for (let y = 0; y < humanRows[x].length; y++) {
      if (humanRows[x][y].instanceId === cardInstanceId) {
        return x
      }
    }
  }

  const opponentRows = duel.opponent.rows
  for (let x = 0; x < opponentRows.length; x++) {
    for (let y = 0; y < opponentRows[x].length; y++) {
      if (opponentRows[x][y].instanceId === cardInstanceId) {
        return x
      }
    }
  }

  return undefined
}

export const getPlayerRowByCardInstanceId = (duel: DuelState, cardInstanceId: string) => {
  const humanRows = duel.human.rows
  for (let x = 0; x < humanRows.length; x++) {
    for (let y = 0; y < humanRows[x].length; y++) {
      if (humanRows[x][y].instanceId === cardInstanceId) {
        return humanRows[x]
      }
    }
  }

  const opponentRows = duel.opponent.rows
  for (let x = 0; x < opponentRows.length; x++) {
    for (let y = 0; y < opponentRows[x].length; y++) {
      if (opponentRows[x][y].instanceId === cardInstanceId) {
        return opponentRows[x]
      }
    }
  }

  return undefined
}

export const getPlayerIdByCardInstanceId = (duel: DuelState, cardInstanceId: string): PlayerID => {
  const humanCards = getAllCardsForPlayer(duel, "human")
  if (humanCards.find((cardState) => cardState.instanceId === cardInstanceId) !== undefined) {
    return "human"
  }
  const opponentCards = getAllCardsForPlayer(duel, "opponent")
  if (opponentCards.find((cardState) => cardState.instanceId === cardInstanceId) !== undefined) {
    return "opponent"
  }
  throw Error(`card ${getCardByInstanceId(duel, cardInstanceId).name} belongs to neither human nor opponent`)
}

export const getOpposingAttackingCreatureByCardId = (duel: DuelState, cardInstanceId: string) => {
  const currentPlayerId = getPlayerIdByCardInstanceId(duel, cardInstanceId)
  const otherPlayer = getOtherPlayerByPlayerId(duel, currentPlayerId)
  const rowIndex = getRowIndexByCardInstanceId(duel, cardInstanceId)
  if (rowIndex !== undefined && otherPlayer.rows[rowIndex].length >= 1) {
    return otherPlayer.rows[rowIndex][0]
  }
  return undefined
}

export const getRandomCreatureInPlayForPlayer = (duel: DuelState, playerId: PlayerID) => {
  const cardsInPlayForPlayer = []
  const player = getDuelPlayerById(duel, playerId)

  for (let x = 0; x < player.rows.length; x++) {
    const row = player.rows[x]
    for (let y = 0; y < row.length; y++) {
      cardsInPlayForPlayer.push(row[y])
    }
  }

  if (cardsInPlayForPlayer.length < 1) {
    return undefined
  }

  return getRandomItemFromArray(cardsInPlayForPlayer, getRandomSeed())
}

export const getOpposingRowByCardId = (duel: DuelState, cardId: string) => {
  const playerId = getPlayerIdByCardInstanceId(duel, cardId)
  const rowIndex = getRowIndexByCardInstanceId(duel, cardId)
  if (rowIndex === undefined) {
    return undefined
  }
  const opposingPlayer = getOtherPlayerByPlayerId(duel, playerId)
  const opposingRow = opposingPlayer.rows[rowIndex]
  return opposingRow
}
