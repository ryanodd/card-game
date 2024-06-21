import { DuelState, PlayerID } from "../../DuelData"
import { getDuelPlayerById } from "../../DuelHelpers"
import { Target } from "../ChoiceData"

export const getDefaultEnergyTargets = (duel: DuelState, playerId: PlayerID, instanceId: string): Target[] => {
  if (getDuelPlayerById(duel, playerId).playedEnergyThisTurn) {
    return []
  }
  return [{ targetType: "playArea" }]
}
