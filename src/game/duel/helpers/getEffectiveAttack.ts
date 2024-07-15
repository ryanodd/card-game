import { CardState } from "../DuelData"

export const getEffectiveAttack = (cardState: CardState) => {
  if (cardState.cardType !== "creature") {
    return 0
  }

  let modifierAttack = 0
  for (let x = 0; x < cardState.modifiers.length; x++) {
    const modifier = cardState.modifiers[x]
    if (modifier.id === "attackChange") {
      modifierAttack += modifier.quantity
    }
  }
  return cardState.attack + modifierAttack
}
