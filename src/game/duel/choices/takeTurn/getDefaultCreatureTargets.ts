import { DuelState } from "../../DuelData"
import { getDuelPlayerById } from "../../DuelHelpers"
import { PlayerID } from "../../PlayerData"
import { Target } from "../ChoiceData"

export const getDefaultCreatureTargets = (duel: DuelState, instanceId: string) => {
  const validTargets: Target[] = []
  const playerRows = getDuelPlayerById(duel, duel.currentPlayerId).rows
  for (let x = 0; x < playerRows.length; x++) {
    const row = playerRows[x]
    for (let y = 0; y <= row.length; y++) {
      // <= , since adding a card to the n+1th index is valid
      validTargets.push({
        targetType: "rowSpace",
        playerId: duel.currentPlayerId,
        rowIndex: x,
        positionIndex: y,
      })
    }
  }
  return validTargets
}
