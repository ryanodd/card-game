import { cardDataMap } from "./Cards"
import { ChoiceID, DuelChoiceData } from "./Choices"
import { DuelState, EnergyCounts, PlayerID, SpaceID } from "./DuelData"
import {
  getAllCards,
  getCardByInstanceId,
  getCurrentDuelPlayer,
  getDuelPlayerById,
  getOtherPlayerId,
  getSpaceByInstanceId,
  isEnergySufficient,
} from "./DuelHelpers"
import { effectMap, heroDataMap } from "./Hero"

export type PlayerDrawNParams = {
  numberToDraw: number
  playerId: PlayerID
}

export const playerDrawN = (inputDuel: DuelState, { numberToDraw, playerId }: PlayerDrawNParams) => {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  for (let x = 0; x < numberToDraw; x++) {
    const cardDrawn = player.deck.pop()
    if (!cardDrawn) {
      throw Error("No more cards left to draw") // TODO expected codepath
    }
    player.hand.push(cardDrawn)
  }
  return duel
}

export type PlayerGainEnergyParams = {
  playerId: PlayerID
  neutral?: number
  fire?: number
  water?: number
  earth?: number
  air?: number
}

const MAX_ENERGY = 5

export const playerGainEnergy = (
  inputDuel: DuelState,
  { playerId, neutral, fire, water, earth, air }: PlayerGainEnergyParams
) => {
  let duel = inputDuel
  const player = getCurrentDuelPlayer(duel)
  player.energy.neutral = Math.min(player.energy.neutral + (neutral ?? 0), MAX_ENERGY)
  player.energy.fire = Math.min(player.energy.fire + (fire ?? 0), MAX_ENERGY)
  player.energy.water = Math.min(player.energy.water + (water ?? 0), MAX_ENERGY)
  player.energy.earth = Math.min(player.energy.earth + (earth ?? 0), MAX_ENERGY)
  player.energy.air = Math.min(player.energy.air + (air ?? 0), MAX_ENERGY)
  return duel
}

export const duelSetup = (inputDuel: DuelState) => {
  let duel = inputDuel
  duel = playerDrawN(duel, { playerId: "human", numberToDraw: 4 })
  duel = playerDrawN(duel, { playerId: "opponent", numberToDraw: 4 })

  // TODO randomize
  const humanGoesFirst = true
  if (humanGoesFirst) {
    duel.playerGoingFirst === "human"
    duel.currentPlayerId === "human"
  } else {
    duel.playerGoingFirst === "opponent"
    duel.currentPlayerId === "opponent"
  }

  duel = turnStart(duel)

  return duel
}

export const turnStart = (inputDuel: DuelState) => {
  let duel = inputDuel

  // Reset energy
  getDuelPlayerById(duel, duel.currentPlayerId).energy = {
    fire: 5,
    water: 5,
    earth: 5,
    air: 5,
    neutral: 5,
  }

  duel = playerDrawN(duel, { numberToDraw: 1, playerId: duel.currentPlayerId })

  duel.choice = { id: ChoiceID.TAKE_TURN, playerId: duel.currentPlayerId }
  return duel
}

export const endTurn = (inputDuel: DuelState) => {
  let duel = inputDuel
  duel.currentPlayerId = getOtherPlayerId(duel.currentPlayerId)
  if (duel.currentPlayerId === duel.playerGoingFirst) {
    duel.turnNumber = duel.turnNumber + 1
  }

  duel = turnStart(duel)

  return duel
}

export type PlayCardParams = {
  playerId: PlayerID
  cardId: string
  targetId: string
  energyPaid: EnergyCounts
}

export const playCardFromHand = (inputDuel: DuelState, { cardId, targetId, energyPaid }: PlayCardParams) => {
  let duel = inputDuel
  const player = getCurrentDuelPlayer(duel)
  const playedCard = player.hand.find((card) => {
    return card.instanceId === cardId
  })
  player.hand = player.hand.filter((card) => {
    return card.instanceId !== cardId
  })
  const targetSpace = player.creatureSpaces.find((space) => {
    return space.id === targetId
  })
  if (!playedCard || !targetSpace) {
    throw Error("something went wrong playing a card")
  }

  const cardCosts = cardDataMap[playedCard.name].cost
  if (!isEnergySufficient(energyPaid, cardCosts, true)) {
    throw Error("Can't afford to play this card (or paid too much)")
  }

  player.energy.neutral -= energyPaid.neutral
  player.energy.fire -= energyPaid.fire
  player.energy.water -= energyPaid.water
  player.energy.earth -= energyPaid.earth
  player.energy.air -= energyPaid.air

  targetSpace.occupant = playedCard

  return duel
}

export const removeCard = (inputDuel: DuelState, cardInstanceId: string) => {
  const duel = inputDuel
  const humanHand = duel.human.hand
  for (let x = 0; x < humanHand.length; x++) {
    if (humanHand[x].instanceId === cardInstanceId) {
      humanHand.splice(x)
    }
  }

  const humanDiscard = duel.human.discard
  for (let x = 0; x < humanDiscard.length; x++) {
    if (humanDiscard[x].instanceId === cardInstanceId) {
      humanDiscard.splice(x)
    }
  }

  const humanCreatureSpaces = duel.human.creatureSpaces
  for (let x = 0; x < humanCreatureSpaces.length; x++) {
    const space = humanCreatureSpaces[x]
    if (space.occupant?.instanceId === cardInstanceId) {
      space.occupant = null
    }
  }

  const opponentHand = duel.opponent.hand
  for (let x = 0; x < opponentHand.length; x++) {
    if (opponentHand[x].instanceId === cardInstanceId) {
      opponentHand.splice(x)
    }
  }

  const opponentDiscard = duel.opponent.discard
  for (let x = 0; x < opponentDiscard.length; x++) {
    if (opponentDiscard[x].instanceId === cardInstanceId) {
      opponentDiscard.splice(x)
    }
  }

  const opponentCreatureSpaces = duel.opponent.creatureSpaces
  for (let x = 0; x < opponentCreatureSpaces.length; x++) {
    const space = opponentCreatureSpaces[x]
    if (space.occupant?.instanceId === cardInstanceId) {
      space.occupant = null
    }
  }
}

export const dealDamage = (duel: DuelState, cardInstanceId: string, damageAmount: number) => {
  let newDuel = duel
  const cardState = getCardByInstanceId(newDuel, cardInstanceId)
  cardState.health = Math.max(0, cardState.health - damageAmount)
  return newDuel
}

export const combat = (duel: DuelState, attackingCardId: string, defendingCardId: string) => {
  let newDuel = duel

  const attackingCard = getCardByInstanceId(newDuel, attackingCardId)
  const defendingCard = getCardByInstanceId(newDuel, defendingCardId)

  newDuel = dealDamage(newDuel, defendingCardId, attackingCard.attack)
  newDuel = dealDamage(newDuel, attackingCardId, defendingCard.attack)

  if (getCardByInstanceId(newDuel, attackingCardId).health === 0) {
    removeCard(duel, attackingCardId)
  }
  if (getCardByInstanceId(newDuel, defendingCardId).health === 0) {
    removeCard(duel, defendingCardId)
  }

  return newDuel
}
