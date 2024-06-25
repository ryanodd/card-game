import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { cardBehaviourMap } from "../cardBehaviour/AllCardBehaviours"
import { dealDamageToCreature } from "./dealDamage"
import { performTrampleDamage } from "./performTrampleDamage"

// Creatures ass part of the combat phase.
// In this function, the fact that we call them attacking & defending card is lolz. They're the same really
export async function creaturesTrade(inputDuel: DuelState, attackingCardId: string, defendingCardId: string) {
  let duel = inputDuel

  const attackingCard = getCardByInstanceId(duel, attackingCardId)
  const defendingCard = getCardByInstanceId(duel, defendingCardId)

  const attackingCardStunned = attackingCard.modifiers.find((modifier) => modifier.id === "stun") !== undefined
  const defendingCardStunned = defendingCard.modifiers.find((modifier) => modifier.id === "stun") !== undefined

  if (
    attackingCard?.cardType !== "creature" ||
    defendingCard?.cardType !== "creature" ||
    attackingCard?.attack === undefined ||
    defendingCard?.attack === undefined
  ) {
    throw Error("Tried to engage in combat with non-creature")
  }

  if (!attackingCardStunned) {
    if (cardBehaviourMap[attackingCard.name].keywords?.trample) {
      duel = await performTrampleDamage(duel, attackingCard)
    } else {
      duel = await dealDamageToCreature(duel, defendingCardId, attackingCard.attack)
    }
  }
  if (!defendingCardStunned) {
    if (cardBehaviourMap[defendingCard.name].keywords?.trample) {
      duel = await performTrampleDamage(duel, attackingCard)
    } else {
      duel = await dealDamageToCreature(duel, attackingCardId, defendingCard.attack)
    }
  }

  return duel
}
