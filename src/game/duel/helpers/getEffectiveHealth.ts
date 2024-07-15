import { CardState } from "../DuelData"

export const getEffectiveHealth = (cardState: CardState) => {
  if (cardState.cardType !== "creature") {
    return 0
  }

  let modifierHealth = 0
  for (let x = 0; x < cardState.modifiers.length; x++) {
    const modifier = cardState.modifiers[x]
    if (modifier.id === "healthChange") {
      modifierHealth += modifier.quantity
    }
  }
  return cardState.health + modifierHealth
}
