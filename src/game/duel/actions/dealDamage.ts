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

  const burnModifier = cardState.modifiers.find((modifier) => modifier.id === "burn")
  if (burnModifier !== undefined) {
    damageAmount += 1
  }
  cardState.damage += damageAmount

  return newDuel
}

export const dealDamageToPlayer = (duel: DuelState, playerID: PlayerID, damageAmount: number) => {
  let newDuel = duel
  const player = getDuelPlayerById(newDuel, playerID)
  player.health = Math.max(0, player.health - damageAmount)

  return newDuel
}
