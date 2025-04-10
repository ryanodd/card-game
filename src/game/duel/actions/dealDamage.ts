import { cardDataMap } from "../../cards/allCards/allCards"
import { DuelState } from "../DuelData"
import { getCardByInstanceId, getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

export async function dealDamageToCreature(duel: DuelState, cardInstanceId: string, inputDamageAmount: number) {
  let newDuel = duel
  let damageAmount = inputDamageAmount
  const cardState = getCardByInstanceId(newDuel, cardInstanceId)
  if (cardState.cardType !== "creature") {
    throw Error(`Tried to deal damage to non-creature ${cardState.name}`)
  }

  if (cardState.shield) {
    cardState.shield = false
    return newDuel
  }

  const burned = cardState.status === "burn"
  if (burned) {
    damageAmount += 1
  }
  cardState.damage += damageAmount

  return newDuel
}
