import { cardDataMap } from "./Cards"
import { Target } from "./Choices"
import { CardState, DuelState, EnergyCounts, PlayerID } from "./DuelData"
import {
  addAnimationToDuel,
  getCardByInstanceId,
  getCurrentDuelPlayer,
  getDuelPlayerById,
  getOtherPlayerId,
  getRandomInt,
  isEnergySufficient,
} from "./DuelHelpers"
import { random } from "./randomNumber"

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
  { neutral, fire, water, earth, air }: PlayerGainEnergyParams
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

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray = (array: any[]) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

export const shuffleDeck = (inputDuel: DuelState, playerId: PlayerID) => {
  let duel = inputDuel
  const deck = getDuelPlayerById(duel, playerId).deck
  shuffleArray(deck)
  return duel
}

export const duelSetup = (inputDuel: DuelState) => {
  let duel = inputDuel

  duel = shuffleDeck(duel, "human")
  duel = shuffleDeck(duel, "opponent")

  duel = playerDrawN(duel, { playerId: "human", numberToDraw: 6 })
  duel = playerDrawN(duel, { playerId: "opponent", numberToDraw: 6 })

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

export const duelTeardown = (inputDuel: DuelState) => {
  let duel = inputDuel

  return duel
}

export const turnStart = (inputDuel: DuelState) => {
  let duel = inputDuel

  // Reset energy
  const player = getDuelPlayerById(duel, duel.currentPlayerId)
  player.energy = {
    fire: player.energyIncome.fire,
    water: player.energyIncome.water,
    earth: player.energyIncome.earth,
    air: player.energyIncome.air,
    neutral: player.energyIncome.neutral,
  }
  player.playedEnergyThisTurn = false

  duel = playerDrawN(duel, { numberToDraw: 1, playerId: duel.currentPlayerId })

  duel.choice = { id: "TAKE_TURN", playerId: duel.currentPlayerId }
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
  target: Target
  energyPaid: EnergyCounts
}

export const playCardFromHand = (inputDuel: DuelState, { cardId, target, energyPaid }: PlayCardParams) => {
  let duel = inputDuel
  const player = getCurrentDuelPlayer(duel)
  const playedCard = player.hand.find((card) => {
    return card.instanceId === cardId
  })
  if (!playedCard) {
    throw Error("something went wrong playing a card")
  }
  if (!isEnergySufficient(energyPaid, playedCard.cost, true)) {
    throw Error("Can't afford to play this card (or paid too much)")
  }

  // Remove from hand
  player.hand = player.hand.filter((card) => {
    return card.instanceId !== cardId
  })

  // Pay energy
  player.energy.neutral -= energyPaid.neutral
  player.energy.fire -= energyPaid.fire
  player.energy.water -= energyPaid.water
  player.energy.earth -= energyPaid.earth
  player.energy.air -= energyPaid.air

  const cardData = cardDataMap[playedCard.name]
  if (cardData.effects?.play) {
    duel = cardData.effects.play(duel, duel.currentPlayerId, playedCard.instanceId, target)
  }

  // Put creature in space
  if (playedCard.cardType === "creature" && target.targetType === "rowSpace") {
    const row = player.rows[target.rowIndex]

    row.splice(target.positionIndex, 0, playedCard)

    if (cardData.effects?.summon) {
      duel = cardData.effects.summon(duel, duel.currentPlayerId, playedCard.instanceId)
    }
  }

  if (playedCard.cardType === "energy" && target.targetType === "playArea") {
    player.playedEnergyThisTurn = true
  }

  return duel
}

export const removeCard = (inputDuel: DuelState, cardInstanceId: string) => {
  const duel = inputDuel
  const humanHand = duel.human.hand
  for (let x = 0; x < humanHand.length; x++) {
    if (humanHand[x].instanceId === cardInstanceId) {
      humanHand.splice(x, 1)
    }
  }

  const humanDiscard = duel.human.discard
  for (let x = 0; x < humanDiscard.length; x++) {
    if (humanDiscard[x].instanceId === cardInstanceId) {
      humanDiscard.splice(x, 1)
    }
  }

  const humanRows = duel.human.rows
  for (let x = 0; x < humanRows.length; x++) {
    const row = humanRows[x]
    for (let y = 0; y < row.length; y++) {
      if (row[y].instanceId === cardInstanceId) {
        row.splice(y, 1)
      }
    }
  }

  const opponentHand = duel.opponent.hand
  for (let x = 0; x < opponentHand.length; x++) {
    if (opponentHand[x].instanceId === cardInstanceId) {
      opponentHand.splice(x, 1)
    }
  }

  const opponentDiscard = duel.opponent.discard
  for (let x = 0; x < opponentDiscard.length; x++) {
    if (opponentDiscard[x].instanceId === cardInstanceId) {
      opponentDiscard.splice(x, 1)
    }
  }

  const opponentRows = duel.opponent.rows
  for (let x = 0; x < opponentRows.length; x++) {
    const row = opponentRows[x]
    for (let y = 0; y < row.length; y++) {
      if (row[y].instanceId === cardInstanceId) {
        row.splice(y, 1)
      }
    }
  }

  return duel
}

export const dealDamageToCreature = (duel: DuelState, cardInstanceId: string, damageAmount: number) => {
  let newDuel = duel
  const cardState = getCardByInstanceId(newDuel, cardInstanceId)
  cardState.health = Math.max(0, (cardState.health ?? 0) - damageAmount)
  return newDuel
}

export const dealDamageToPlayer = (duel: DuelState, playerID: PlayerID, damageAmount: number) => {
  let newDuel = duel
  const player = getDuelPlayerById(newDuel, playerID)
  player.health = Math.max(0, player.health - damageAmount)

  return newDuel
}

export const combat = (inputDuel: DuelState) => {
  let duel = inputDuel

  for (let x = 0; x < duel.human.rows.length; x++) {
    duel = addAnimationToDuel(duel, {
      id: "ATTACK_START",
      duration: 200,
      rowIndex: x,
    })
    const humanAttackingCard = duel.human.rows[x][0]
    const opponentAttackingCard = duel.opponent.rows[x][0]

    //Trade
    if (humanAttackingCard !== undefined && opponentAttackingCard !== undefined) {
      duel = creaturesTrade(duel, humanAttackingCard.instanceId, opponentAttackingCard.instanceId)
    }
    // Human damage to Opponent face
    else if (
      humanAttackingCard !== undefined &&
      humanAttackingCard.cardType === "creature" &&
      humanAttackingCard.attack !== undefined &&
      opponentAttackingCard === undefined
    ) {
      dealDamageToPlayer(duel, "opponent", humanAttackingCard.attack)
    }
    // Opponent damage to Human face
    else if (
      opponentAttackingCard !== undefined &&
      opponentAttackingCard.cardType === "creature" &&
      opponentAttackingCard.attack !== undefined &&
      humanAttackingCard === undefined
    ) {
      dealDamageToPlayer(duel, "human", opponentAttackingCard.attack)
    }
    //Trigger effects of attacking cards
    const humanAfterAttackEffect = cardDataMap[humanAttackingCard?.name ?? ""]?.effects?.afterAttack
    if (humanAttackingCard && humanAfterAttackEffect !== undefined) {
      duel = humanAfterAttackEffect(duel, "human", humanAttackingCard.instanceId)
    }
    const opponentAfterAttackEffect = cardDataMap[opponentAttackingCard?.name ?? ""]?.effects?.afterAttack
    if (opponentAttackingCard && opponentAfterAttackEffect !== undefined) {
      duel = opponentAfterAttackEffect(duel, "opponent", opponentAttackingCard.instanceId)
    }

    duel = addAnimationToDuel(duel, {
      id: "ATTACK_END",
      duration: 200,
      rowIndex: x,
    })

    // Check for death & remove cards
    if (humanAttackingCard && getCardByInstanceId(duel, humanAttackingCard.instanceId).health === 0) {
      removeCard(duel, humanAttackingCard.instanceId)
    }
    if (opponentAttackingCard && getCardByInstanceId(duel, opponentAttackingCard.instanceId).health === 0) {
      removeCard(duel, opponentAttackingCard.instanceId)
    }
  }

  return duel
}

export const creaturesTrade = (duel: DuelState, attackingCardId: string, defendingCardId: string) => {
  let newDuel = duel

  const attackingCard = getCardByInstanceId(newDuel, attackingCardId)
  const defendingCard = getCardByInstanceId(newDuel, defendingCardId)

  if (
    attackingCard?.cardType !== "creature" ||
    defendingCard?.cardType !== "creature" ||
    attackingCard?.attack === undefined ||
    defendingCard?.attack === undefined
  ) {
    throw Error("Tried to engage in combat with non-creature")
  }

  newDuel = dealDamageToCreature(newDuel, defendingCardId, attackingCard.attack)
  newDuel = dealDamageToCreature(newDuel, attackingCardId, defendingCard.attack)

  return newDuel
}
