import { CardState, DuelState, PlayerState } from "./DuelData"
import { PlayerID } from "./PlayerData"
import { EnergyCost, EnergyCounts, EnergyType } from "./EnergyData"
import { getRandomItemFromArray, getRandomSeed } from "@/src/utils/randomNumber"
import { Target } from "./choices/ChoiceData"

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
  cards.push(...getAllCardsForPlayer(duel, "human"))
  cards.push(...getAllCardsForPlayer(duel, "opponent"))
  return cards
}

export const getAllCardsForPlayer = (duel: DuelState, playerId: PlayerID): CardState[] => {
  const cards = []
  const player = getDuelPlayerById(duel, playerId)

  const hand = player.hand
  for (let x = 0; x < hand.length; x++) {
    cards.push(hand[x])
  }

  const discard = player.discard
  for (let x = 0; x < discard.length; x++) {
    cards.push(discard[x])
  }

  const rows = player.rows
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[x].length; y++) {
      cards.push(rows[x][y])
    }
  }

  const cardSelect = player.cardSelect
  for (let x = 0; x < cardSelect.length; x++) {
    cards.push(cardSelect[x])
  }

  if (player.inPlay !== null) {
    cards.push(player.inPlay)
  }

  return cards
}

export const getAllCreaturesInPlayForPlayer = (duel: DuelState, playerId: PlayerID): CardState[] => {
  const cards = []

  const player = getDuelPlayerById(duel, playerId)
  const rows = player.rows
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[x].length; y++) {
      cards.push(rows[x][y])
    }
  }

  return cards
}

export const getAllCreaturesInPlay = (duel: DuelState): CardState[] => {
  return [...getAllCreaturesInPlayForPlayer(duel, "human"), ...getAllCreaturesInPlayForPlayer(duel, "opponent")]
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

export const getDuelPlayerByCardInstanceId = (duel: DuelState, cardInstanceId: string): PlayerState => {
  return getDuelPlayerById(duel, getPlayerIdByCardInstanceId(duel, cardInstanceId))
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

export const getRandomCreatureInPlay = (duel: DuelState) => {
  const creaturesInPlay = []

  for (let x = 0; x < duel.human.rows.length; x++) {
    const row = duel.human.rows[x]
    for (let y = 0; y < row.length; y++) {
      creaturesInPlay.push(row[y])
    }
  }
  for (let x = 0; x < duel.opponent.rows.length; x++) {
    const row = duel.opponent.rows[x]
    for (let y = 0; y < row.length; y++) {
      creaturesInPlay.push(row[y])
    }
  }

  if (creaturesInPlay.length < 1) {
    return undefined
  }

  return getRandomItemFromArray(creaturesInPlay, getRandomSeed())
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
