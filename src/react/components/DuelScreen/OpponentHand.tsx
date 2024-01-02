import { CardState, DuelState } from "@/src/game/DuelData"
import { CardPreview } from "../CardPreview"
import styles from "./Hand.module.css"

export type OpponentHandProps = {
  duel: DuelState
  cards: CardState[]
}

export const OpponentHand = ({ duel, cards }: OpponentHandProps) => {
  const cardsToRender = cards.map((card) => {
    return <CardPreview duel={duel} key={card.instanceId} cardState={card} />
  })
  return <div className={`${styles.hand_container} `}>{cardsToRender}</div>
}
