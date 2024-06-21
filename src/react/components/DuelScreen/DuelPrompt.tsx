import buttonStyles from "../designSystem/Button.module.css"

import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"

import { useGameStore } from "../../hooks/useGameStore"
import { DuelState } from "@/src/game/duel/DuelData"
import { duelWinner } from "@/src/game/duel/DuelHelpers"
import { takeTurn_getValidHandTargets } from "@/src/game/duel/choices/takeTurn/getValidHandTargets"
import { confirmStart_execute } from "@/src/game/duel/choices/confirmStart"
import { saveAndAdvanceDuelUntilChoiceOrWinner } from "@/src/game/duel/control/saveAndAdvanceDuelUntilChoiceOrWinner"
import { duelEnd } from "@/src/game/duel/actions/duelEnd"

export type DuelPromptProps = {
  duel: DuelState
}

export const useGetPromptMessage = (duel: DuelState): string | null => {
  const { cardIdDragging, energySelected } = useDuelUIStore()
  const choiceId = duel.choice.id

  if (duelWinner(duel) === "human") {
    return "Victory! The opponent is defeated."
  }
  if (duelWinner(duel) === "opponent") {
    return "You lost..."
  }

  if (duel.choice.id === "CONFIRM_DUEL_START") {
    return "Ready to start?"
  }

  if (duel.choice.id === "TAKE_TURN" && !duel.human.playedEnergyThisTurn && duel.turnNumber === 1) {
    return "Spend energy to play cards. You may play one energy card per turn."
  }

  if (duel.choice.id === "TAKE_TURN") {
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
    <div className="absolute right-8 bottom-60 z-20 w-80 flex flex-col gap-2 bg-slate-600 rounded-lg shadow-md p-4">
      <h2>{promptMessage}</h2>
      {buttonText !== null && (
        <button
          className={`${buttonStyles.button}`}
          onClick={async () => {
            if (duel.choice.id === "CONFIRM_DUEL_START") {
              const nextDuel = await confirmStart_execute(duel)
              saveAndAdvanceDuelUntilChoiceOrWinner(nextDuel)
            }
            if (duel.choice.id === "CONFIRM_DUEL_END") {
              const nextDuel = await duelEnd(duel)
              await saveAndAdvanceDuelUntilChoiceOrWinner(nextDuel)
              setGame({
                ...game,
                screen: { id: "mainMenu" },
              })
            }
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
