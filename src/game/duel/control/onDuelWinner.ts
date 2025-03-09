import { useGameStore } from "@/src/react/hooks/useGameStore"
import { DuelState } from "../DuelData"
import { duelWinner } from "../DuelHelpers"

export const getDuelGoldReward = (duel: DuelState) => {
  return duel.winner === "human" || duel.winner === "draw" ? duel.info.goldReward : 0
}

export const onDuelWinner = (duel: DuelState) => {
  const winner = duelWinner(duel)
  if (winner === null) {
    throw Error("onDuelWinner called when there's no winner of the duel.")
  }

  duel.winner = winner

  // Add reward gold
  const { game, setGame } = useGameStore.getState()
  setGame({ ...game, gold: game.gold + getDuelGoldReward(duel) })
}
