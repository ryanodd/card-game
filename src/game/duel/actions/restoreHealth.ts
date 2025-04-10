import { cardDataMap } from "../../cards/allCards/allCards"
import { STARTING_HEALTH } from "../createNewDuel"
import { DuelState } from "../DuelData"
import { getCardByInstanceId, getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

export async function restoreHealthToCreature(duel: DuelState, cardInstanceId: string, inputHealthAmount: number) {
  let newDuel = duel
  let healthAmount = inputHealthAmount
  const cardState = getCardByInstanceId(newDuel, cardInstanceId)
  if (cardState.cardType !== "creature") {
    throw Error(`Tried to heal to non-creature ${cardState.name}`)
  }

  cardState.damage = Math.max(0, cardState.damage - healthAmount)

  return newDuel
}
