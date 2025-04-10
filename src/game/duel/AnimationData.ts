import { EnergyType } from "./EnergyData"
import { PlayerID } from "./PlayerData"

export type DuelAnimation = {
  durationMs: number
} & (
  | {
      id: "DRAW"
      cardId: string
    }
  | {
      id: "PAUSE"
    }
  | {
      id: "SUMMON"
      cardId: string
    }
  | {
      id: "DISCARD_HAND"
    }
  | {
      id: "ATTACK_START"
      cardIds: string[]
    }
  | {
      id: "ATTACK_END"
      cardIds: string[]
    }
  | {
      id: "MISS"
      rowIndex: number
      defendingCardId: string
    }
  | {
      id: "DESTROY_START"
      cardIds: string[]
    }
  | {
      id: "DESTROY_END"
      cardIds: string[]
    }
  | {
      id: "ENERGY_ADDED"
      playerId: PlayerID
      energyType: EnergyType
    }
  | {
      id: "ROLL_FAIL"
      cardId: string
    }
  | {
      id: "BURN"
      cardId: string
    }
  | {
      id: "POISON"
      cardId: string
    }
  | {
      id: "STUN"
      cardId: string
    }
  | {
      id: "CARD_FIRE_ACTION"
      cardId: string
    }
  | {
      id: "CARD_WATER_ACTION"
      cardId: string
    }
  | {
      id: "CARD_EARTH_ACTION"
      cardId: string
    }
  | {
      id: "CARD_AIR_ACTION"
      cardId: string
    }
  | {
      id: "PLAYER_FIRE_ACTION"
      playerId: PlayerID
    }
  | {
      id: "PLAYER_WATER_ACTION"
      playerId: PlayerID
    }
  | {
      id: "PLAYER_EARTH_ACTION"
      playerId: PlayerID
    }
  | {
      id: "PLAYER_AIR_ACTION"
      playerId: PlayerID
    }
)
