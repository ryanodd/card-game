import styles from "./PlayArea.module.css"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { DuelCard } from "./DuelCard"
import { SortableContext, SortingStrategy, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"

import { useMemo } from "react"
import { DuelState } from "@/src/game/duel/DuelData"
import { takeTurn_executePlayCard } from "@/src/game/duel/choices/takeTurn/executePlayCard"
import { saveAndAdvanceDuelUntilChoiceOrWinner } from "@/src/game/duel/control/saveAndAdvanceDuelUntilChoiceOrWinner"
import { takeTurn_getValidTargetsForCard } from "@/src/game/duel/choices/takeTurn/getValidTargetsForCard"

export type RowProps = {
  duel: DuelState
  index: number
}

export const Row = ({ duel, index }: RowProps) => {
  const { humanAllRowCardIds } = useDuelUIStore()
  const humanRowCardIds = humanAllRowCardIds[index]

  // IMPORTANT: There's a hard-to-discover bug with react-dnd:
  // if you pass a different instance of your itemIds array (even if the values are the same)
  // it will mess up the animations.
  const sortableItemIdsForHumanRowHalf = useMemo(
    () =>
      humanRowCardIds.map((cardId) => {
        return `draggable-card-${cardId}`
      }),
    [humanRowCardIds]
  )

  const getHumanCards = () => {
    const spaces = []
    for (let x = 0; x < humanRowCardIds.length; x++) {
      const cardState = duel.human.rows[index].find((card) => {
        return card.instanceId === humanRowCardIds[x]
      })
      if (!cardState) {
        continue
      }
      spaces.push(<DuelCard key={cardState.instanceId} duel={duel} playerId="human" cardState={cardState} />)
    }
    return spaces
  }

  const opponentCards = duel.opponent.rows[index]
  const getOpponentCards = () => {
    const spaces = []
    for (let x = 0; x < opponentCards.length; x++) {
      const card = opponentCards[x]
      spaces.push(<DuelCard key={card.instanceId} duel={duel} playerId="opponent" cardState={card} />)
    }
    return spaces
  }

  const { cardIdDragging, energySelected } = useDuelUIStore()

  const choiceId = duel.choice.id

  const DROPPABLE_ID = `droppable-rowHumanHalf-${index}`
  const { active, attributes, isDragging, listeners, over, setNodeRef, transition, transform } = useSortable({
    id: DROPPABLE_ID,
    data: {
      type: "container",
      children: sortableItemIdsForHumanRowHalf,
    },
  })

  const isOver = over
    ? (DROPPABLE_ID === over.id && active?.data.current?.type !== "container") ||
      humanRowCardIds.some((cardId) => cardId === over.id)
    : false

  const humanHalfSelectable =
    choiceId === "TAKE_TURN" &&
    cardIdDragging !== null &&
    takeTurn_getValidTargetsForCard(duel, cardIdDragging, getEnergyCountsFromSelected(energySelected)).find(
      (target) => {
        return target.targetType === "rowSpace" && target.rowIndex === index
      }
    ) !== undefined

  useDndMonitor({
    onDragEnd: async (event) => {
      if (
        !event.active.id.toString().startsWith("draggable-card-") ||
        !humanHalfSelectable ||
        (event.over?.id.toString() !== DROPPABLE_ID &&
          !humanRowCardIds.includes(event.over?.id?.toString()?.split("draggable-card-")?.[1] ?? "N/A"))
      ) {
        return
      }

      const draggedCardInstanceId = event.active.id.toString().split("draggable-card-")[1]
      const activeIndex = duel.human.rows[index]
        .map((card) => card.instanceId)
        .indexOf(event.over?.id?.toString()?.split("draggable-card-")?.[1] ?? "N/A")

      // Moved to container, but not a specific slot - plop down at the end?? Maybe this needs more thinking.
      if (event.over?.id.toString() === DROPPABLE_ID) {
        const newDuel = await takeTurn_executePlayCard(duel, {
          cardIdToPlay: draggedCardInstanceId,
          target: {
            targetType: "rowSpace",
            playerId: "human",
            rowIndex: index,
            positionIndex: 0,
          },
          energyPaid: getEnergyCountsFromSelected(energySelected),
        })
        saveAndAdvanceDuelUntilChoiceOrWinner(newDuel)
      } else {
        if (activeIndex === -1) {
          throw Error(`Couldn't find where this card was dragged to. Supposedly ${event.over?.id?.toString()}`)
        }
        const newDuel = await takeTurn_executePlayCard(duel, {
          cardIdToPlay: draggedCardInstanceId,
          target: { targetType: "rowSpace", playerId: "human", rowIndex: index, positionIndex: activeIndex },
          energyPaid: getEnergyCountsFromSelected(energySelected),
        })
        saveAndAdvanceDuelUntilChoiceOrWinner(newDuel)
      }
    },
  })

  const humanHalfHighlighted = humanHalfSelectable

  return (
    <div className={`${styles.row}`}>
      <SortableContext items={sortableItemIdsForHumanRowHalf} strategy={horizontalListSortingStrategy}>
        <div className={`${styles.rowHalf} ${styles.rowHumanHalf}`}>
          <div
            className={`${styles.rowHalfDropTarget}`}
            data-selectable={humanHalfSelectable}
            data-highlighted={humanHalfHighlighted}
            data-dragging-over={isOver}
            ref={setNodeRef}
          />
          {getHumanCards()}
        </div>
      </SortableContext>
      <div className={`${styles.rowHalf}`}>{getOpponentCards()}</div>
    </div>
  )
}
