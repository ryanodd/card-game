import { duelWinner } from "@/src/game/DuelHelpers"
import {
  ChoiceID,
  confirmEndAttacks_execute,
  declareAttackers_execute,
  declareDefenders_execute,
  declareDefenders_getValidDefenderTargets,
  takeTurn_executeAdvance,
  takeTurn_getValidHandTargets,
} from "@/src/game/Choices"
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
    return "Attacking..."
  }
  if (choiceId === ChoiceID.CONFIRM_END_ATTACKS) {
    return "End Attacks"
  }
  return null
}

export type AdvanceTurnButtonProps = {
  duel: DuelState
}

export const AdvanceTurnButton = ({ duel }: AdvanceTurnButtonProps) => {
  const { cardIdToBePlayed, spaceIdToDefend, attackersToDeclare, defendersToAttackers } = useDuelUIStore()

  const attackedThisTurn = duel.attackedThisTurn
  const choiceId = duel.choice.id

  const buttonText = getText(duel)
  const pressable =
    duel.choice.playerId !== "opponent" &&
    !duelWinner(duel) &&
    !("animation" in duel) &&
    buttonText !== null &&
    !(choiceId === ChoiceID.TAKE_TURN && cardIdToBePlayed !== null) &&
    !(choiceId === ChoiceID.DECLARE_DEFENDS && spaceIdToDefend !== null) &&
    !(choiceId === ChoiceID.RESOLVE_ATTACKS)

  const highlighted =
    pressable &&
    ((choiceId === ChoiceID.TAKE_TURN && takeTurn_getValidHandTargets(duel).length === 0) ||
      choiceId === ChoiceID.CONFIRM_END_ATTACKS ||
      (choiceId === ChoiceID.DECLARE_DEFENDS &&
        declareDefenders_getValidDefenderTargets(duel).length === Object.keys(defendersToAttackers).length))

  const attackColor =
    (choiceId === ChoiceID.TAKE_TURN && !duel.attackedThisTurn && takeTurn_getValidHandTargets(duel).length === 0) ||
    choiceId === ChoiceID.DECLARE_ATTACKERS ||
    choiceId === ChoiceID.RESOLVE_ATTACKS
  const defendColor = pressable && choiceId === ChoiceID.DECLARE_DEFENDS

  return (
    <button
      className={`${buttonStyles.button} font-medium border-2 w-40 h-12 flex justify-center items-center ${
        !pressable ? buttonStyles.unpressable : ""
      } ${highlighted ? styles.highlighted : ""} ${attackColor ? styles.attack_color : ""} ${
        defendColor ? styles.defend_color : ""
      }`}
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
