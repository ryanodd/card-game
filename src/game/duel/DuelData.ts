import { CardName } from "../cards/CardName"
import { DuelAnimation } from "./AnimationData"

import { ChoiceID } from "./choices/ChoiceData"

export type PlayerID = "human" | "opponent"

export type EnergyCounts = {
  neutral: number
  fire: number
  water: number
  earth: number
  air: number
}

export type CardState = {
  name: CardName
  instanceId: string

  cost: EnergyCounts
  cardType: "creature" | "spell" | "energy"
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

export type DuelState = {
  id: "duel"
  choice: {
    id: ChoiceID
    playerId: PlayerID
  }
  currentAnimation: DuelAnimation | null

  human: PlayerState
  opponent: PlayerState

  playerGoingFirst: PlayerID
  currentPlayerId: PlayerID
  turnNumber: number
}
