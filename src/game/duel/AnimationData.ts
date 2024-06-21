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
      id: "ATTACK_START"
      rowIndex: number
    }
  | {
      id: "ATTACK_END"
      rowIndex: number
    }
  | {
      id: "EMBER_FOXLING"
      attackingCardId: string
    }
)
