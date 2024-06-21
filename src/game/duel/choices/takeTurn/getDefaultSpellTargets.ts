import { DuelState, PlayerID } from "../../DuelData"
import { getDuelPlayerById } from "../../DuelHelpers"
import { Target } from "../ChoiceData"

export const getDefaultSpellTargets = (duel: DuelState, playerId: PlayerID, instanceId: string): Target[] => {
  return [{ targetType: "playArea" }]
}