import { useGameStore } from "../../hooks/useGameStore"

import styles from "./Table.module.css"

export const LeagueStandingsTable = () => {
  const { game } = useGameStore()

  const players = Object.values(game.league.players)
  const sortedPlayers = players.sort((playerA, playerB) => {
    return playerA.wins < playerB.wins ? -1 : 1
  })

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Standings</h2>
      <table className={styles.table}>
        <tr>
          <th></th>
          <th>Wins</th>
          <th>Losses</th>
        </tr>
        {sortedPlayers.map((player) => {
          return (
            <tr key={player.id} className={styles.tableRow}>
              <td>{player.name}</td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
