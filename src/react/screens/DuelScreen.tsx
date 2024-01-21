import { MainView } from "../components/MainView"
import { DeckPile } from "../components/DuelScreen/DeckPile"
import { PlayerHand } from "../components/DuelScreen/PlayerHand"
import { OpponentHand } from "../components/DuelScreen/OpponentHand"
import { GameBackground } from "../components/GameBackground"
import { useDuelState } from "../hooks/useDuelState"
import { DuelPrompt } from "../components/DuelScreen/DuelPrompt"
import { useGameStore } from "../hooks/useGameStore"
import { PlayerFaceArea } from "../components/DuelScreen/PlayerFaceArea"
import { PlayArea } from "../components/DuelScreen/PlayArea"
import { AdvanceTurnButton } from "../components/DuelScreen/AdvanceTurnButton"
import { getAnimatedDuelState, getCardByInstanceId } from "@/src/game/DuelHelpers"
import { useEffect } from "react"
import { resetDuelUIStore } from "@/src/game/DuelController"
import { DuelMenuButton } from "../components/DuelScreen/DuelMenuButton"
import { DragOverlay, useDndContext } from "@dnd-kit/core"
import { CardPreview } from "../components/CardPreview"
import { cardDataMap } from "@/src/game/Cards"
import { useHideTooltipWhileDragging } from "../hooks/useHideTooltipWhileDragging"

export type DuelScreenProps = {}

export const DuelScreen = ({}: DuelScreenProps) => {
  const { duel: rawDuel, setDuel } = useDuelState()
  const { game } = useGameStore()

  const duel = getAnimatedDuelState(rawDuel)
  useEffect(() => {
    resetDuelUIStore(duel)
  }, [])

  const { active } = useDndContext()
  const draggedCardInstanceId = active?.id?.toString?.()?.startsWith?.("draggable-card-")
    ? active.id.toString().split("draggable-card-")[1]
    : null
  const [isTooltipOpen, setIsTooltipOpen] = useHideTooltipWhileDragging(active !== null)

  return (
    <MainView>
      <GameBackground />
      <DragOverlay dropAnimation={null}>
        {draggedCardInstanceId !== null && (
          <CardPreview
            duel={duel}
            cardState={getCardByInstanceId(duel, draggedCardInstanceId)}
            isTooltipOpen={isTooltipOpen}
            setIsTooltipOpen={setIsTooltipOpen}
          />
        )}
      </DragOverlay>
      <div className="absolute inset-0 z-10 flex flex-col justify-between gap-4 items-center">
        <div className="w-full max-w-7xl flex justify-between items-center gap-4 p-4">
          <PlayerFaceArea duel={duel} playerId="opponent" />
          <OpponentHand duel={duel} cards={duel.opponent.hand} />
          <DeckPile />
        </div>

        <div className="flex justify-center gap-4 items-center">
          <PlayArea duel={duel} />
          <div className="flex flex-col gap-2">
            <AdvanceTurnButton duel={duel} />
          </div>
        </div>
        <div className="w-full max-w-7xl flex justify-between items-center p-4 gap-4">
          <PlayerFaceArea duel={duel} playerId="human" />
          <PlayerHand duel={duel} cards={duel.human.hand} />
          <DeckPile />
        </div>
        <DuelMenuButton />
      </div>
      <DuelPrompt duel={duel} />
    </MainView>
  )
}
