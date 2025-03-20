import { useGameStore } from "@/src/react/hooks/useGameStore"
import { DuelState } from "../DuelData"
import { duelWinner } from "../DuelHelpers"
import { onLeagueGameComplete } from "../../league/onLeagueGameComplete"

export const getDuelReward = (duel: DuelState) => {
  return duel.winner === "human" || duel.winner === "draw" ? duel.info.reward : undefined
}

export const onDuelWinner = (duel: DuelState) => {
  const winner = duelWinner(duel)
  if (winner === null) {
    throw Error("onDuelWinner called when there's no winner of the duel.")
  }

  duel.winner = winner

  const { game, setGame } = useGameStore.getState()

  // Add reward gold
  const reward = getDuelReward(duel)

  let nextGold = game.gold
  if (reward?.type === "gold") {
    nextGold += reward?.goldQuantity
  }

  const nextGame = {
    ...game,
    gold: nextGold,
  }

  // Progress league
  if (duel.info.leagueGame) {
    setGame(onLeagueGameComplete(nextGame, winner))
    return
  }

  setGame(nextGame)
}
