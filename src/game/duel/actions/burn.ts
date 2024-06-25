import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"

export async function burn(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const card = getCardByInstanceId(duel, instanceId)
  if (card.modifiers.find((modifier) => modifier.id === "burn") === undefined) {
    card.modifiers.push({
      id: "burn",
      quantity: 1,
    })
  }
  duel = await playAnimation(duel, { id: "BURN", durationMs: 800, cardId: card.instanceId })
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

  return duel
}
