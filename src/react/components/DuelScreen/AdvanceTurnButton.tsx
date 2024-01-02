import { duelWinner } from "@/src/game/DuelHelpers"
import { ChoiceID, takeTurn_executeAdvance, takeTurn_getValidHandTargets } from "@/src/game/Choices"
import { saveAndRerenderDuel } from "@/src/game/DuelController"

import styles from "./AdvanceTurnButton.module.css"
import buttonStyles from "../designSystem/Button.module.css"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"
import { DuelState } from "@/src/game/DuelData"

const getText = (duel: DuelState): string | null => {
  if (duelWinner(duel) !== null) {
    return null
  }
  if (duel.choice.playerId === "opponent") {
    return "Opponent's Turn"
  }
  const choiceId = duel.choice.id
  if (choiceId === ChoiceID.TAKE_TURN) {
    return "End Turn"
  }
  return null
}

export type AdvanceTurnButtonProps = {
  duel: DuelState
}

export const AdvanceTurnButton = ({ duel }: AdvanceTurnButtonProps) => {
  const { cardIdToBePlayed } = useDuelUIStore()

  const choiceId = duel.choice.id

  const buttonText = getText(duel)
  const pressable =
    duel.choice.playerId !== "opponent" &&
    !duelWinner(duel) &&
    !("animation" in duel) &&
    buttonText !== null &&
    !(choiceId === ChoiceID.TAKE_TURN && cardIdToBePlayed !== null)

  const highlighted = pressable && choiceId === ChoiceID.TAKE_TURN && takeTurn_getValidHandTargets(duel).length === 0

  return (
    <button
      className={`${buttonStyles.button} font-medium border-2 w-40 h-12 flex justify-center items-center ${
        !pressable ? buttonStyles.unpressable : ""
      } ${highlighted ? styles.highlighted : ""}
      }`}
      onClick={() => {
        if (choiceId === ChoiceID.TAKE_TURN) {
          const newDuel = takeTurn_executeAdvance(duel)
          saveAndRerenderDuel(newDuel)
        }
      }}
      disabled={!pressable}
    >
      {buttonText}
    </button>
  )
}
