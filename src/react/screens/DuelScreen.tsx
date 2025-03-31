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

// Throws error if given a non-rowHumanHalf droppableId
const getRowIndexFromDroppableId = (droppableId: string): number | undefined => {
  if (!droppableId.startsWith("droppable-rowHumanHalf-")) {
    throw Error(`Could not get rowIndex for droppable ${droppableId}`)
  }
  const rowIndexStr = droppableId.split("droppable-rowHumanHalf-")[1]
  const rowIndex = parseFloat(rowIndexStr)
  return rowIndex
}

// Only works for human hand/row interactions
const findContainerDroppableIdByDraggableId = (
  draggableId: string,
  humanHandCardIds: string[],
  humanAllRowCardIds: string[][]
) => {
  if (draggableId === "droppable-human-hand" || draggableId?.startsWith("droppable-rowHumanHalf-")) {
    return draggableId
  }

  if (draggableId.startsWith("draggable-card-")) {
    const cardId = draggableId.split("draggable-card-")[1]
    if (humanHandCardIds.includes(cardId)) {
      return "droppable-human-hand"
    }
    for (let i = 0; i < humanAllRowCardIds.length; i++) {
      if (humanAllRowCardIds[i].includes(cardId)) {
        return `droppable-rowHumanHalf-${i}`
      }
    }
  }
}

export type DuelScreenProps = {}

export const DuelScreen = ({}: DuelScreenProps) => {
  const { game } = useGameStore()
  const { duel } = useDuelState()

  const {
    cardIdDragging,
    humanHandCardIds,
    setHumanHandCardIds,
    humanAllRowCardIds,
    setHumanAllRowCardIds,
    debugEnabled,
  } = useDuelUIStore()

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

      const activeContainer = findContainerDroppableIdByDraggableId(draggedId, humanHandCardIds, humanAllRowCardIds)
      const overContainer = findContainerDroppableIdByDraggableId(overId, humanHandCardIds, humanAllRowCardIds)

      if (activeContainer === overContainer) {
        return
      }

      // From hand to row
      if (activeContainer === "droppable-human-hand" && overContainer?.startsWith("droppable-rowHumanHalf-")) {
        const rowIndexTo = getRowIndexFromDroppableId(overContainer)
        if (rowIndexTo === undefined) {
          throw Error("rowIndex undefined??")
        }

        // Don't allow dragging into play area when unselectable (btw we still allow drag and drop within hand)
        const choiceId = duel.choice.id
        const selectable =
          !duelWinner(duel) && choiceId === "TAKE_TURN" && takeTurn_getPlayableHandCardIds(duel).includes(draggedCardId)
        if (!selectable) {
          return
        }

        const newRowIndexesIds = humanAllRowCardIds
        newRowIndexesIds[rowIndexTo] = [draggedCardId, ...humanAllRowCardIds[rowIndexTo]]

        setHumanAllRowCardIds(newRowIndexesIds)
        setHumanHandCardIds(humanHandCardIds.filter((cardId) => cardId !== draggedCardId))

        // From row to hand
      } else if (activeContainer?.startsWith("droppable-rowHumanHalf-") && overContainer === "droppable-human-hand") {
        const rowIndexFrom = getRowIndexFromDroppableId(activeContainer)

        if (rowIndexFrom === undefined) {
          throw Error("rowIndex undefined??")
        }
        const newRowIndexesIds = humanAllRowCardIds
        newRowIndexesIds[rowIndexFrom] = humanAllRowCardIds[rowIndexFrom].filter((cardId) => cardId !== draggedCardId)
        setHumanAllRowCardIds(newRowIndexesIds)
        setHumanHandCardIds([...humanHandCardIds, draggedCardId])
        // From row to row
      } else if (
        activeContainer?.startsWith("droppable-rowHumanHalf-") &&
        overContainer?.startsWith("droppable-rowHumanHalf-")
      ) {
        const rowIndexFrom = getRowIndexFromDroppableId(activeContainer)
        const rowIndexTo = getRowIndexFromDroppableId(overContainer)
        if (rowIndexFrom === undefined || rowIndexTo === undefined) {
          throw Error("rowIndex undefined??")
        }
        const newRowIndexesIds = humanAllRowCardIds
        newRowIndexesIds[rowIndexTo] = [draggedCardId, ...humanAllRowCardIds[rowIndexTo]]
        newRowIndexesIds[rowIndexFrom] = humanAllRowCardIds[rowIndexFrom].filter((cardId) => cardId !== draggedCardId)
        setHumanAllRowCardIds(newRowIndexesIds)
      }
    },
    [duel, humanHandCardIds, humanAllRowCardIds, setHumanHandCardIds, setHumanAllRowCardIds] // Careful of bugs here
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
      <div className="absolute inset-0 z-10 flex flex-col justify-between gap-4 items-center">
        <div className="w-full flex justify-between items-center gap-4 p-4 relative">
          <OpponentHand duel={duel} />
          <DeckPile />
        </div>

        <div className="flex justify-center gap-4 items-center">
          <HeroArea duel={duel} playerId="human" />
          <PlayArea duel={duel} />
          <HeroArea duel={duel} playerId="opponent" />
        </div>
        <div className="w-full flex justify-end items-center p-4 gap-4 relative">
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
