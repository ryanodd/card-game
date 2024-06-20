import { DuelState } from "@/src/game/DuelData"
import styles from "./PlayArea.module.css"
import { duelWinner } from "@/src/game/DuelHelpers"
import { takeTurn_executePlayCard, takeTurn_getValidTargetsForCard } from "@/src/game/Choices"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { Row } from "./Row"
import { saveAndAdvanceDuelUntilChoice } from "@/src/game/DuelController"

export type PlayAreaProps = {
  duel: DuelState
}

export const PlayArea = ({ duel }: PlayAreaProps) => {
  const choiceId = duel.choice.id
  const { cardIdDragging, energySelected } = useDuelUIStore()

  const playAreaSelectable =
    !duelWinner(duel) &&
    !("animation" in duel) &&
    choiceId === "TAKE_TURN" &&
    cardIdDragging !== null &&
    takeTurn_getValidTargetsForCard(duel, cardIdDragging, getEnergyCountsFromSelected(energySelected)).find(
      (target) => {
        return target.targetType === "playArea"
      }
    ) !== undefined
  const playAreaHighlighted = playAreaSelectable

  const DROPPABLE_ID = `droppable-play-area`
  const { isOver, setNodeRef } = useDroppable({ id: DROPPABLE_ID, disabled: !playAreaSelectable })

  // TODO we definitely want to keep a part of this - playing energy should target the entire play area
  useDndMonitor({
    onDragEnd: (event) => {
      if (
        event.over?.id.toString() !== DROPPABLE_ID ||
        !event.active.id.toString().startsWith("draggable-card-") ||
        !playAreaSelectable
      ) {
        return
      }
      const draggedCardInstanceId = event.active.id.toString().split("draggable-card-")[1]
      if (choiceId === "TAKE_TURN") {
        const newDuel = takeTurn_executePlayCard(duel, {
          cardIdToPlay: draggedCardInstanceId,
          target: { targetType: "playArea" },
          energyPaid: getEnergyCountsFromSelected(energySelected),
        })
        saveAndAdvanceDuelUntilChoice(newDuel)
      }
    },
  })

  return (
    <div className={`${styles.playArea}`}>
      <div
        className={`${styles.playAreaDropTarget}`}
        ref={setNodeRef}
        data-selectable={playAreaSelectable}
        data-highlighted={playAreaHighlighted}
        data-dragging-over={isOver}
      />
      {duel.human.rows.map((row, i) => {
        return <Row key={i} duel={duel} index={i} />
      })}
    </div>
  )
}
