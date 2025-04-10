import { getRandomInt, getRandomSeed } from "@/src/utils/randomNumber"
import { DuelState } from "../DuelData"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"

export async function roll(
  duel: DuelState,
  instanceId: string,
  percentThreshold: number,
  onSuccess: () => Promise<DuelState>
) {
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < percentThreshold) {
    duel = await onSuccess()
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}
