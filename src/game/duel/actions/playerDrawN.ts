import { DuelState } from "../DuelData"
import { getDuelPlayerById } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

export type PlayerDrawNParams = {
  numberToDraw: number
  playerId: PlayerID
}

export const playerDrawN = (inputDuel: DuelState, { numberToDraw, playerId }: PlayerDrawNParams) => {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  for (let x = 0; x < numberToDraw; x++) {
    const cardDrawn = player.deck.pop()
    if (!cardDrawn) {
      throw Error("No more cards left to draw") // TODO expected codepath
    }
    player.hand.push(cardDrawn)
  }
  return duel
}
