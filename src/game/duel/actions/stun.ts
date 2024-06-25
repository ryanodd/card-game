import { CardState, DuelState, StunModifier } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"

export async function stun(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const card = getCardByInstanceId(duel, instanceId)
  if (card.modifiers.find((modifier) => modifier.id === "stun") === undefined) {
    card.modifiers.push({
      id: "stun",
      quantity: 1,
    })
  }
  duel = await playAnimation(duel, { id: "STUN", durationMs: 800, cardId: card.instanceId })
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

  return duel
}

export const getStun = (card: CardState) => {
  return card.modifiers.find((modifier) => modifier.id === "stun") as StunModifier | undefined
}

export async function decreaseStun(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const card = getCardByInstanceId(duel, instanceId)
  const stunModifier = getStun(card)
  if (stunModifier !== undefined) {
    stunModifier.quantity -= 1
    if (stunModifier.quantity < 1) {
      card.modifiers = card.modifiers.filter((modifier) => modifier.id !== "stun")
    }
  }
  return duel
}
