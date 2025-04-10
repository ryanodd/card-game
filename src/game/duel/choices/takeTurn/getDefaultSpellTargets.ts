import { DuelState } from "../../DuelData"
import { getDuelPlayerById } from "../../DuelHelpers"
import { PlayerID } from "../../PlayerData"
import { Target } from "../ChoiceData"

export const getDefaultSpellTargets = (duel: DuelState, instanceId: string): Target[] => {
  return [{ targetType: "playArea" }]
}

export const getDefaultPlayerSpellTargets = (duel: DuelState, instanceId: string): Target[] => {
  const targets: Target[] = []
  targets.push({ targetType: "player", playerId: "human" })
  targets.push({ targetType: "player", playerId: "opponent" })

  return targets
}

export const getDefaultHumanOnlySpellTargets = (duel: DuelState, playerId: PlayerID, instanceId: string): Target[] => {
  const targets: Target[] = []
  targets.push({ targetType: "player", playerId: "human" })
  return targets
}

export const getDefaultOpponentOnlySpellTargets = (
  duel: DuelState,
  playerId: PlayerID,
  instanceId: string
): Target[] => {
  const targets: Target[] = []
  targets.push({ targetType: "player", playerId: "human" })
  return targets
}
