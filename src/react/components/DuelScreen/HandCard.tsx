import { CardState, DuelState } from "@/src/game/DuelData"
import { CardPreview } from "../CardPreview"
import { autoPayElements, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { ChoiceID, takeTurn_getValidHandTargets } from "@/src/game/Choices"
import cardStyles from "../Card.module.css"
import { resetDuelUIStore } from "@/src/game/DuelController"
import { duelWinner } from "@/src/game/DuelHelpers"
import { useDndMonitor, useDraggable } from "@dnd-kit/core"
import { useHideTooltipWhileDragging } from "../../hooks/useHideTooltipWhileDragging"

export type HandCardProps = {
  duel: DuelState
  cardState: CardState
}

export const HandCard = ({ duel, cardState }: HandCardProps) => {
  const { cardIdToBePlayed, setCardIdToBePlayed, energySelected, setEnergySelected } = useDuelUIStore()

  const choiceId = duel.choice.id

  const selectable =
    !duelWinner(duel) &&
    !("animation" in duel) &&
    choiceId === ChoiceID.TAKE_TURN &&
    (!cardIdToBePlayed || cardState.instanceId === cardIdToBePlayed) &&
    takeTurn_getValidHandTargets(duel).includes(cardState.instanceId)

  const highlighted = selectable && !cardIdToBePlayed

  const DRAGGABLE_ID = `draggable-card-${cardState.instanceId}`
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: DRAGGABLE_ID,
  })
  const style = transform
    ? {
        zIndex: isDragging ? 999 : "auto",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined
  const [isTooltipOpen, setIsTooltipOpen] = useHideTooltipWhileDragging(isDragging)
  useDndMonitor({
    onDragStart: (event) => {
      if (event.active.id !== DRAGGABLE_ID) {
        return
      }
      if (selectable) {
        setCardIdToBePlayed(cardState.instanceId)
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

  return (
    <div
      className={`relative ${cardState.instanceId === cardIdToBePlayed ? cardStyles.card_selected : ""} ${
        selectable ? cardStyles.card_selectable : ""
      } ${highlighted ? cardStyles.card_highlighted : ""}`}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <CardPreview
        duel={duel}
        cardState={cardState}
        isTooltipOpen={isTooltipOpen}
        setIsTooltipOpen={setIsTooltipOpen}
      />
    </div>
  )
}
