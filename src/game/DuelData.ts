import { EnergyType } from "./Cards"
import { DuelChoiceData } from "./Choices"

export type PlayerID = "human" | "opponent"

export type SpaceID = string
export type CardID = string

export type EnergyCounts = {
  neutral: number
  fire: number
  water: number
  earth: number
  air: number
}

export type CardState = {
  id: string
  number: number
  cost: EnergyCounts

  attack: number
  health: number

  summonSick: boolean
  attackedThisTurn: boolean
}

export type SpaceState = {
  id: string
  index: number
  occupant: CardState | null
}

export type PlayerState = {
  heroId: string
  health: number
  hand: CardState[]
  deck: CardState[]
  discard: CardState[]
  incomes: [EnergyType, EnergyType, EnergyType]
  creatureSpaces: [SpaceState, SpaceState, SpaceState, SpaceState, SpaceState, SpaceState, SpaceState]
  energy: EnergyCounts
  drawnDead: boolean
}

export type TurnPhase = ""

export type DuelState = {
  human: PlayerState
  opponent: PlayerState
  choice: DuelChoiceData

  playerGoingFirst: PlayerID
  currentPlayerId: PlayerID
  attackedThisTurn: boolean
  turnNumber: number

  // These strings all refer to space ids
  attackingSpaceIds: SpaceID[]
  defendersToAttackers: Record<SpaceID, SpaceID>
}