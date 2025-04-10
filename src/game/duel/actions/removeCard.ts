import { DuelState } from "../DuelData"

export async function removeCard(inputDuel: DuelState, cardInstanceId: string) {
  const duel = inputDuel
  const humanHand = duel.human.hand
  for (let x = 0; x < humanHand.length; x++) {
    if (humanHand[x].instanceId === cardInstanceId) {
      humanHand.splice(x, 1)
    }
  }

  const humanDiscard = duel.human.discard
  for (let x = 0; x < humanDiscard.length; x++) {
    if (humanDiscard[x].instanceId === cardInstanceId) {
      humanDiscard.splice(x, 1)
    }
  }

  const humanRow = duel.human.row
  for (let x = 0; x < humanRow.length; x++) {
    if (humanRow[x].instanceId === cardInstanceId) {
      humanRow.splice(x, 1)
    }
  }

  const humanCardSelect = duel.human.cardSelect
  for (let x = 0; x < humanCardSelect.length; x++) {
    if (humanCardSelect[x].instanceId === cardInstanceId) {
      humanCardSelect.splice(x, 1)
    }
  }

  const opponentHand = duel.opponent.hand
  for (let x = 0; x < opponentHand.length; x++) {
    if (opponentHand[x].instanceId === cardInstanceId) {
      opponentHand.splice(x, 1)
    }
  }

  const opponentDiscard = duel.opponent.discard
  for (let x = 0; x < opponentDiscard.length; x++) {
    if (opponentDiscard[x].instanceId === cardInstanceId) {
      opponentDiscard.splice(x, 1)
    }
  }

  const opponentRow = duel.opponent.row
  for (let x = 0; x < opponentRow.length; x++) {
    if (opponentRow[x].instanceId === cardInstanceId) {
      opponentRow.splice(x, 1)
    }
  }

  const opponentCardSelect = duel.opponent.cardSelect
  for (let x = 0; x < opponentCardSelect.length; x++) {
    if (opponentCardSelect[x].instanceId === cardInstanceId) {
      opponentCardSelect.splice(x, 1)
    }
  }

  return duel
}
