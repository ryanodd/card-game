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
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: DRAGGABLE_ID,
  })
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
      className={`relative ${isDragging ? "opacity-0" : ""} ${selectable ? cardStyles.card_selectable : ""} ${
        highlighted ? cardStyles.card_highlighted : ""
      }`}
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
