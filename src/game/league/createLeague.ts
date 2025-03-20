import { v4 } from "uuid"
import { League, LeagueGame, LeaguePlayer } from "./leagueTypes"
import { generateDeck } from "../decks/generateDeck"

export const NUM_PLAYERS_PER_LEAGUE = 16
export const NUM_GAMES_PER_PLAYER_PER_REGULAR_SEASON = 15

const isLeaguePlayerInSchedule = (player: LeaguePlayer, schedule: LeagueGame[]) => {
  for (let x = 0; x < schedule.length; x++) {
    if (schedule[x].playerIdLeft === player.id) {
      return true
    }
    if (schedule[x].playerIdRight === player.id) {
      return true
    }
  }
  return false
}

export const createLeague = (): League => {
  const players: Record<string, LeaguePlayer> = {}
  players["human"] = {
    id: "human",
    name: "You",
    human: true,
    wins: 0,
    losses: 0,
  }

  for (let x = 1; x < NUM_PLAYERS_PER_LEAGUE; x++) {
    const opponentId = v4()
    players[opponentId] = {
      id: opponentId,
      name: `CPU ${x}`,
      human: false,
      deck: generateDeck({ method: "completely-random" }),
      wins: 0,
      losses: 0,
    }
  }

  let schedule: LeagueGame[] = []

  let opponentCircle: LeaguePlayer[] = [...Object.values(players)].filter((player) => player.human === false)
  for (let x = 0; x < NUM_GAMES_PER_PLAYER_PER_REGULAR_SEASON; x++) {
    // Based on the 'circle method'
    // https://en.wikipedia.org/wiki/Round-robin_tournament
    const rotatedPlayer = opponentCircle.shift() as LeaguePlayer
    opponentCircle = [...opponentCircle, rotatedPlayer]
    const scheduleGamesToAdd: LeagueGame[] = []
    scheduleGamesToAdd.push({
      playerIdLeft: players["human"].id,
      playerIdRight: opponentCircle[opponentCircle.length - 1].id,
      winner: null,
    })
    for (let y = 0; y < (opponentCircle.length - 1) / 2; y += 1) {
      scheduleGamesToAdd.push({
        playerIdLeft: opponentCircle[y].id,
        playerIdRight: opponentCircle[opponentCircle.length - 2 - y].id,
        winner: null,
      })
    }
    schedule = [...schedule, ...scheduleGamesToAdd]
  }

  return {
    players,
    schedule,
    playoffs: null,
  }
}
