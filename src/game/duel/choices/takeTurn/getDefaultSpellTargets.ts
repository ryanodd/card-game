import { DuelState } from "../../DuelData"
import { getDuelPlayerById } from "../../DuelHelpers"
import { PlayerID } from "../../PlayerData"
import { Target } from "../ChoiceData"

export const getDefaultSpellTargets = (duel: DuelState, playerId: PlayerID, instanceId: string): Target[] => {
  return [{ targetType: "playArea" }]
}

export const getDefaultPlayerRowSpellTargets = (duel: DuelState, playerId: PlayerID, instanceId: string): Target[] => {
  const targets: Target[] = []
  for (let x = 0; x < duel.human.rows.length; x++) {
    targets.push({ targetType: "playerRow", playerId: "human", rowIndex: x })
    targets.push({ targetType: "playerRow", playerId: "opponent", rowIndex: x })
  }

  return targets
}

export const getDefaultHumanRowSpellTargets = (duel: DuelState, playerId: PlayerID, instanceId: string): Target[] => {
  const targets: Target[] = []
  for (let x = 0; x < duel.human.rows.length; x++) {
    targets.push({ targetType: "playerRow", playerId: "human", rowIndex: x })
  }

  return targets
}

export const getDefaultOpponentRowSpellTargets = (
  duel: DuelState,
  playerId: PlayerID,
  instanceId: string
): Target[] => {
  const targets: Target[] = []
  for (let x = 0; x < duel.opponent.rows.length; x++) {
    targets.push({ targetType: "playerRow", playerId: "opponent", rowIndex: x })
  }

  return targets
}
