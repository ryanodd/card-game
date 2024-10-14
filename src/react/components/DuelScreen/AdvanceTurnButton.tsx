import styles from "./AdvanceTurnButton.module.css"
import buttonStyles from "../designSystem/Button.module.css"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"

import { Button } from "../designSystem/Button"
import { duelWinner } from "@/src/game/duel/DuelHelpers"
import { DuelState } from "@/src/game/duel/DuelData"
import { takeTurn_executeAdvance } from "@/src/game/duel/choices/takeTurn/executeAdvance"
import { saveAndAdvanceDuelUntilChoiceOrWinner } from "@/src/game/duel/control/saveAndAdvanceDuelUntilChoiceOrWinner"
import { takeTurn_getPlayableHandCardIds } from "@/src/game/duel/choices/takeTurn/getPlayableHandCardIds"

const getText = (duel: DuelState): string | null => {
  if (duelWinner(duel) !== null) {
    return null
  }
  if (duel.choice.playerId === "opponent") {
    return "Opponent's Turn"
  }
  const choiceId = duel.choice.id
  if (choiceId === "TAKE_TURN") {
    return "End Turn"
  }
  return null
}

export type AdvanceTurnButtonProps = {
  duel: DuelState
}

export const AdvanceTurnButton = ({ duel }: AdvanceTurnButtonProps) => {
  const choiceId = duel.choice.id

  const buttonText = getText(duel)
  const pressable =
    duel.choice.playerId !== "opponent" && !duelWinner(duel) && duel.currentAnimation === null && buttonText !== null

  const highlighted = pressable && choiceId === "TAKE_TURN" && takeTurn_getPlayableHandCardIds(duel).length === 0

  return (
    <Button
      className={`w-52 flex justify-center items-center ${!pressable ? buttonStyles.unpressable : ""} ${
        highlighted ? styles.highlighted : ""
      }
      }`}
      onClick={async () => {
        if (choiceId === "TAKE_TURN") {
          const newDuel = await takeTurn_executeAdvance(duel)
          await saveAndAdvanceDuelUntilChoiceOrWinner(newDuel)
        }
      }}
      disabled={!pressable}
      data-size="large"
      data-variant={highlighted ? "primary" : "secondary"}
    >
      {buttonText}
    </Button>
  )
}
