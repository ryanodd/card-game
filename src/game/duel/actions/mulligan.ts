import { DuelState } from "../DuelData"
import { getDuelPlayerById, getOtherPlayerId } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"
import { drawToHand } from "./drawToHand"
import { shuffleDeck } from "./shuffleDeck"
import { startMulligan } from "./startMulligan"
import { turnStart } from "./turnStart"

export async function mulligan(inputDuel: DuelState, playerId: PlayerID, selectedCardIds: string[]) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  const playerHandBeforeMulligan = player.cardSelect

  for (let x = playerHandBeforeMulligan.length - 1; x >= 0; x--) {
    const card = playerHandBeforeMulligan[x]
    // put back into deck
    if (selectedCardIds.includes(card.instanceId)) {
      playerHandBeforeMulligan.splice(x, 1)
      player.deck.push(card)
    }
  }

  // Put rest into hand
  for (let x = playerHandBeforeMulligan.length - 1; x >= 0; x--) {
    const card = playerHandBeforeMulligan[x]
    playerHandBeforeMulligan.splice(x, 1)
    player.hand.push(card)
  }

  // Shuffle & Draw the rest
  duel = await shuffleDeck(duel, playerId)

  // Continue duel: next mulligan or duel start
  if (duel.currentPlayerId === duel.playerGoingFirst) {
    const otherPlayerId = getOtherPlayerId(duel.playerGoingFirst)
    duel.currentPlayerId = otherPlayerId
    duel = await startMulligan(duel, otherPlayerId)
  } else {
    duel.currentPlayerId = duel.playerGoingFirst
    duel = await turnStart(duel)
  }

  return duel
}
