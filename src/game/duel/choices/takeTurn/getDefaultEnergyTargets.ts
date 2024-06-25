import { DuelState } from "../../DuelData"
import { getDuelPlayerById } from "../../DuelHelpers"
import { PlayerID } from "../../PlayerData"
import { Target } from "../ChoiceData"

export const getDefaultEnergyTargets = (duel: DuelState, playerId: PlayerID, instanceId: string): Target[] => {
  if (getDuelPlayerById(duel, playerId).playedEnergyThisTurn) {
    return []
  }
  return [{ targetType: "playArea" }]
}
