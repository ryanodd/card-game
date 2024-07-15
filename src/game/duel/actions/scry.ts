import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"
import { scryDescriptionMessage, scryTitleMessage } from "../strings"
import { drawToCardSelect } from "./drawToCardSelect"

export async function scryStart(inputDuel: DuelState, playerId: PlayerID, quantity: number, scryingCardId: string) {
  let duel = inputDuel

  const player = getDuelPlayerById(duel, playerId)
  duel = await drawToCardSelect(duel, playerId, quantity)

  duel.choice = {
    id: "CARD_SELECT",
    playerId: duel.currentPlayerId,
    triggerCardId: scryingCardId,
    title: scryTitleMessage,
    description: scryDescriptionMessage,
  }
  return duel
}

export async function scryEnd(inputDuel: DuelState, playerId: PlayerID, selectedCardIds: string[]) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)

  for (let x = player.cardSelect.length - 1; x >= 0; x--) {
    const card = player.cardSelect[x]

    player.cardSelect.splice(x, 1)
    if (selectedCardIds.includes(card.instanceId)) {
      player.deck.push(card) // end/top of deck
    } else {
      player.deck.unshift(card) // start/bottom of deck
    }
  }

  return duel
}
