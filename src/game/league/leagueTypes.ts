import { Deck } from "../decks/Deck"
import { PlayerID } from "../duel/PlayerData"

export type LeaguePlayer = {
  id: string
  name: string
  wins: number
  losses: number
} & ({ human: true } | { human: false; deck: Deck })

export type LeagueGame = {
  playerIdLeft: string
  playerIdRight: string
  winner: string | null
}

export type League = {
  players: Record<string, LeaguePlayer>
  schedule: LeagueGame[]
  playoffs:
    | {
        round: "final"
        schedule: [LeagueGame, LeagueGame, LeagueGame, LeagueGame, LeagueGame, LeagueGame, LeagueGame]
      }
    | {
        round: "semi-final"
        schedule: [LeagueGame, LeagueGame, LeagueGame, LeagueGame, LeagueGame, LeagueGame, null]
      }
    | {
        round: "quarter-final"
        schedule: [LeagueGame, LeagueGame, LeagueGame, LeagueGame, null, null, null]
      }
    | null
}
