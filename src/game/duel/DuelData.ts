import { CardName } from "../cards/CardName"
import { DuelAnimation } from "./AnimationData"
import { EnergyCounts } from "./EnergyData"
import { PlayerID } from "./PlayerData"

import { ChoiceID } from "./choices/ChoiceData"

export type Modifier =
  | {
      type: "attackChange"
      amount: number
    }
  | {
      id: "healthChange"
      amount: number
    }

export type CardState = {
  name: CardName
  instanceId: string

  cost: EnergyCounts
  cardType: "creature" | "spell" | "energy"
  modifiers: Modifier[]
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
