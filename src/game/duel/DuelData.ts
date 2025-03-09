import { CardName } from "../cards/CardName"
import { HeroData } from "../heroes/HeroData"
import { DuelAnimation } from "./AnimationData"
import { EnergyCounts } from "./EnergyData"
import { PlayerID } from "./PlayerData"

import { ChoiceData } from "./choices/ChoiceData"

export const GAME_START_NUM_TO_DRAW = 4

export type AttackChangeModifier = {
  id: "attackChange"
  quantity: number
}

export type HealthChangeModifier = {
  id: "healthChange"
  quantity: number
}

export type BurnModifier = {
  id: "burn"
  quantity: number
}

export type StunModifier = {
  id: "stun"
  quantity: number
}

export type PoisonModifier = {
  id: "poison"
  quantity: number
}

export type Modifier = AttackChangeModifier | HealthChangeModifier | BurnModifier | StunModifier | PoisonModifier

export type CardState = {
  name: CardName
  instanceId: string
  cost: EnergyCounts
  modifiers: Modifier[]
} & (
  | {
      cardType: "creature"
      attack: number
      health: number
      damage: number
      summoningSickness: boolean
    }
  | {
      cardType: "spell"
    }
)

export type PlayerState = {
  hero: HeroData
  health: number
  hand: CardState[]
  deck: CardState[]
  discard: CardState[]
  rows: CardState[][]
  inPlay: CardState | null
  cardSelect: CardState[]
  energy: EnergyCounts
  drawnDead: boolean
}

export type DuelInfo = {
  goldReward: number
  tutorial: true
}

export type DuelState = {
  id: "duel"
  info: DuelInfo

  choice: ChoiceData
  currentAnimation: DuelAnimation | null

  human: PlayerState
  opponent: PlayerState

  playerGoingFirst: PlayerID
  currentPlayerId: PlayerID
  turnNumber: number

  winner: null | PlayerID | "draw"
}
