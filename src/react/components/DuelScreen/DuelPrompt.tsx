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

    // // Can play cards
    // if (handTargets.length > 0) {
    //   return "Play cards, which spends energy."
    // }

    // Can't play cards
    if (handTargets.length === 0) {
      if (duel.turnNumber === 1) {
        return "On your first turn, you only get 1 energy. You can't afford to play any cards. End your turn."
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
    <div className="absolute right-4 bottom-72 z-20 w-72 flex flex-col gap-2 bg-slate-800 rounded-lg shadow-md py-4 px-4">
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
