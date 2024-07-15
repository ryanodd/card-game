import { useGameStore } from "@/src/react/hooks/useGameStore"
import { DuelState } from "../DuelData"
import { duelWinner } from "../DuelHelpers"
import { PlayerID } from "../PlayerData"

// TODO where should this end up?
const getGoldReward = (winner: PlayerID | "draw") => {
  if (winner !== "human") {
    return 0
  }
  return 10
}

export const onDuelWinner = (duel: DuelState) => {
  const winner = duelWinner(duel)
  if (winner === null) {
    throw Error("onDuelWinner called when there's no winner of the duel.")
  }
  const goldReward = getGoldReward(winner)

  // Set duelCompleteData for the UI
  duel.duelCompleteData = {
    winner,
    goldReward,
  }

  // Add reward gold
  const { game, setGame } = useGameStore.getState()
  setGame({ ...game, gold: game.gold + goldReward })
}
