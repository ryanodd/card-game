import { useGameStore } from "../../hooks/useGameStore"

import styles from "./Table.module.css"

export const LeagueScheduleTable = () => {
  const { game } = useGameStore()

  const players = game.league.players
  const games = Object.values(game.league.schedule)

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Schedule</h2>
      <div className={styles.tableScrollContainer}>
        <table className={styles.table}>
          {games.map((game, i) => {
            return (
              <tr key={i} className={styles.tableRow}>
                <td>{`Game ${i + 1}`}</td>
                <td>{players[game.playerIdLeft].name}</td>
                <td>{players[game.playerIdRight].name}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}
