import { CardState } from "@/src/game/DuelData"
import { CardPreview } from "../CardPreview"
import styles from "./Hand.module.css"
import { HandCard } from "./HandCard"

export type PlayerHandProps = {
  cards: CardState[]
}

export const PlayerHand = ({ cards }: PlayerHandProps) => {
  const cardsToRender = cards.map((card) => {
    return <HandCard key={card.id} cardState={card} />
  })
  return <div className={`${styles.hand_container}`}>{cardsToRender}</div>
}
