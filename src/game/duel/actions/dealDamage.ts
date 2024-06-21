import { DuelState, PlayerID } from "../DuelData"
import { getCardByInstanceId, getDuelPlayerById } from "../DuelHelpers"

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
