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

  for (let x = 0; x < player.row.length; x++) {
    cards.push(player.row[x])
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
  for (let x = 0; x < player.row.length; x++) {
    cards.push(player.row[x])
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

export const getPlayerRowByCardInstanceId = (duel: DuelState, cardInstanceId: string) => {
  for (let x = 0; x < duel.human.row.length; x++) {
    if (duel.human.row[x].instanceId === cardInstanceId) {
      return duel.human.row
    }
  }

  for (let x = 0; x < duel.opponent.row.length; x++) {
    if (duel.opponent.row[x].instanceId === cardInstanceId) {
      return duel.opponent.row
    }
  }

  return undefined
}

export const getPlayerByCardInstanceId = (duel: DuelState, cardInstanceId: string): PlayerState => {
  const humanCards = getAllCardsForPlayer(duel, "human")
  if (humanCards.find((cardState) => cardState.instanceId === cardInstanceId) !== undefined) {
    return duel.human
  }
  const opponentCards = getAllCardsForPlayer(duel, "opponent")
  if (opponentCards.find((cardState) => cardState.instanceId === cardInstanceId) !== undefined) {
    return duel.opponent
  }
  throw Error(`card ${getCardByInstanceId(duel, cardInstanceId).name} belongs to neither human nor opponent`)
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
  if (otherPlayer.row.length >= 1) {
    return otherPlayer.row[0]
  }
  return undefined
}

export const getRandomCreatureInPlay = (duel: DuelState) => {
  const creaturesInPlay = getAllCreaturesInPlay(duel)

  if (creaturesInPlay.length < 1) {
    return undefined
  }

  return getRandomItemFromArray(creaturesInPlay, getRandomSeed())
}

export const getRandomCreatureInPlayForPlayer = (duel: DuelState, playerId: PlayerID) => {
  const cardsInPlayForPlayer = []
  const player = getDuelPlayerById(duel, playerId)

  for (let x = 0; x < player.row.length; x++) {
    cardsInPlayForPlayer.push(player.row[x])
  }

  if (cardsInPlayForPlayer.length < 1) {
    return undefined
  }

  return getRandomItemFromArray(cardsInPlayForPlayer, getRandomSeed())
}

export const getOpposingRowByCardId = (duel: DuelState, cardId: string) => {
  const playerId = getPlayerIdByCardInstanceId(duel, cardId)
  const opposingPlayer = getOtherPlayerByPlayerId(duel, playerId)
  const opposingRow = opposingPlayer.row
  return opposingRow
}

export const isDuelCardInHand = (duel: DuelState, cardId: string) => {
  if (
    duel.human.hand.find((card) => {
      return card.instanceId === cardId
    })
  ) {
    return true
  }
  if (
    duel.opponent.hand.find((card) => {
      return card.instanceId === cardId
    })
  ) {
    return true
  }
  return false
}
