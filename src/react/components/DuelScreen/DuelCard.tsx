import { CardState, DuelState, PlayerID } from "@/src/game/DuelData"
import { autoPayElements, getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"

import { CSS } from "@dnd-kit/utilities"
import styles from "./DuelCard.module.css"
import { CardPreview } from "../CardPreview"
import { duelWinner, getDuelPlayerById } from "@/src/game/DuelHelpers"
import { takeTurn_getValidHandTargets, takeTurn_getValidTargetsForCard } from "@/src/game/Choices"
import { resetDuelUIStore } from "@/src/game/DuelController"
import { useDndMonitor, useDraggable } from "@dnd-kit/core"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"

import cardStyles from "../Card.module.css"
import { useSortable } from "@dnd-kit/sortable"

export type DuelCardProps = {
  duel: DuelState
  playerId: PlayerID
  cardState: CardState
}

export const DuelCard = ({ duel, playerId, cardState }: DuelCardProps) => {
  const { cardIdDragging, setCardIdDragging, energySelected, setEnergySelected } = useDuelUIStore()

  const choiceId = duel.choice.id

  const selectable =
    !duelWinner(duel) &&
    !("animation" in duel) &&
    choiceId === "TAKE_TURN" &&
    !cardIdDragging &&
    takeTurn_getValidHandTargets(duel).includes(cardState.instanceId)

  const highlighted = selectable && !cardIdDragging

  const DRAGGABLE_ID = `draggable-card-${cardState.instanceId}`
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: DRAGGABLE_ID,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const [isTooltipOpen, setIsTooltipOpen] = useHideTooltipWhileDragging(isDragging)
  useDndMonitor({
    onDragStart: (event) => {
      if (event.active.id !== DRAGGABLE_ID) {
        return
      }
      setCardIdDragging(cardState.instanceId)
      if (selectable) {
        setEnergySelected(autoPayElements(duel, cardState.instanceId, energySelected))
      }
    },
    onDragEnd: (event) => {
      if (event.active.id !== DRAGGABLE_ID) {
        return
      }
      resetDuelUIStore(duel)
    },
  })

  let rowIndex: number = getDuelPlayerById(duel, playerId).rows.findIndex((row) =>
    row.some((card) => card.instanceId === cardState.instanceId)
  )

  // TODO summoning sickness
  const isInAttackingPosition =
    duel.human.rows[rowIndex]?.findIndex((card) => {
      return card.instanceId === cardState.instanceId
    }) === 0 ||
    duel.opponent.rows[rowIndex]?.findIndex((card) => {
      return card.instanceId === cardState.instanceId
    }) === 0

  const animationAttackStart =
    "animation" in duel &&
    duel.animation.id === "ATTACK_START" &&
    rowIndex === duel.animation.rowIndex &&
    isInAttackingPosition
  const animationAttackEnd =
    "animation" in duel &&
    duel.animation.id === "ATTACK_END" &&
    rowIndex === duel.animation.rowIndex &&
    isInAttackingPosition

  return (
    <div
      className={`${styles.duelCard} relative ${isDragging ? "opacity-0" : ""} ${
        selectable ? cardStyles.card_selectable : ""
      } ${highlighted ? cardStyles.card_highlighted : ""}`}
      data-player-id={playerId}
      data-animation-attack-start={animationAttackStart}
      data-animation-attack-end={animationAttackEnd}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <CardPreview
        duel={duel}
        cardState={cardState}
        isTooltipOpen={isTooltipOpen}
        setIsTooltipOpen={setIsTooltipOpen}
        showCostIcons
      />
    </div>
  )
}
