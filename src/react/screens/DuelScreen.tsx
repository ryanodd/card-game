import { MainView } from "../components/MainView"
import { DeckPile } from "../components/DuelScreen/DeckPile"
import { OpponentHand } from "../components/DuelScreen/OpponentHand"
import { GameBackground } from "../components/GameBackground"
import { useDuelState } from "../hooks/useDuelState"
import { DuelPrompt } from "../components/DuelScreen/DuelPrompt"
import { useGameStore } from "../hooks/useGameStore"
import { PlayerFaceArea } from "../components/DuelScreen/PlayerFaceArea"
import { PlayArea } from "../components/DuelScreen/PlayArea"
import { AdvanceTurnButton } from "../components/DuelScreen/AdvanceTurnButton"
import { getAnimatedDuelState, getCardByInstanceId } from "@/src/game/DuelHelpers"
import { useCallback, useEffect } from "react"
import { resetDuelUIStore } from "@/src/game/DuelController"
import { DuelMenuButton } from "../components/DuelScreen/DuelMenuButton"
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useDndContext,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { CardPreview } from "../components/CardPreview"
import { DebugMenu } from "../components/DuelScreen/DebugMenu"
import { useDuelUIStore } from "../hooks/useDuelUIStore"
import { HumanHand } from "../components/DuelScreen/HumanHand"
import { MyDndTestRow } from "./MyDndTest"

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
  const { duel: rawDuel } = useDuelState()
  const duel = getAnimatedDuelState(rawDuel)
  const {
    cardIdDragging,
    humanHandCardIds,
    setHumanHandCardIds,
    humanAllRowCardIds,
    setHumanAllRowCardIds,
    setCardIdDragging,
  } = useDuelUIStore()

  useEffect(() => {
    resetDuelUIStore(duel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set up animation duration injection, every time the duel is showing an animation
  useEffect(() => {
    let root = document.documentElement
    if ("animation" in duel) {
      root.style.setProperty("--current-animation-duration", `${duel.animation.duration}ms`)
    }
  }, [duel])

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
        const newRowIndexesIds = humanAllRowCardIds
        newRowIndexesIds[rowIndexTo] = [...humanAllRowCardIds[rowIndexTo], draggedCardId]
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
        newRowIndexesIds[rowIndexTo] = [...humanAllRowCardIds[rowIndexTo], draggedCardId]
        newRowIndexesIds[rowIndexFrom] = humanAllRowCardIds[rowIndexFrom].filter((cardId) => cardId !== draggedCardId)
        setHumanAllRowCardIds(newRowIndexesIds)
      }
    },
    [humanHandCardIds, humanAllRowCardIds, setHumanHandCardIds, setHumanAllRowCardIds] // Careful of bugs here
  )

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
    <MainView>
      <GameBackground />
      <DndContext
        sensors={sensors}
        // collisionDetection={closestCenter}

        onDragOver={handleDragOver}

        // Handled by many various droppable targets with useDndMonitor
        // onDragEnd={handleDragEnd}

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
        <div className="absolute inset-0 z-10 flex flex-col justify-between gap-4 items-center">
          <div className="w-full max-w-7xl flex justify-between items-center gap-4 p-4">
            <DeckPile />
            <OpponentHand duel={duel} />
            <PlayerFaceArea duel={duel} playerId="opponent" />
          </div>

          <div className="flex justify-center gap-4 items-center">
            <PlayArea duel={duel} />
            <div className="flex flex-col gap-2">
              <AdvanceTurnButton duel={duel} />
            </div>
          </div>
          <div className="w-full max-w-7xl flex justify-between items-center p-4 gap-4">
            <PlayerFaceArea duel={duel} playerId="human" />
            <HumanHand duel={duel} cardIds={humanHandCardIds} />
            <DeckPile />
          </div>
          <DuelMenuButton />
        </div>
        {game.settings.debug.enabled && <DebugMenu />}
        <DuelPrompt duel={duel} />
      </DndContext>
      {/* <MyDndTest duel={duel} /> */}
    </MainView>
  )
}
