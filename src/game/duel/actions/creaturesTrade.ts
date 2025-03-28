import { cardBehaviourMap } from "../cardBehaviour/allCardBehaviour/allCardBehaviours"
import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { getEffectiveAttack } from "../helpers/getEffectiveAttack"
import { dealDamageToCreature } from "./dealDamage"
import { performTrampleDamage } from "./performTrampleDamage"

// Creatures ass part of the combat phase.
// In this function, the fact that we call them attacking & defending card is lolz. They're the same really
export async function creaturesTrade(inputDuel: DuelState, attackingCardId: string, defendingCardId: string) {
  let duel = inputDuel

  const attackingCard = getCardByInstanceId(duel, attackingCardId)
  const defendingCard = getCardByInstanceId(duel, defendingCardId)

  if (attackingCard?.cardType !== "creature" || defendingCard?.cardType !== "creature") {
    throw Error("Tried to engage in combat with non-creature")
  }

  let attackingDamageAmount: number | "miss" = getEffectiveAttack(attackingCard)
  attackingDamageAmount =
    cardBehaviourMap[attackingCard.name].effects?.attackModifier?.(
      duel,
      attackingCard.instanceId,
      attackingCard.attack
    ) ?? attackingDamageAmount
  attackingDamageAmount =
    cardBehaviourMap[defendingCard.name].effects?.opposingAttackModifier?.(
      duel,
      attackingCard.instanceId,
      defendingCard.attack
    ) ?? attackingDamageAmount

  let defendingDamageAmount: number | "miss" = getEffectiveAttack(defendingCard)
  defendingDamageAmount =
    cardBehaviourMap[defendingCard.name].effects?.attackModifier?.(
      duel,
      defendingCard.instanceId,
      defendingCard.attack
    ) ?? defendingDamageAmount
  defendingDamageAmount =
    cardBehaviourMap[attackingCard.name].effects?.opposingAttackModifier?.(
      duel,
      attackingCard.instanceId,
      defendingCard.attack
    ) ?? defendingDamageAmount

  if (attackingDamageAmount !== "miss") {
    if (cardBehaviourMap[attackingCard.name].keywords?.trample) {
      duel = await performTrampleDamage(duel, attackingCard)
    } else {
      duel = await dealDamageToCreature(duel, defendingCardId, attackingDamageAmount)
    }
  }
  if (defendingDamageAmount !== "miss") {
    if (cardBehaviourMap[defendingCard.name].keywords?.trample) {
      duel = await performTrampleDamage(duel, attackingCard)
    } else {
      duel = await dealDamageToCreature(duel, attackingCardId, defendingDamageAmount)
    }
  }

  return duel
}
