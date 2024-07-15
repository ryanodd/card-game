import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

export async function drawToCardSelect(inputDuel: DuelState, playerId: PlayerID, numberToDraw: number) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  for (let x = 0; x < numberToDraw; x++) {
    const cardDrawn = player.deck.pop()
    if (!cardDrawn) {
      throw Error("No more cards left to draw") // TODO expected codepath
    }
    player.cardSelect.push(cardDrawn)
  }
  // duel = await playAnimation(duel, { id: "DRAW", durationMs: 800, })
  // duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  return duel
}
