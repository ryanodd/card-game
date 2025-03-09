import { getRandomInt, getRandomItemFromArray, getRandomSeed } from "@/src/utils/randomNumber"
import {
  autoPayElements,
  getEnergyButtonsForPlayer,
  getEnergyCountsFromSelected,
} from "../../react/hooks/useDuelUIStore"
import { DuelState } from "./DuelData"
import { getCardByInstanceId, getCurrentDuelPlayer } from "./DuelHelpers"
import { takeTurn_executeAdvance } from "./choices/takeTurn/executeAdvance"
import { takeTurn_executePlayCard } from "./choices/takeTurn/executePlayCard"
import { takeTurn_getValidTargetsForCard } from "./choices/takeTurn/getValidTargetsForCard"
import { cardSelect_execute } from "./choices/cardSelect"
import { mulligan_execute } from "./choices/mulligan"
import { EnergyCounts } from "./EnergyData"
import { cardDataMap } from "../cards/AllCards"
import { takeTurn_getPlayableHandCardIds } from "./choices/takeTurn/getPlayableHandCardIds"

export async function executeChoiceForOpponent(inputDuel: DuelState): Promise<DuelState> {
  let duel = inputDuel
  // TODO verify somehow that it's not the human's choice to make
  const choiceId = duel.choice.id
  if (choiceId === "TAKE_TURN") {
    duel = await opponentTakeTurn(duel)
    return duel
  }
  if (choiceId === "MULLIGAN") {
    duel = await opponentMulligan(duel)
    return duel
  }
  if (choiceId === "CARD_SELECT") {
    duel = await opponentCardSelect(duel)
    return duel
  }
  throw Error("No choice for the opponent to make")
}

export async function opponentTakeTurn(inputDuel: DuelState) {
  let duel = inputDuel

  const playableCardIds = takeTurn_getPlayableHandCardIds(duel)
  if (playableCardIds.length === 0) {
    duel = await takeTurn_executeAdvance(duel)
    return duel
  }

  // Select which card to play
  const cardIdToPlay = getRandomItemFromArray(playableCardIds, getRandomSeed())

  if (cardIdToPlay === undefined) {
    throw Error("No cards to play, somehow.")
  }

  // Select where to play card
  const emptyEnergySelected = getEnergyButtonsForPlayer(getCurrentDuelPlayer(duel))
  const elementsToPay = getEnergyCountsFromSelected(autoPayElements(duel, cardIdToPlay, emptyEnergySelected))
  const targets = takeTurn_getValidTargetsForCard(duel, cardIdToPlay, elementsToPay)
  const targetToPlay = targets[getRandomInt(targets.length, getRandomSeed())]

  duel = await takeTurn_executePlayCard(duel, { cardIdToPlay, target: targetToPlay, energyPaid: elementsToPay })

  return duel
}

export async function opponentCardSelect(inputDuel: DuelState) {
  let duel = inputDuel
  duel = await cardSelect_execute(duel, [])
  return duel
}

export async function opponentMulligan(inputDuel: DuelState) {
  let duel = inputDuel

  const cards = getCurrentDuelPlayer(duel).cardSelect
  const picks = []

  let numCardsToThrowAway = getRandomInt(cards.length, getRandomSeed())

  for (let x = 0; x < cards.length; x++) {
    const card = cards[x]
    if (numCardsToThrowAway > 0) {
      picks.push(card.instanceId)
      numCardsToThrowAway -= 1
    }
  }

  duel = await mulligan_execute(duel, picks)

  return duel
}
