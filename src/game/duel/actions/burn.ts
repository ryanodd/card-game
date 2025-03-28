import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"

export async function burn(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const card = getCardByInstanceId(duel, instanceId)
  if (card.cardType === "creature") {
    card.status = "burn"
  }
  duel = await playAnimation(duel, { id: "BURN", durationMs: 800, cardId: card.instanceId })
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

  return duel
}
