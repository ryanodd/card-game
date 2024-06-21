export type ChoiceID = "CONFIRM_DUEL_START" | "CONFIRM_DUEL_END" | "TAKE_TURN"

export type ChoiceType = "target" | "targets" | "confirm"

export type ChoiceTarget = string | "human" | "opponent" | "confirm"

export type Target =
  | {
      targetType: "rowSpace"
      playerId: "human" | "opponent"
      rowIndex: number
      positionIndex: number
    }
  | {
      targetType: "playArea"
    }
  | {
      targetType: "player"
      playerId: "human" | "opponent"
    }
