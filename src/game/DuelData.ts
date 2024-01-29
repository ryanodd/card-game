import { DuelAnimation } from "./Animations"
import { CardType, EnergyType } from "./Cards"
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
  cardType: CardType
  attack?: {
    min: number
    max: number
  }
  health?: number
  initialHealth?: number
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
  creatureSpaces: [SpaceState, SpaceState, SpaceState, SpaceState]
  energy: EnergyCounts
  energyIncome: EnergyCounts
  playedEnergyThisTurn: boolean
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
  turnNumber: number
}

export type AnimatedDuelState = Omit<StaticDuelState, "animationQueue"> & {
  animation: DuelAnimation
}

export type DuelState = StaticDuelState | AnimatedDuelState
