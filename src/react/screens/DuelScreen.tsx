import { MainView } from "../components/MainView"
import { DeckPile } from "../components/DuelScreen/DeckPile"
import { OpponentHand } from "../components/DuelScreen/OpponentHand"
import { GameBackground } from "../components/GameBackground"
import { useDuelState } from "../hooks/useDuelState"
import { DuelPrompt } from "../components/DuelScreen/DuelPrompt"
import { useGameStore } from "../hooks/useGameStore"
import { HeroArea } from "../components/DuelScreen/HeroArea"
import { PlayArea } from "../components/DuelScreen/PlayArea"
import { AdvanceTurnButton } from "../components/DuelScreen/AdvanceTurnButton"

import { useCallback, useEffect } from "react"

import { DuelMenuButton } from "../components/DuelScreen/DuelMenuButton"
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { CardPreview } from "../components/Card/CardPreview"
import { DebugMenu } from "../components/DuelScreen/DebugMenu"
import { useDuelUIStore } from "../hooks/useDuelUIStore"
import { HumanHand } from "../components/DuelScreen/HumanHand"
import { duelWinner, getCardByInstanceId } from "@/src/game/duel/DuelHelpers"
import { resetDuelUIStore } from "@/src/game/duel/control/resetDuelUIStore"
import { DuelCompleteContent } from "../components/DuelComplete/DuelCompleteContent"
import { DuelCompleteDialog } from "../components/DuelComplete/DuelCompleteDialog"
import { CardSelectDialog } from "../components/DuelScreen/CardSelectDialog"
import { Portal } from "@radix-ui/react-portal"
import { ControlButtonPopup } from "../components/DuelScreen/ControlButtonPopup"
import { takeTurn_getPlayableHandCardIds } from "@/src/game/duel/choices/takeTurn/getPlayableHandCardIds"

import styles from "./DuelScreen.module.css"

// Only works for human hand/row interactions
const findContainerDroppableIdByDraggableId = (
  draggableId: string,
  humanHandCardIds: string[],
  humanRowCardIds: string[]
) => {
  if (draggableId === "droppable-human-hand" || draggableId?.startsWith("droppable-rowHumanHalf-")) {
    return draggableId
  }

  if (draggableId.startsWith("draggable-card-")) {
    const cardId = draggableId.split("draggable-card-")[1]
    if (humanHandCardIds.includes(cardId)) {
      return "droppable-human-hand"
    }
    if (humanRowCardIds.includes(cardId)) {
      return `droppable-rowHumanHalf`
    }
  }
}

export type DuelScreenProps = {}

export const DuelScreen = ({}: DuelScreenProps) => {
  const { game } = useGameStore()
  const { duel } = useDuelState()

  const { cardIdDragging, humanHandCardIds, setHumanHandCardIds, humanRowCardIds, setHumanRowCardIds, debugEnabled } =
    useDuelUIStore()

  useEffect(() => {
    resetDuelUIStore(duel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // This animates the card dragging between hand/rows.
  // On drag over, simply handle a row change, by adding the dragged item to the end of the new row.
  // dnd-kit handles the rest, really.
  const handleDragOver = useCallback(
    (event: DragEndEvent) => {
      if (!event.over) {
        return
      }
      const draggedId = event.active.id as string
      const overId = event.over.id as string

      if (!draggedId.startsWith("draggable-card-") && overId === "play-area") {
        return
      }
      const draggedCardId = draggedId.split("draggable-card-")[1]

      const activeContainer = findContainerDroppableIdByDraggableId(draggedId, humanHandCardIds, humanRowCardIds)
      const overContainer = findContainerDroppableIdByDraggableId(overId, humanHandCardIds, humanRowCardIds)

      if (activeContainer === overContainer) {
        return
      }

      // From hand to row
      if (activeContainer === "droppable-human-hand" && overContainer === "droppable-rowHumanHalf") {
        // Don't allow dragging into play area when unselectable (btw we still allow drag and drop within hand)
        const choiceId = duel.choice.id
        const selectable =
          !duelWinner(duel) && choiceId === "TAKE_TURN" && takeTurn_getPlayableHandCardIds(duel).includes(draggedCardId)
        if (!selectable) {
          return
        }

        setHumanRowCardIds([draggedCardId, ...humanRowCardIds])
        setHumanHandCardIds(humanHandCardIds.filter((cardId) => cardId !== draggedCardId))

        // From row to hand
      } else if (activeContainer === "droppable-rowHumanHalf" && overContainer === "droppable-human-hand") {
        setHumanRowCardIds(humanRowCardIds.filter((cardId) => cardId !== draggedCardId))
        setHumanHandCardIds([draggedCardId, ...humanHandCardIds])
        // From row to row
        // } else if (
        //   activeContainer?.startsWith("droppable-rowHumanHalf-") &&
        //   overContainer?.startsWith("droppable-rowHumanHalf-")
        // ) {
        //   const rowIndexFrom = getRowIndexFromDroppableId(activeContainer)
        //   const rowIndexTo = getRowIndexFromDroppableId(overContainer)
        //   if (rowIndexFrom === undefined || rowIndexTo === undefined) {
        //     throw Error("rowIndex undefined??")
        //   }
        //   const newRowIndexesIds = humanAllRowCardIds
        //   newRowIndexesIds[rowIndexTo] = [draggedCardId, ...humanAllRowCardIds[rowIndexTo]]
        //   newRowIndexesIds[rowIndexFrom] = humanAllRowCardIds[rowIndexFrom].filter((cardId) => cardId !== draggedCardId)
        //   setHumanAllRowCardIds(newRowIndexesIds)
      }
    },
    [duel, humanHandCardIds, humanRowCardIds, setHumanHandCardIds, setHumanRowCardIds] // Careful of bugs here
  )

  const handleDragEnd = useCallback(() => {
    resetDuelUIStore(duel)
  }, [duel])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  )

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCenter}

      onDragOver={handleDragOver}
      // Also handled by many various droppable targets with useDndMonitor
      onDragEnd={handleDragEnd}

      // Handled by DuelCard:
      // onDragStart={handleDragStart}
      // onDragCancel={handleDragCancel}
    >
      <DragOverlay dropAnimation={null}>
        {cardIdDragging !== null && (
          <CardPreview
            duel={duel}
            cardState={getCardByInstanceId(duel, cardIdDragging)}
            isTooltipOpen={false}
            showCostIcons
          />
        )}
      </DragOverlay>
      <DuelCompleteDialog />
      <CardSelectDialog duel={duel} />
      <div className={styles.duelScreen}>
        <div className={styles.opponentRow}>
          <OpponentHand duel={duel} />
          <DeckPile />
        </div>
        <PlayArea duel={duel} />
        <div className={styles.humanRow}>
          <HumanHand duel={duel} cardIds={humanHandCardIds} />
          <DeckPile />
        </div>
        <DuelMenuButton />
      </div>
      {debugEnabled && <DebugMenu />}
      <div className="absolute bottom-56 right-4 z-20">
        <AdvanceTurnButton duel={duel} />
      </div>
      <DuelPrompt duel={duel} />
      <ControlButtonPopup duel={duel} />
    </DndContext>
  )
}
