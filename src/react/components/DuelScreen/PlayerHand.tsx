import { CardState, DuelState } from "@/src/game/DuelData"
import { CardPreview } from "../CardPreview"
import styles from "./Hand.module.css"
import { HandCard } from "./HandCard"

export type PlayerHandProps = {
  duel: DuelState
  cards: CardState[]
}

export const PlayerHand = ({ duel, cards }: PlayerHandProps) => {
  const cardsToRender = cards.map((card) => {
    return <HandCard duel={duel} key={card.id} cardState={card} />
  })
  return <div className={`${styles.hand_container}`}>{cardsToRender}</div>
}
