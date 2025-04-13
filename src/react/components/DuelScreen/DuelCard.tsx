import {
  autoPayElements,
  getEnergyCountsFromSelected,
  resetEnergySelected,
  useDuelUIStore,
} from "../../hooks/useDuelUIStore"

import { CSS } from "@dnd-kit/utilities"

import { CardPreview, getCardHealthDisplayValue } from "../Card/CardPreview"
import FireIcon from "../../../../public/icons/fire.svg"
import LightningIcon from "../../../../public/icons/lightning.svg"
import WaterIcon from "../../../../public/icons/water.svg"

import { useDndMonitor } from "@dnd-kit/core"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"

import cardStyles from "../Card/Card.module.css"
import animationFilterStyles from "./DuelCard.module.css"
import animationLayerStyles from "./DuelCardAnimationLayer.module.css"
import { useSortable } from "@dnd-kit/sortable"
import { CardState, DuelState } from "@/src/game/duel/DuelData"
import { duelWinner, getDuelPlayerById, isDuelCardInHand } from "@/src/game/duel/DuelHelpers"
import { PlayerID } from "@/src/game/duel/PlayerData"
import { takeTurn_getPlayableHandCardIds } from "@/src/game/duel/choices/takeTurn/getPlayableHandCardIds"
import { AnimatedNumber } from "../designSystem/AnimatedNumber"
import Image from "next/image"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"
import { isEnergySufficient } from "@/src/game/duel/energy/isEnergySufficient"

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
        if (!isEnergySufficient(getEnergyCountsFromSelected(energySelected), cardState.cost, true)) {
          resetEnergySelected(energySelected)
          setEnergySelected(autoPayElements(duel, cardState.instanceId, energySelected))
        }
      }
    },
    // There's a bug here where onDragEnd doesn't get called for the dragged card. So I try to handle one-time things in DuelScreen instead
    // onDragEnd: (event) => {
    // if (event.active.id !== DRAGGABLE_ID) {
    //   return
    // }
    // },
  })

  const modifierBurn = cardState.cardType === "creature" && cardState.status === "burn"
  const modifierStun = cardState.cardType === "creature" && cardState.status === "stun"
  const modifierPoison = cardState.cardType === "creature" && cardState.status === "poison"

  const animationDraw = duel.currentAnimation?.id === "DRAW" && duel.currentAnimation.cardId === cardState.instanceId
  const animationDiscardHand =
    duel.currentAnimation?.id === "DISCARD_HAND" && isDuelCardInHand(duel, cardState.instanceId)

  const animationOpponentSummon =
    duel.currentAnimation?.id === "SUMMON" &&
    duel.currentAnimation.cardId === cardState.instanceId &&
    playerId === "opponent"

  const animationAttackStart =
    duel.currentAnimation?.id === "ATTACK_START" && duel.currentAnimation.cardIds.includes(cardState.instanceId)
  const animationAttackEnd =
    duel.currentAnimation?.id === "ATTACK_END" && duel.currentAnimation.cardIds.includes(cardState.instanceId)

  const animationDestroyStart =
    duel.currentAnimation?.id === "DESTROY_START" && duel.currentAnimation?.cardIds.includes(cardState.instanceId)
  const animationDestroyEnd =
    duel.currentAnimation?.id === "DESTROY_END" && duel.currentAnimation?.cardIds.includes(cardState.instanceId)

  const animationBurn = duel.currentAnimation?.id === "BURN" && duel.currentAnimation.cardId === cardState.instanceId
  const animationStun = duel.currentAnimation?.id === "STUN" && duel.currentAnimation.cardId === cardState.instanceId

  const animationFireAction =
    duel.currentAnimation?.id === "CARD_FIRE_ACTION" && duel.currentAnimation.cardId === cardState.instanceId
  const animationWaterAction =
    duel.currentAnimation?.id === "CARD_WATER_ACTION" && duel.currentAnimation.cardId === cardState.instanceId
  const animationEarthAction =
    duel.currentAnimation?.id === "CARD_EARTH_ACTION" && duel.currentAnimation.cardId === cardState.instanceId
  const animationAirAction =
    duel.currentAnimation?.id === "CARD_AIR_ACTION" && duel.currentAnimation.cardId === cardState.instanceId

  const animationRollFail =
    duel.currentAnimation?.id === "ROLL_FAIL" && duel.currentAnimation.cardId === cardState.instanceId

  return (
    <div
      className={`${cardStyles.duelCardDragTarget} ${cardStyles.card_size} relative ${
        selectable ? cardStyles.card_selectable : ""
      }`}
      data-dragging={isDragging}
      data-player-id={playerId}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className={`${cardStyles.duelCardDragTargetResizer}`}>
        <div
          className={`${animationFilterStyles.duelCardTransformLayer} `}
          data-dragging={isDragging}
          data-player-id={playerId}
          data-modifier-burn={modifierBurn}
          data-modifier-stun={modifierStun}
          data-modifier-poison={modifierPoison}
          data-animation-draw={animationDraw}
          data-animation-discard-hand={animationDiscardHand}
          data-animation-opponent-summon={animationOpponentSummon}
          data-animation-attack-start={animationAttackStart}
          data-animation-attack-end={animationAttackEnd}
          data-animation-destroy-start={animationDestroyStart}
          data-animation-destroy-end={animationDestroyEnd}
          data-animation-burn={animationBurn}
          data-animation-stun={animationStun}
          data-animation-roll-fail={animationRollFail}
        >
          <div
            className={`${animationLayerStyles.duelCardOverlayLayer} `}
            data-animation-opponent-summon={animationOpponentSummon}
            data-animation-attack-start={animationAttackStart}
            data-animation-attack-end={animationAttackEnd}
            data-animation-destroy-start={animationDestroyStart}
            data-animation-destroy-end={animationDestroyEnd}
            data-animation-burn={animationBurn}
            data-animation-stun={animationStun}
            data-animation-roll-fail={animationRollFail}
            data-animation-fire-action={animationFireAction}
            data-animation-water-action={animationWaterAction}
            data-animation-earth-action={animationEarthAction}
            data-animation-air-action={animationAirAction}
          >
            <div
              className={`${animationLayerStyles.duelCardStatusOverlayLayer}`}
              data-modifier-burn={modifierBurn}
              data-modifier-stun={modifierStun}
              data-modifier-poison={modifierPoison}
            />
            <div className={`${animationLayerStyles.duelCardOverlayLayerDrawing}`} />
          </div>
          <div className={`${animationLayerStyles.duelCardUnderlayLayer}`} data-animation-highlighted={highlighted} />
          {cardState.cardType === "creature" && cardState.shield && (
            <div className={animationLayerStyles.duelCardShield} />
          )}
          <CardPreview
            duel={duel}
            cardState={cardState}
            isTooltipOpen={isTooltipOpen}
            setIsTooltipOpen={setIsTooltipOpen}
            showCostIcons
            isDragging={isDragging}
          />
        </div>
        {"health" in cardState && <AnimatedNumber value={getCardHealthDisplayValue(cardState)} />}
      </div>
    </div>
  )
}
