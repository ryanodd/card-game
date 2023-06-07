import { duelWinner } from "@/src/game/DuelHelpers"
import { useDuelStore } from "../../hooks/useDuelStore"
import {
  ChoiceID,
  confirmStart_execute,
  declareDefenders_getValidDefenderTargets,
  takeTurn_getValidHandTargets,
  takeTurn_getValidSpaceTargets,
} from "@/src/game/Choices"
import buttonStyles from "../Button.module.css"
import { saveAndRerenderDuel } from "@/src/game/DuelController"
import { DuelState } from "@/src/game/DuelData"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"

export type DuelPromptProps = {}

export const useGetPromptMessage = (duel: DuelState): string | null => {
  const { cardIdToBePlayed, spaceIdToDefend, spaceIdToAttack, defendersToAttackers, energySelected } = useDuelUIStore()
  const choiceId = duel.choice.id

  if (duelWinner(duel) === "human") {
    return "Victory! The opponent is deafeted."
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
        return "Can't afford to play any more cards. Advance to the next phase."
      }
      return null
    }
  }

  if (duel.choice.id === ChoiceID.DECLARE_ATTACKERS) {
    return "Select how many of your creatures will attack this turn."
  }

  if (duel.choice.id === ChoiceID.DECLARE_DEFENDS) {
    if (declareDefenders_getValidDefenderTargets(duel).length === Object.keys(defendersToAttackers).length) {
      return null
    }
    if (spaceIdToDefend === null) {
      return "Select creatures to defend with. "
    }
    if (spaceIdToDefend !== null) {
      return "Select which creature to defend against."
    }
  }

  if (duel.choice.id === ChoiceID.RESOLVE_ATTACKS) {
    if (!spaceIdToAttack) {
      return "Select an attacking creature to attack!"
    }
    if (spaceIdToAttack) {
      return "Select a defending creature to deal damage."
    }
  }

  if (duel.choice.id === ChoiceID.CONFIRM_END_ATTACKS && duel.turnNumber === 0) {
    return "Creatures can't attack the turn they are played. End the attack phase."
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

export const DuelPrompt = ({}: DuelPromptProps) => {
  const { duel } = useDuelStore()

  const promptMessage = useGetPromptMessage(duel)

  const buttonText = getButtonText(duel)

  if (promptMessage === null && buttonText === null) {
    return null
  }

  return (
    <div className="absolute left-8 bottom-60 z-20 w-80 flex flex-col gap-2 bg-slate-600 rounded-lg shadow-md p-4">
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
