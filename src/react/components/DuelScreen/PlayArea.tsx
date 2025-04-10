import styles from "./PlayArea.module.css"
import animationLayerStyles from "./PlayAreaAnimationLayer.module.css"

import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { DuelState } from "@/src/game/duel/DuelData"
import { duelWinner } from "@/src/game/duel/DuelHelpers"
import { takeTurn_getValidTargetsForCard } from "@/src/game/duel/choices/takeTurn/getValidTargetsForCard"
import { takeTurn_executePlayCard } from "@/src/game/duel/choices/takeTurn/executePlayCard"
import { saveAndAdvanceDuelUntilChoiceOrWinner } from "@/src/game/duel/control/saveAndAdvanceDuelUntilChoiceOrWinner"
import { HumanRow } from "./HumanRow"
import { OpponentRow } from "./OpponentRow"
import { HeroArea } from "./HeroArea"

export type PlayAreaProps = {
  duel: DuelState
}

export const PlayArea = ({ duel }: PlayAreaProps) => {
  const choiceId = duel.choice.id
  const { cardIdDragging, energySelected } = useDuelUIStore()

  const playAreaSelectable =
    !duelWinner(duel) &&
    duel.currentAnimation === null &&
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
    onDragEnd: async (event) => {
      if (
        event.over?.id.toString() !== DROPPABLE_ID ||
        !event.active.id.toString().startsWith("draggable-card-") ||
        !playAreaSelectable
      ) {
        return
      }
      const draggedCardInstanceId = event.active.id.toString().split("draggable-card-")[1]
      if (choiceId === "TAKE_TURN") {
        const newDuel = await takeTurn_executePlayCard(duel, {
          cardIdToPlay: draggedCardInstanceId,
          target: { targetType: "playArea" },
          energyPaid: getEnergyCountsFromSelected(energySelected),
        })
        saveAndAdvanceDuelUntilChoiceOrWinner(newDuel)
      }
    },
  })

  // const animation = duel.currentAnimation?.id === "PLAYER_AIR_ACTION"

  return (
    <div className={`${styles.playArea}`}>
      <div
        className={animationLayerStyles.playAreaAnimationLayer}
        // data-animation-ancestral-presence={animationAncestralPresence}
      />
      <div
        className={`${styles.playAreaDropTarget}`}
        ref={setNodeRef}
        data-selectable={playAreaSelectable}
        data-highlighted={playAreaHighlighted}
        data-dragging-over={isOver}
      />
      <div className={styles.playAreaBackground} />
      <div className={styles.playAreaTopRow}>
        <HeroArea duel={duel} playerId="human" />
        <OpponentRow />
      </div>
      <div className={styles.playAreaBottomRow}>
        <HumanRow />
        <HeroArea duel={duel} playerId="opponent" />
      </div>
    </div>
  )
}
