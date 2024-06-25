import { CardState, DuelState } from "../DuelData"
import { getOpposingRowByCardId, getOtherPlayerId, getPlayerIdByCardInstanceId } from "../DuelHelpers"
import { dealDamageToCreature, dealDamageToPlayer } from "./dealDamage"

// This includes the original damage too. Not just the extra trample damage
export async function performTrampleDamage(inputDuel: DuelState, attackingCard: CardState) {
  let duel = inputDuel

  const opposingRow = getOpposingRowByCardId(duel, attackingCard.instanceId)
  if (opposingRow === undefined) {
    throw Error(`Trample Damage: no opposing row found for attacking card ${attackingCard.name}`)
  }

  let remainingDamage = attackingCard.attack ?? 0
  let opposingCreatureIndex = 0

  while (remainingDamage > 0) {
    const nextCreature = opposingRow[opposingCreatureIndex]
    if (nextCreature !== undefined) {
      const nextRemainingDamage = nextCreature.health ?? 0
      duel = await dealDamageToCreature(duel, nextCreature.instanceId, remainingDamage)
      remainingDamage -= nextRemainingDamage
      opposingCreatureIndex++
    } else {
      const opposingPlayerId = getOtherPlayerId(getPlayerIdByCardInstanceId(duel, attackingCard.instanceId))
      dealDamageToPlayer(duel, opposingPlayerId, remainingDamage)
      break
    }
  }
  return duel
}
