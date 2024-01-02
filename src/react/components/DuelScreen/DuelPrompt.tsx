import { duelWinner } from "@/src/game/DuelHelpers"
import {
  ChoiceID,
  confirmStart_execute,
  takeTurn_getValidHandTargets,
  takeTurn_getValidSpaceTargets,
} from "@/src/game/Choices"
import buttonStyles from "../designSystem/Button.module.css"
import { saveAndRerenderDuel } from "@/src/game/DuelController"
import { DuelState } from "@/src/game/DuelData"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"

export type DuelPromptProps = {
  duel: DuelState
}

export const useGetPromptMessage = (duel: DuelState): string | null => {
  const { cardIdToBePlayed, energySelected } = useDuelUIStore()
  const choiceId = duel.choice.id

  if (duelWinner(duel) === "human") {
    return "Victory! The opponent is defeated."
  }
  if (duelWinner(duel) === "opponent") {
    return "You lost..."
  }

  if (duel.choice.id === ChoiceID.CONFIRM_START) {
    return "Ready to start?"
  }
  if (duel.choice.id === ChoiceID.TAKE_TURN) {
    // About to play a card
    if (cardIdToBePlayed !== null) {
      if (
        takeTurn_getValidSpaceTargets(duel, cardIdToBePlayed, getEnergyCountsFromSelected(energySelected)).length > 0
      ) {
        return "Choose where to play your card."
      }
      return "Pay elements for your card."
    }

    const handTargets = takeTurn_getValidHandTargets(duel)

    // Can play cards
    if (handTargets.length > 0) {
      return "Play cards by spending elements."
    }

    // Can't play cards
    if (handTargets.length === 0) {
      if (duel.turnNumber === 0) {
        return "Can't afford to play any more cards. End your turn."
      }
      return null
    }
  }

  return null
}

export const getButtonText = (duel: DuelState) => {
  if (duelWinner(duel) !== null) {
    return "End Duel"
  }

  if (duel.choice.id === ChoiceID.CONFIRM_START) {
    return "Start"
  }
  return null
}

export const DuelPrompt = ({ duel }: DuelPromptProps) => {
  const promptMessage = useGetPromptMessage(duel)
  const buttonText = getButtonText(duel)

  if (duel.choice.playerId === "opponent" || (promptMessage === null && buttonText === null)) {
    return null
  }

  return (
    <div className="absolute right-8 bottom-60 z-20 w-80 flex flex-col gap-2 bg-slate-600 rounded-lg shadow-md p-4">
      <h2>{promptMessage}</h2>
      {buttonText !== null && (
        <button
          className={`${buttonStyles.button}`}
          onClick={() => {
            if (duel.choice.id === ChoiceID.CONFIRM_START) {
              const nextDuel = confirmStart_execute(duel)
              saveAndRerenderDuel(nextDuel)
            }
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
