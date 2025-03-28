import { CardState, DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"

export async function stun(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const card = getCardByInstanceId(duel, instanceId)
  if (card.cardType === "creature") {
    card.status = "stun"
  }
  duel = await playAnimation(duel, { id: "STUN", durationMs: 800, cardId: card.instanceId })
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

  return duel
}
