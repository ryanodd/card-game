import { CardState, DuelState } from "@/src/game/DuelData"
import { CardPreview } from "../CardPreview"
import { autoPayElements, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { ChoiceID, takeTurn_getValidHandTargets } from "@/src/game/Choices"
import cardStyles from "../Card.module.css"
import { resetDuelUIStore } from "@/src/game/DuelController"
import { duelWinner } from "@/src/game/DuelHelpers"

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
    (!cardIdToBePlayed || cardState.id === cardIdToBePlayed) &&
    takeTurn_getValidHandTargets(duel).includes(cardState.id)

  const highlighted = selectable && !cardIdToBePlayed

  return (
    <div
      className={`relative ${cardState.id === cardIdToBePlayed ? cardStyles.card_selected : ""} ${
        selectable ? cardStyles.card_selectable : ""
      } ${highlighted ? cardStyles.card_highlighted : ""}`}
      onClick={() => {
        if (!selectable) {
          return
        }

        if (cardState.id === cardIdToBePlayed) {
          resetDuelUIStore(duel)
        } else {
          setCardIdToBePlayed(cardState.id)
          setEnergySelected(autoPayElements(duel, cardState.id, energySelected))
        }
      }}
    >
      <CardPreview duel={duel} cardState={cardState} />
    </div>
  )
}
