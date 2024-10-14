import { DuelState } from "../../DuelData"
import { getDuelPlayerById, getPlayerIdByCardInstanceId } from "../../DuelHelpers"
import { PlayerID } from "../../PlayerData"
import { Target } from "../ChoiceData"

export const getDefaultEnergyTargets = (duel: DuelState, instanceId: string): Target[] => {
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
  if (getDuelPlayerById(duel, playerId).playedEnergyThisTurn) {
    return []
  }
  return [{ targetType: "playArea" }]
}
