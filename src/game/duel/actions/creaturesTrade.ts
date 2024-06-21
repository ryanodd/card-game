import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { dealDamageToCreature } from "./dealDamage"

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
