import { DuelState } from "../../DuelData"
import { getCardByInstanceId, isEnergySufficient } from "../../DuelHelpers"
import { EnergyCounts } from "../../EnergyData"
import { cardBehaviourMap } from "../../cardBehaviour/AllCardBehaviours"
import { Target } from "../ChoiceData"

export const takeTurn_getValidTargetsForCard = (
  duel: DuelState,
  cardIdToPlay: string,
  energyToPay?: EnergyCounts
): Target[] => {
  if (energyToPay && !isEnergySufficient(energyToPay, getCardByInstanceId(duel, cardIdToPlay).cost, true)) {
    return []
  }

  const card = getCardByInstanceId(duel, cardIdToPlay)
  const cardData = cardBehaviourMap[card.name]
  const validTargets = cardData.getValidTargets(duel, cardIdToPlay)

  return validTargets
}
