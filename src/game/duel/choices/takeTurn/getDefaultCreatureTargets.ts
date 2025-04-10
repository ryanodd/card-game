import { DuelState } from "../../DuelData"
import { getDuelPlayerById } from "../../DuelHelpers"
import { PlayerID } from "../../PlayerData"
import { Target } from "../ChoiceData"

export const getDefaultCreatureTargets = (duel: DuelState, instanceId: string) => {
  const validTargets: Target[] = []
  const player = getDuelPlayerById(duel, duel.currentPlayerId)

  // <= , since adding a card to the n+1th index is valid
  for (let x = 0; x <= player.row.length; x++) {
    validTargets.push({
      targetType: "rowSpace",
      playerId: duel.currentPlayerId,
      positionIndex: x,
    })
  }
  return validTargets
}
