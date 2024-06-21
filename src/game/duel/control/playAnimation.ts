import { delayMs } from "../../helpers"
import { DuelAnimation } from "../AnimationData"
import { DuelState } from "../DuelData"
import { saveDuelAndRefreshUI } from "./saveAndRerenderUI"

export const playAnimation = async (duel: DuelState, animation: DuelAnimation) => {
  duel.currentAnimation = animation
  saveDuelAndRefreshUI(duel)
  await delayMs(animation.duration)
  duel.currentAnimation = null // Clear the animation when done - Could this cause visible flashes between animations?
  return duel
}
