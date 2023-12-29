import { DuelAnimation } from "./Animations"
import { EnergyType } from "./Cards"
import { DuelChoiceData } from "./Choices"

export type PlayerID = "human" | "opponent"

export type SpaceID = string

export type EnergyCounts = {
  neutral: number
  fire: number
  water: number
  earth: number
  air: number
}

export type CardState = {
  name: string
  instanceId: string
  cost: EnergyCounts

  attack: number
  health: number

  summonSick: boolean
  attackedThisTurn: boolean
}

export type SpaceState = {
  id: SpaceID
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

export type StaticDuelState = {
  id: "duel"
  choice: DuelChoiceData
  animationQueue: AnimatedDuelState[]

  human: PlayerState
  opponent: PlayerState

  playerGoingFirst: PlayerID
  currentPlayerId: PlayerID
  attackedThisTurn: boolean
  turnNumber: number
  attackingSpaceIds: SpaceID[]
  defendersToAttackers: Record<SpaceID, SpaceID>
}

export type AnimatedDuelState = Omit<StaticDuelState, "animationQueue"> & {
  animation: DuelAnimation
}

export type DuelState = StaticDuelState | AnimatedDuelState
