import { duelWinner, getCurrentDuelPlayer } from "@/src/game/DuelHelpers"
import { ChoiceID, confirmStart_execute, takeTurn_getValidHandTargets } from "@/src/game/Choices"
import buttonStyles from "../designSystem/Button.module.css"
import { saveAndAdvanceDuelUntilChoice } from "@/src/game/DuelController"
import { DuelState } from "@/src/game/DuelData"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { duelTeardown } from "@/src/game/Actions"
import { useGameStore } from "../../hooks/useGameStore"

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

  if (duel.choice.id === ChoiceID.CONFIRM_DUEL_START) {
    return "Ready to start?"
  }

  if (duel.choice.id === ChoiceID.TAKE_TURN && !duel.human.playedEnergyThisTurn && duel.turnNumber === 1) {
    return "Spend energy to play cards. You may play one energy card per turn."
  }

  if (duel.choice.id === ChoiceID.TAKE_TURN) {
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

  if (duel.choice.id === ChoiceID.CONFIRM_DUEL_START) {
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
          onClick={() => {
            if (duel.choice.id === ChoiceID.CONFIRM_DUEL_START) {
              const nextDuel = confirmStart_execute(duel)
              saveAndAdvanceDuelUntilChoice(nextDuel)
            }
            if (duel.choice.id === ChoiceID.CONFIRM_DUEL_END) {
              const nextDuel = duelTeardown(duel)
              saveAndAdvanceDuelUntilChoice(nextDuel)

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
