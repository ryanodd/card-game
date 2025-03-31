import { CardPreview } from "../Card/CardPreview"
import styles from "./Hand.module.css"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"
import { DuelCard } from "./DuelCard"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { animateLayoutChanges } from "@/src/utils/reactDndHelpers"
import { useCallback, useMemo } from "react"
import { useDndMonitor } from "@dnd-kit/core"
import { DraggableMyDndTestItem } from "../../screens/MyDndTest"
import { DuelState } from "@/src/game/duel/DuelData"

export type HumanHandProps = {
  duel: DuelState
  cardIds: string[]
}

export const HumanHand = ({ duel }: HumanHandProps) => {
  const { setCardIdDragging, humanHandCardIds, setHumanHandCardIds } = useDuelUIStore()

  // IMPORTANT: There's a hard-to-discover bug with react-dnd:
  // if you pass a different instance of your itemIds array (even if the values are the same)
  // it will mess up the animations.
  const sortableItemIds = useMemo(
    () =>
      humanHandCardIds.map((cardId) => {
        return `draggable-card-${cardId}`
      }),
    [humanHandCardIds]
  )

  const DROPPABLE_ID = "droppable-human-hand"
  const { active, attributes, isDragging, listeners, over, setNodeRef, transition, transform } = useSortable({
    id: DROPPABLE_ID,
    data: {
      type: "container",
      children: sortableItemIds,
    },
    animateLayoutChanges,
  })

  // const isOverContainer = over
  //   ? (DROPPABLE_ID === over.id && active?.data.current?.type !== "container") ||
  //     humanHandCardIds.some((cardId) => cardId === over.id)
  //   : false

  useDndMonitor({
    onDragEnd: (event) => {
      if (event.over === null) {
        return
      }

      const draggedId = event.active.id as string
      const overId = event.over.id as string
      if (!draggedId.startsWith("draggable-card-")) {
        throw Error(`Tried to drag a non-card ${draggedId}. Maybe not an error but I'm curious`)
        return
      }
      const draggedCardId = draggedId.split("draggable-card-")[1]
      if (!draggedCardId) {
        throw Error(`failed to parse ${draggedId} as a cardId`)
      }

      // Moved to container, but not a specific slot - plop down at the end?? Maybe this needs more thinking.
      if (overId === DROPPABLE_ID) {
        const activeIndex = humanHandCardIds.indexOf(draggedCardId)
        if (activeIndex !== humanHandCardIds.length - 1) {
          setHumanHandCardIds(arrayMove(humanHandCardIds, activeIndex, humanHandCardIds.length - 1))
        }
        // Moved to position
      } else if (overId.startsWith("draggable-card-")) {
        const overCardId = overId.split("draggable-card-")[1]
        if (!overCardId) {
          throw Error(`failed to parse ${overId} as a cardId`)
        }

        const activeIndex = humanHandCardIds.indexOf(draggedCardId)
        const overIndex = humanHandCardIds.indexOf(overCardId)

        if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
          setHumanHandCardIds(arrayMove(humanHandCardIds, activeIndex, overIndex))
        }
      }
    },
  })

  const cardsToRender = humanHandCardIds.map((cardId) => {
    const cardState = duel.human.hand.find((card) => {
      return card.instanceId === cardId
    })
    if (cardState === undefined) {
      return
    }
    return <DuelCard duel={duel} playerId="human" key={`draggable-card-${cardId}`} cardState={cardState} />
  })

  return (
    <SortableContext items={sortableItemIds} strategy={horizontalListSortingStrategy}>
      <div ref={setNodeRef} className={`${styles.hand_container}`}>
        {cardsToRender}
      </div>
    </SortableContext>
  )
}
