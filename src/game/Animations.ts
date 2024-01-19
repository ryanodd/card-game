export enum AnimationID {
  "ATTACK_START",
  "ATTACK_END",
  "PAUSE",
}

export type DuelAnimation = {
  duration: number
} & (
  | {
      id: "PAUSE"
    }
  | {
      id: "ATTACK_START"
      humanAttackingSpaceId: string
      opponentAttackingSpaceId: string | null
    }
  | {
      id: "ATTACK_END"
      humanAttackingSpaceId: string
      opponentAttackingSpaceId: string | null
    }
)
