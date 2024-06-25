import { DuelState } from "../../DuelData"
import { EnergyCounts } from "../../EnergyData"
import { playCardFromHand } from "../../actions/playCard"
import { Target } from "../ChoiceData"

export async function takeTurn_executePlayCard(
  duel: DuelState,
  params: {
    cardIdToPlay: string
    target: Target
    energyPaid: EnergyCounts
  }
) {
  duel = await playCardFromHand(duel, {
    playerId: duel.currentPlayerId,
    cardId: params.cardIdToPlay,
    target: params.target,
    energyPaid: params.energyPaid,
  })
  return duel
}
