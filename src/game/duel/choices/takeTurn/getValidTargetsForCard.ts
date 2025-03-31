import { cardBehaviourMap } from "../../cardBehaviour/allCardBehaviour/allCardBehaviours"
import { DuelState } from "../../DuelData"
import { getCardByInstanceId } from "../../DuelHelpers"
import { isEnergySufficient } from "../../energy/isEnergySufficient"
import { EnergyCounts } from "../../EnergyData"
import { Target } from "../ChoiceData"

export const takeTurn_getValidTargetsForCard = (
  duel: DuelState,
  cardIdToPlay: string,
  energyToPay?: EnergyCounts
): Target[] => {
  if (energyToPay && !isEnergySufficient(energyToPay, getCardByInstanceId(duel, cardIdToPlay).cost)) {
    return []
  }

  const card = getCardByInstanceId(duel, cardIdToPlay)
  const cardData = cardBehaviourMap[card.name]
  const validTargets = cardData.getValidTargets(duel, cardIdToPlay)

  return validTargets
}
