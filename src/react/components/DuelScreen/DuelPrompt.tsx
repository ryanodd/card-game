import buttonStyles from "../designSystem/Button.module.css"

import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"

import { useGameStore } from "../../hooks/useGameStore"
import { DuelState } from "@/src/game/duel/DuelData"
import { duelWinner } from "@/src/game/duel/DuelHelpers"
import { confirmStart_execute } from "@/src/game/duel/choices/confirmStart"
import { saveAndAdvanceDuelUntilChoiceOrWinner } from "@/src/game/duel/control/saveAndAdvanceDuelUntilChoiceOrWinner"
import { takeTurn_getPlayableHandCardIds } from "@/src/game/duel/choices/takeTurn/getPlayableHandCardIds"

export type DuelPromptProps = {
  duel: DuelState
}

export const useGetPromptMessage = (duel: DuelState): string | null => {
  const { cardIdDragging, energySelected } = useDuelUIStore()

  const choiceId = duel.choice.id

  if (duelWinner(duel) !== null) {
    return null
  }

  if (duel.choice.id === "CONFIRM_DUEL_START") {
    return "Ready to start?"
  }

  if (duel.choice.id === "TAKE_TURN") {
    const handTargets = takeTurn_getPlayableHandCardIds(duel)

    // Can play cards
    if (handTargets.length > 0) {
      return "Play cards, which use up your energy orbs."
    }

    // Can't play cards
    if (handTargets.length === 0) {
      if (duel.turnNumber === 1) {
        return "Can't afford to play any more cards. All you can do is end your turn."
      }
      return null
    }
  }

  return null
}

export const getButtonText = (duel: DuelState) => {
  if (duel.choice.id === "CONFIRM_DUEL_START") {
    return "Start"
  }
  return null
}

export const DuelPrompt = ({ duel }: DuelPromptProps) => {
  const { game, setGame } = useGameStore()

  const promptMessage = useGetPromptMessage(duel)
  const buttonText = getButtonText(duel)

  if (duel.choice.playerId === "opponent" || (promptMessage === null && buttonText === null)) {
    return null
  }

  return (
    <div className="absolute right-8 bottom-60 z-20 w-80 flex flex-col gap-2 bg-slate-800 rounded-lg shadow-md py-4 px-4">
      <h2 className="text-stone-50">{promptMessage}</h2>
      {buttonText !== null && (
        <button
          className={`${buttonStyles.button}`}
          onClick={async () => {
            if (duel.choice.id === "CONFIRM_DUEL_START") {
              const nextDuel = await confirmStart_execute(duel)
              saveAndAdvanceDuelUntilChoiceOrWinner(nextDuel)
            }
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
