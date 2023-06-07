import { CardState, DuelState, EnergyCounts, PlayerID, SpaceID, SpaceState } from "./DuelData"

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max)
}

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

  const humanCreatureSpaces = duel.human.creatureSpaces
  for (let x = 0; x < humanCreatureSpaces.length; x++) {
    const space = humanCreatureSpaces[x]
    if (space.occupant !== null) {
      cards.push(space.occupant)
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

  const opponentCreatureSpaces = duel.opponent.creatureSpaces
  for (let x = 0; x < opponentCreatureSpaces.length; x++) {
    const space = opponentCreatureSpaces[x]
    if (space.occupant !== null) {
      cards.push(space.occupant)
    }
  }
  return cards
}

export const getAllSpaces = (duel: DuelState): SpaceState[] => {
  const humanCreatureSpaces = duel.human.creatureSpaces
  const opponentCreatureSpaces = duel.opponent.creatureSpaces
  return [...humanCreatureSpaces, ...opponentCreatureSpaces]
}

export const getCardById = (duel: DuelState, cardId: string): CardState => {
  const card = getAllCards(duel).find((card) => {
    return card.id === cardId
  })

  if (card === undefined) {
    throw new Error("card not found :(")
  }
  return card
}

export const getSpaceById = (duel: DuelState, spaceId: string): SpaceState => {
  const space = getAllSpaces(duel).find((space) => {
    return space.id === spaceId
  })
  if (space === undefined) {
    throw new Error("space not found :(")
  }
  return space
}

export const getOccupantIdBySpaceId = (duel: DuelState, spaceId: string): string => {
  const occupant = getSpaceById(duel, spaceId).occupant
  if (occupant === null) {
    throw Error(`occupant not found for space ${getSpaceById(duel, spaceId).index}`)
  }
  return occupant.id
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
    return remainingEnergyForNeutral === cost.neutral
  } else {
    const canAffordNeutral = remainingEnergyForNeutral >= cost.neutral
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