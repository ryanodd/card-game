import { LeaguePlayer } from "@/src/game/league/leagueTypes"
import styles from "./LeaguePlayerCell.module.css"

export type LeaguePlayerCellProps = {
  player: LeaguePlayer
}

export const LeaguePlayerCell = ({ player }: LeaguePlayerCellProps) => {
  return (
    <div className={styles.leaguePlayer}>
      <span className={styles.leaguePlayerName}>{player.name}</span>
    </div>
  )
}
