import { autoPayElements, getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"

import { CSS } from "@dnd-kit/utilities"

import { CardPreview, getCardHealthDisplayValue } from "../CardPreview"

import { useDndMonitor, useDraggable } from "@dnd-kit/core"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"

import cardStyles from "../Card.module.css"
import animationFilterStyles from "./DuelCard.module.css"
import animationLayerStyles from "./DuelCardAnimationLayer.module.css"
import { useSortable } from "@dnd-kit/sortable"
import { CardState, DuelState } from "@/src/game/duel/DuelData"
import { duelWinner, getDuelPlayerById } from "@/src/game/duel/DuelHelpers"
import { PlayerID } from "@/src/game/duel/PlayerData"
import { takeTurn_getPlayableHandCardIds } from "@/src/game/duel/choices/takeTurn/getPlayableHandCardIds"
import { useEffect, useRef, useState } from "react"
import { AnimatedNumber } from "../designSystem/AnimatedNumber"

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
    takeTurn_getPlayableHandCardIds(duel).includes(cardState.instanceId)

  const highlighted = selectable && !cardIdDragging

  let rowIndex: number = getDuelPlayerById(duel, playerId).rows.findIndex((row) =>
    row.some((card) => card.instanceId === cardState.instanceId)
  )

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
    // There's a bug here where onDragEnd doesn't get called for the dragged card. So I try to handle one-time things in DuelScreen instead
    // onDragEnd: (event) => {
    // if (event.active.id !== DRAGGABLE_ID) {
    //   return
    // }
    // },
  })

  const summoningSickness = cardState.cardType === "creature" && cardState.summoningSickness

  const modifierBurn = cardState.modifiers.find((modifier) => modifier.id === "burn") !== undefined
  const modifierStun = cardState.modifiers.find((modifier) => modifier.id === "stun") !== undefined
  const modifierPoison = cardState.modifiers.find((modifier) => modifier.id === "poison") !== undefined

  const animationDraw = duel.currentAnimation?.id === "DRAW" && duel.currentAnimation.cardId === cardState.instanceId

  const animationOpponentSummon =
    duel.currentAnimation?.id === "SUMMON" &&
    duel.currentAnimation.cardId === cardState.instanceId &&
    playerId === "opponent"

  const animationAttackStart =
    duel.currentAnimation?.id === "ATTACK_START" && duel.currentAnimation.cardId === cardState.instanceId
  const animationAttackEnd =
    duel.currentAnimation?.id === "ATTACK_END" && duel.currentAnimation.cardId === cardState.instanceId

  const animationDestroyStart =
    duel.currentAnimation?.id === "DESTROY_START" && duel.currentAnimation?.cardIds.includes(cardState.instanceId)
  const animationDestroyEnd =
    duel.currentAnimation?.id === "DESTROY_END" && duel.currentAnimation?.cardIds.includes(cardState.instanceId)

  const animationBurn = duel.currentAnimation?.id === "BURN" && duel.currentAnimation.cardId === cardState.instanceId
  const animationStun = duel.currentAnimation?.id === "STUN" && duel.currentAnimation.cardId === cardState.instanceId

  const animationRollFail =
    duel.currentAnimation?.id === "ROLL_FAIL" && duel.currentAnimation.cardId === cardState.instanceId

  const animationEmberFoxling =
    duel.currentAnimation?.id === "EMBER_FOXLING" && duel.currentAnimation.attackingCardId === cardState.instanceId

  const animationCaveSwimmer =
    duel.currentAnimation?.id === "CAVE_SWIMMER" && duel.currentAnimation.cardId === cardState.instanceId

  const animationBrashSplasherSentinel =
    duel.currentAnimation?.id === "BRASH_SPLASHER" && duel.currentAnimation.cardId === cardState.instanceId

  const animationFlameSentinel =
    duel.currentAnimation?.id === "FLAME_SENTINEL" && duel.currentAnimation.cardId === cardState.instanceId

  return (
    <div
      className={` relative ${isDragging ? "opacity-0" : ""} ${selectable ? cardStyles.card_selectable : ""} ${
        highlighted ? cardStyles.card_highlighted : ""
      }`}
      data-player-id={playerId}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div
        className={`${animationLayerStyles.duelCardOverlayLayer} `}
        data-modifier-burn={modifierBurn}
        data-modifier-stun={modifierStun}
        data-modifier-poison={modifierPoison}
        data-animation-opponent-summon={animationOpponentSummon}
        data-animation-attack-start={animationAttackStart}
        data-animation-attack-end={animationAttackEnd}
        data-animation-destroy-start={animationDestroyStart}
        data-animation-destroy-end={animationDestroyEnd}
        data-animation-burn={animationBurn}
        data-animation-stun={animationStun}
        data-animation-roll-fail={animationRollFail}
        data-animation-ember-foxling={animationEmberFoxling}
        data-animation-cave-swimmer={animationCaveSwimmer}
        data-animation-brash-splasher={animationBrashSplasherSentinel}
        data-animation-flame-sentinel={animationFlameSentinel}
      >
        <div className={`${animationLayerStyles.duelCardOverlayLayerDrawing}`} />
      </div>
      <div
        className={`${animationFilterStyles.duelCardTransformLayer} `}
        data-player-id={playerId}
        data-modifier-summoning-sickness={summoningSickness}
        data-modifier-burn={modifierBurn}
        data-modifier-stun={modifierStun}
        data-modifier-poison={modifierPoison}
        data-animation-draw={animationDraw}
        data-animation-opponent-summon={animationOpponentSummon}
        data-animation-attack-start={animationAttackStart}
        data-animation-attack-end={animationAttackEnd}
        data-animation-destroy-start={animationDestroyStart}
        data-animation-destroy-end={animationDestroyEnd}
        data-animation-burn={animationBurn}
        data-animation-stun={animationStun}
        data-animation-roll-fail={animationRollFail}
        data-animation-ember-foxling={animationEmberFoxling}
      >
        <CardPreview
          duel={duel}
          cardState={cardState}
          isTooltipOpen={isTooltipOpen}
          setIsTooltipOpen={setIsTooltipOpen}
          showCostIcons
        />
      </div>
      {"health" in cardState && <AnimatedNumber value={getCardHealthDisplayValue(cardState)} />}
    </div>
  )
}
