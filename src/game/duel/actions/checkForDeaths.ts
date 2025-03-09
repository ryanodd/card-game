import { DuelState } from "../DuelData"
import { getAllCards } from "../DuelHelpers"
import { playAnimation } from "../control/playAnimation"
import { getEffectiveHealth } from "../helpers/getEffectiveHealth"
import { destroyCard } from "./destroyCard"

export async function checkForDeaths(inputDuel: DuelState) {
  let duel = inputDuel

  const cards = getAllCards(duel)
  const cardsToDestroy = []
  for (let x = 0; x < cards.length; x++) {
    const card = cards[x]

    if (card.cardType === "creature" && card.damage >= getEffectiveHealth(card)) {
      cardsToDestroy.push(card.instanceId)
    }
  }

  if (cardsToDestroy.length > 0) {
    duel = await playAnimation(duel, { id: "DESTROY_START", durationMs: 400, cardIds: cardsToDestroy })

    for (let x = 0; x < cardsToDestroy.length; x++) {
      duel = await destroyCard(duel, cardsToDestroy[x])
    }

    duel = await playAnimation(duel, { id: "DESTROY_END", durationMs: 200, cardIds: cardsToDestroy })
  }

  return duel
}
