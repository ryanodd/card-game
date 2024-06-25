import { autoPayElements, getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"

import { CSS } from "@dnd-kit/utilities"
import styles from "./DuelCard.module.css"
import { CardPreview } from "../CardPreview"

import { useDndMonitor, useDraggable } from "@dnd-kit/core"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"

import cardStyles from "../Card.module.css"
import { useSortable } from "@dnd-kit/sortable"
import { CardState, DuelState } from "@/src/game/duel/DuelData"
import { duelWinner, getDuelPlayerById } from "@/src/game/duel/DuelHelpers"
import { takeTurn_getValidHandTargets } from "@/src/game/duel/choices/takeTurn/getValidHandTargets"
import { resetDuelUIStore } from "@/src/game/duel/control/resetDuelUIStore"
import { PlayerID } from "@/src/game/duel/PlayerData"

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
    duel.currentAnimation === null &&
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

  const animationOpponentSummon =
    duel.currentAnimation?.id === "SUMMON" &&
    duel.currentAnimation.cardId === cardState.instanceId &&
    playerId === "opponent"

  // TODO summoning sickness
  const isInAttackingPosition =
    duel.human.rows[rowIndex]?.findIndex((card) => {
      return card.instanceId === cardState.instanceId
    }) === 0 ||
    duel.opponent.rows[rowIndex]?.findIndex((card) => {
      return card.instanceId === cardState.instanceId
    }) === 0

  const animationAttackStart =
    duel.currentAnimation?.id === "ATTACK_START" &&
    rowIndex === duel.currentAnimation?.rowIndex &&
    isInAttackingPosition
  const animationAttackEnd =
    duel.currentAnimation?.id === "ATTACK_END" && rowIndex === duel.currentAnimation?.rowIndex && isInAttackingPosition

  const animationDestroyStart =
    duel.currentAnimation?.id === "DESTROY_START" && duel.currentAnimation?.cardIds.includes(cardState.instanceId)
  const animationDestroyEnd =
    duel.currentAnimation?.id === "DESTROY_END" && duel.currentAnimation?.cardIds.includes(cardState.instanceId)

  const animationEmberFoxling =
    duel.currentAnimation?.id === "EMBER_FOXLING" && duel.currentAnimation.attackingCardId === cardState.instanceId

  return (
    <div
      className={`${styles.duelCard} relative ${isDragging ? "opacity-0" : ""} ${
        selectable ? cardStyles.card_selectable : ""
      } ${highlighted ? cardStyles.card_highlighted : ""}`}
      data-player-id={playerId}
      data-animation-opponent-summon={animationOpponentSummon}
      data-animation-attack-start={animationAttackStart}
      data-animation-attack-end={animationAttackEnd}
      data-animation-destroy-start={animationDestroyStart}
      data-animation-destroy-end={animationDestroyEnd}
      data-animation-ember-foxling={animationEmberFoxling}
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
