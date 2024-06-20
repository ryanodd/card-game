import { DuelAnimation } from "./Animations"
import { CardType, EnergyType } from "./Cards"
import { DuelChoiceData } from "./Choices"

export type PlayerID = "human" | "opponent"

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
  attack?: number
  health?: number
  initialHealth?: number
}

export type PlayerState = {
  heroId: string
  health: number
  hand: CardState[]
  deck: CardState[]
  discard: CardState[]
  rows: CardState[][]
  energy: EnergyCounts
  energyIncome: EnergyCounts
  playedEnergyThisTurn: boolean
  drawnDead: boolean
}

// Just want to make a note about these: it's confusing the way we've got AnimatedDuelStates inside StaticDuelState.
// An improvement could be to NOT have an animationQueue inside StaticDuelState.
// when a duel state changes, we go through many DuelStates with animations, each with an animationType & duration.

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

// Like, why?? I think we should have an AnimationManager or something.
export type DuelState = StaticDuelState | AnimatedDuelState
