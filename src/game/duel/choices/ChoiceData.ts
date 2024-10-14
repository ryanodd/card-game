import { PlayerID } from "../PlayerData"

export type ChoiceID = "CONFIRM_DUEL_START" | "MULLIGAN" | "TAKE_TURN" | "SCRY"

export type ChoiceData = {
  playerId: PlayerID
} & (
  | { id: "CONFIRM_DUEL_START" }
  | {
      id: "TAKE_TURN"
    }
  | { id: "MULLIGAN" }
  | { id: "TAKE_TURN" }
  | { id: "CARD_SELECT"; triggerCardId: string; title: string; description: string }
)

export type ChoiceType = "target" | "targets" | "confirm" | "cardSelect"

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
      targetType: "playerRow"
      playerId: "human" | "opponent"
      rowIndex: number
    }
  | {
      targetType: "player"
      playerId: "human" | "opponent"
    }
