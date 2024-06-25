import { EnergyType } from "./EnergyData"
import { PlayerID } from "./PlayerData"

export enum AnimationID {
  "ATTACK_START",
  "ATTACK_END",
  "PAUSE",
}

export type DuelAnimation = {
  durationMs: number
} & (
  | {
      id: "PAUSE"
    }
  | {
      id: "SUMMON"
      cardId: string
    }
  | {
      id: "ATTACK_START"
      rowIndex: number
    }
  | {
      id: "ATTACK_END"
      rowIndex: number
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
      id: "ROLL_FAIL"
      cardId: string
    }
  | {
      id: "EMBER_FOXLING"
      attackingCardId: string
    }
  | {
      id: "EERIE_VISION"
      cardId: string
    }
  | {
      id: "STARTLE"
      cardId: string
    }
  | {
      id: "CAVE_SWIMMER"
      cardId: string
    }
  | {
      id: "DARKWOODS_HYENA"
      cardId: string
    }
  | {
      id: "DRAGON_CUB"
      cardId: string
    }
  | {
      id: "JOLTBIRD_AGENT"
      cardId: string
    }
  | {
      id: "BRASH_SPLASHER"
      cardId: string
    }
  | {
      id: "FLAME_SENTINTEL"
      cardId: string
    }
)
