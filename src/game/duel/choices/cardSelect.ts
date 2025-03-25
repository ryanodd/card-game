import { cardBehaviourMap } from "../cardBehaviour/allCardBehaviour/allCardBehaviours"
import { DuelState } from "../DuelData"
import { getCardByInstanceId } from "../DuelHelpers"

export async function cardSelect_execute(inputDuel: DuelState, selectedCardIds: string[]) {
  let duel = inputDuel

  if (duel.choice.id !== "CARD_SELECT") {
    throw Error("Tried to scry when it wasn't time to scry")
  }
  const playerId = duel.choice.playerId

  // Maybe eventually if more than just cards can trigger these effects,
  // this could be more general & not assume a card effect will carry this game on

  const triggerCard = getCardByInstanceId(duel, duel.choice.triggerCardId)
  const selectCardsEffect = cardBehaviourMap[triggerCard.name].effects?.selectCards

  if (selectCardsEffect === undefined) {
    throw Error("The card that triggered this selectCard phase could be found to continue the duel.")
  }

  duel = await selectCardsEffect(duel, playerId, selectedCardIds)
  return duel
}
