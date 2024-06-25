import { DuelState } from "../DuelData"
import { getCardByInstanceId, getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

export async function dealDamageToCreature(duel: DuelState, cardInstanceId: string, inputDamageAmount: number) {
  let newDuel = duel
  let damageAmount = inputDamageAmount
  const cardState = getCardByInstanceId(newDuel, cardInstanceId)

  const burnModifier = cardState.modifiers.find((modifier) => modifier.id === "burn")
  if (burnModifier !== undefined) {
    damageAmount += 1
  }
  cardState.health = Math.max(0, (cardState.health ?? 0) - damageAmount)
  return newDuel
}

export const dealDamageToPlayer = (duel: DuelState, playerID: PlayerID, damageAmount: number) => {
  let newDuel = duel
  const player = getDuelPlayerById(newDuel, playerID)
  player.health = Math.max(0, player.health - damageAmount)

  return newDuel
}
