import { DuelState } from "../DuelData"
import { getAllCreaturesInPlayForPlayer } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

export async function resetSummoningSickness(duel: DuelState, playerId: PlayerID) {
  const allCreaturesInPlayForPlayer = getAllCreaturesInPlayForPlayer(duel, playerId)
  for (let x = 0; x < allCreaturesInPlayForPlayer.length; x++) {
    const card = allCreaturesInPlayForPlayer[x]
    if (card.cardType === "creature") {
      card.summoningSickness = false
    }
  }
  return duel
}
