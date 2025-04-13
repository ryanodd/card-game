import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import styles from "./LeagueNextGameSection.module.css"
import { LeaguePlayerCell } from "./LeaguePlayerCell"
import { getActiveDeck } from "@/src/game/GameData"
import { createNewDuel, getDuelParamsFromEntryPoint } from "@/src/game/duel/createNewDuel"

export const LeagueNextGameSection = () => {
  const { game, setGame } = useGameStore()

  if (game.league.schedule.length === 0) {
    return (
      <div className={styles.leagueNextGameSection}>
        <h2 className={styles.leagueNextGameTitle}>No upcoming games</h2>
      </div>
    )
  }

  const nextHumanGame = game.league.schedule[0]
  const humanPlayer = game.league.players[nextHumanGame.playerIdLeft]
  if (humanPlayer?.human === false) {
    throw Error("First game in schedule doesn't have the human player as the left player!")
  }
  const opponent = game.league.players[nextHumanGame.playerIdRight]

  const onChangeDeck = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }
  const onPlayNextGame = () => {
    setGame({
      ...game,
      screen: {
        id: "duel",
        duel: createNewDuel(getDuelParamsFromEntryPoint(game, { duelType: "league", leagueGame: nextHumanGame })),
        debugUiOpen: false,
      },
    })
  }

  return (
    <div className={styles.leagueNextGameSection}>
      <div className={styles.leagueNextGameInfo}>
        <span className={styles.leagueNextGameTitle}>Next game:</span>
        <LeaguePlayerCell player={humanPlayer} />
        <span className={styles.leagueVs}>vs</span>
        <LeaguePlayerCell player={opponent} />
      </div>
      <div className="grow"></div>
      <div className={styles.leagueDeckInfo}>
        <span className="text-lg text-stone-50">Active deck: {getActiveDeck(game)?.name ?? "None"}</span>
        <Button onClick={onChangeDeck}>Change deck</Button>
      </div>
      <Button data-variant="primary" data-size="large" onClick={onPlayNextGame}>
        Ready
      </Button>
    </div>
  )
}
