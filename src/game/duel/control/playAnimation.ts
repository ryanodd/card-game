import { useGameStore } from "@/src/react/hooks/useGameStore"
import { DuelAnimation } from "../AnimationData"
import { DuelState } from "../DuelData"
import { saveDuelAndRefreshUI } from "./saveAndRerenderUI"
import { delayMs } from "../../helpers"

// After most animations, some endlag so stuff isn't happening so fast
export const BUFFER_MS = 800

export const playAnimation = async (duel: DuelState, animation: DuelAnimation) => {
  const game = useGameStore.getState().game
  const debugAnimationMultiplier = game.settings.debug.enabled ? game.settings.debug.animationMultiplier : 1
  const msToDelay = animation.durationMs * debugAnimationMultiplier

  duel.currentAnimation = { ...animation, durationMs: msToDelay }
  saveDuelAndRefreshUI(duel)

  await delayMs(msToDelay)

  duel.currentAnimation = null // Clear the animation when done - Could this cause visible flashes between animations?

  if (animation.endLag === true) {
    await delayMs(BUFFER_MS)
  }
  return duel
}
