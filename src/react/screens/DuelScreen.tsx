import { MainView } from "../components/MainView"
import { DeckPile } from "../components/DuelScreen/DeckPile"
import { PlayerHand } from "../components/DuelScreen/PlayerHand"
import { DiscardPile } from "../components/DuelScreen/DiscardPile"
import { OpponentHand } from "../components/DuelScreen/OpponentHand"
import { GameBackground } from "../components/GameBackground"
import { useEffect } from "react"
import { useForceUpdate } from "../hooks/useForceUpdate"
import { dummyGameState, useDuelStore } from "../hooks/useDuelStore"
import { ChoiceID } from "@/src/game/Choices"
import { createNewDuel } from "@/src/game/createNewDuel"
import { saveAndRerenderDuel } from "@/src/game/DuelController"

import buttonStyles from "../components/Button.module.css"
import { DuelPrompt } from "../components/DuelScreen/DuelPrompt"
import { useGameStore } from "../hooks/useGameStore"
import { PlayerFaceArea } from "../components/DuelScreen/PlayerFaceArea"
import { CreatureArea } from "../components/DuelScreen/CreatureArea"
import { AdvanceTurnButton } from "../components/DuelScreen/AdvanceTurnButton"
import { TurnPhaseIndicator } from "../components/DuelScreen/TurnPhaseIndicator"

export type DuelScreenProps = {}

export const DuelScreen = ({}: DuelScreenProps) => {
  const { duel, setDuel } = useDuelStore()
  const { game } = useGameStore()

  // Create new duel
  useEffect(() => {
    setDuel(
      createNewDuel({
        game,
        opponentDeckCardNos: [1, 2, 6, 8, 1, 8, 6, 1, 2, 6, 8, 1, 8, 6, 1, 2, 6, 8, 1, 8, 6],
      })
    )
  }, [])

  return (
    <MainView>
      <GameBackground />
      <div className="absolute inset-0 z-10 flex flex-col justify-between gap-4 items-center">
        <div className="w-full max-w-7xl flex justify-between items-center gap-4 p-4">
          <PlayerFaceArea playerId="opponent" />
          <OpponentHand cards={duel.opponent.hand} />
          <DeckPile />
        </div>

        <div className="flex justify-center gap-4 items-center">
          <CreatureArea />
          <div className="flex flex-col gap-2">
            <TurnPhaseIndicator />
            <AdvanceTurnButton />
          </div>
        </div>
        <div className="w-full max-w-7xl flex justify-between items-center p-4  gap-4">
          <PlayerFaceArea playerId="human" />
          <PlayerHand cards={duel.human.hand} />
          <DeckPile />
        </div>
      </div>
      <DuelPrompt />
    </MainView>
  )
}
