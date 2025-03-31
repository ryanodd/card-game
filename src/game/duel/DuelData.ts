import { CardName } from "../cards/CardName"
import { HeroData } from "../heroes/HeroData"
import { DuelAnimation } from "./AnimationData"
import { EnergyCost, EnergyCounts } from "./EnergyData"
import { PlayerID } from "./PlayerData"

import { ChoiceData } from "./choices/ChoiceData"

export const GAME_START_NUM_TO_DRAW = 3

export type AttackChangeModifier = {
  id: "attackChange"
  quantity: number
}

export type HealthChangeModifier = {
  id: "healthChange"
  quantity: number
}

export type Modifier = AttackChangeModifier | HealthChangeModifier
export type Status = "burn" | "stun" | "poison"

export type CardState = {
  name: CardName
  instanceId: string
  cost: EnergyCost
} & (
  | {
      cardType: "creature"
      attack: number
      health: number
      damage: number
      summoningSickness: boolean
      modifiers: Modifier[]
      status: Status | null
      shield: boolean
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
  energyCapacity: number
  drawnDead: boolean
}

export type DuelReward = {
  type: "gold"
  goldQuantity: number
}

export type DuelInfo = {
  reward?: DuelReward
  leagueGame: boolean
  tutorial: boolean
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
