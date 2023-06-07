import { duelWinner, getCurrentDuelPlayer } from "@/src/game/DuelHelpers"
import { useDuelStore } from "../../hooks/useDuelStore"
import {
  ChoiceID,
  confirmEndAttacks_execute,
  declareAttackers_execute,
  declareDefenders_execute,
  declareDefenders_getValidDefenderTargets,
  takeTurn_executeAdvance,
  takeTurn_getValidHandTargets,
} from "@/src/game/Choices"
import { endTurn } from "@/src/game/Actions"
import { saveAndRerenderDuel } from "@/src/game/DuelController"

import styles from "./AdvanceTurnButton.module.css"
import buttonStyles from "../Button.module.css"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"
import { DuelState } from "@/src/game/DuelData"

const getText = (duel: DuelState): string | null => {
  if (duelWinner(duel) !== null) {
    return null
  }
  const choiceId = duel.choice.id
  if (choiceId === ChoiceID.TAKE_TURN) {
    if (!duel.attackedThisTurn) {
      return "Begin Attacks"
    } else {
      return "End Turn"
    }
  }
  if (choiceId === ChoiceID.DECLARE_ATTACKERS) {
    return "Lock in Attackers"
  }
  if (choiceId === ChoiceID.DECLARE_DEFENDS) {
    return "Lock in Defenders"
  }
  if (choiceId === ChoiceID.RESOLVE_ATTACKS) {
    return null
  }
  if (choiceId === ChoiceID.CONFIRM_END_ATTACKS) {
    return "End Attacks"
  }
  return null
}

export const AdvanceTurnButton = () => {
  const { duel } = useDuelStore()
  const { cardIdToBePlayed, attackersToDeclare, defendersToAttackers } = useDuelUIStore()

  const attackedThisTurn = duel.attackedThisTurn
  const choiceId = duel.choice.id

  const buttonText = getText(duel)
  const pressable = !duelWinner(duel) && buttonText !== null && cardIdToBePlayed === null

  const highlighted =
    pressable &&
    ((choiceId === ChoiceID.TAKE_TURN && takeTurn_getValidHandTargets(duel).length === 0) ||
      choiceId === ChoiceID.CONFIRM_END_ATTACKS ||
      (choiceId === ChoiceID.DECLARE_DEFENDS &&
        declareDefenders_getValidDefenderTargets(duel).length === Object.keys(defendersToAttackers).length))

  return (
    <button
      className={`${buttonStyles.button} border-2 w-40 h-12 flex justify-center items-center ${
        !pressable ? buttonStyles.unpressable : ""
      } ${highlighted ? styles.highlighted : ""}`}
      onClick={() => {
        if (choiceId === ChoiceID.TAKE_TURN) {
          const newDuel = takeTurn_executeAdvance(duel)
          saveAndRerenderDuel(newDuel)
        }
        if (choiceId === ChoiceID.DECLARE_ATTACKERS) {
          const newDuel = declareAttackers_execute(duel, { attackingSpaceIds: attackersToDeclare })
          saveAndRerenderDuel(newDuel)
        }
        if (choiceId === ChoiceID.DECLARE_DEFENDS) {
          const newDuel = declareDefenders_execute(duel, { defendersToAttackers })
          saveAndRerenderDuel(newDuel)
        }
        if (choiceId === ChoiceID.CONFIRM_END_ATTACKS) {
          const newDuel = confirmEndAttacks_execute(duel)
          saveAndRerenderDuel(newDuel)
        }
      }}
      disabled={!pressable}
    >
      {buttonText}
    </button>
  )
}
