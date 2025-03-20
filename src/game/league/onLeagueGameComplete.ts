import { getRandomInt, getRandomSeed } from "@/src/utils/randomNumber"
import { PlayerID } from "../duel/PlayerData"
import { GameState } from "../GameData"
import { NUM_PLAYERS_PER_LEAGUE } from "./createLeague"
import { getLeaguePlayersSortedByStanding } from "./leagueHelpers"
import { LeagueGame } from "./leagueTypes"

export const completeScheduledGame = (scheduledGame: LeagueGame, winner: PlayerID | "draw"): void => {
  console.log(scheduledGame, winner)
  const humanWin = winner === "human" || winner === "draw"
  if (scheduledGame.playerIdLeft === "human") {
    scheduledGame.winner = humanWin ? scheduledGame.playerIdLeft : scheduledGame.playerIdRight
    return
  }
  if (scheduledGame.playerIdRight === "human") {
    scheduledGame.winner = humanWin ? scheduledGame.playerIdRight : scheduledGame.playerIdLeft
    return
  }
  scheduledGame.winner =
    getRandomInt(2, getRandomSeed()) === 0 ? scheduledGame.playerIdLeft : scheduledGame.playerIdRight
}

export const onLeagueGameComplete = (game: GameState, winner: PlayerID | "draw"): GameState => {
  const schedule = game.league.schedule
  let scheduleIndex = 0
  for (let x = 0; x < schedule.length; x++) {
    scheduleIndex = x
    if (schedule[x].winner === null) {
      break
    }
  }

  // Completing scheduled game
  if (scheduleIndex < schedule.length - 1) {
    const numGamesToRecord = NUM_PLAYERS_PER_LEAGUE / 2
    for (let x = 0; x < numGamesToRecord; x++) {
      completeScheduledGame(schedule[scheduleIndex + x], winner)
    }

    // Set up first round of playoffs
    if (scheduleIndex + numGamesToRecord === schedule.length - 1) {
      const leaguePlayersByStanding = getLeaguePlayersSortedByStanding(game.league)
      game.league.playoffs = {
        round: "quarter-final",
        schedule: [
          {
            playerIdLeft: leaguePlayersByStanding[0].id,
            playerIdRight: leaguePlayersByStanding[7].id,
            winner: null,
          },
          {
            playerIdLeft: leaguePlayersByStanding[1].id,
            playerIdRight: leaguePlayersByStanding[6].id,
            winner: null,
          },
          {
            playerIdLeft: leaguePlayersByStanding[2].id,
            playerIdRight: leaguePlayersByStanding[5].id,
            winner: null,
          },
          {
            playerIdLeft: leaguePlayersByStanding[3].id,
            playerIdRight: leaguePlayersByStanding[4].id,
            winner: null,
          },
          null,
          null,
          null,
        ],
      }
    }
    return game
  }

  // Completed playoff game
  if (game.league.playoffs?.round === "quarter-final") {
    for (let x = 0; x < 4; x++) {
      completeScheduledGame(game.league.playoffs.schedule[x] as LeagueGame, winner)
    }

    game.league.playoffs = {
      round: "semi-final",
      schedule: [
        game.league.playoffs.schedule[0],
        game.league.playoffs.schedule[1],
        game.league.playoffs.schedule[2],
        game.league.playoffs.schedule[3],
        {
          playerIdLeft: game.league.playoffs.schedule[0].winner as string,
          playerIdRight: game.league.playoffs.schedule[3].winner as string,
          winner: null,
        },
        {
          playerIdLeft: game.league.playoffs.schedule[1].winner as string,
          playerIdRight: game.league.playoffs.schedule[2].winner as string,
          winner: null,
        },
        null,
      ],
    }
    return game
  }

  if (game.league.playoffs?.round === "semi-final") {
    for (let x = 4; x < 6; x++) {
      completeScheduledGame(game.league.playoffs.schedule[x] as LeagueGame, winner)
    }

    game.league.playoffs = {
      round: "final",
      schedule: [
        game.league.playoffs.schedule[0],
        game.league.playoffs.schedule[1],
        game.league.playoffs.schedule[2],
        game.league.playoffs.schedule[3],
        game.league.playoffs.schedule[4],
        game.league.playoffs.schedule[5],
        {
          playerIdLeft: game.league.playoffs.schedule[4].winner as string,
          playerIdRight: game.league.playoffs.schedule[5].winner as string,
          winner: null,
        },
      ],
    }
    return game
  }

  if (game.league.playoffs?.round === "final") {
    completeScheduledGame(game.league.playoffs.schedule[6] as LeagueGame, winner)
  }

  return game
}
