import { League, LeaguePlayer } from "./leagueTypes"

export const getLeaguePlayersSortedByStanding = (league: League): LeaguePlayer[] => {
  const leaguePlayers = Object.values(league.players)
  leaguePlayers.sort((leaguePlayerA, leaguePlayerB) => {
    return leaguePlayerA.wins > leaguePlayerB.wins ? 1 : -1
  })
  return leaguePlayers
}
