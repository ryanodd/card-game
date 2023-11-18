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
      attackingSpaceId: string
      defendingSpaceId: string | null
    }
  | {
      id: "ATTACK_END"
      attackingSpaceId: string
      defendingSpaceId: string | null
    }
)
