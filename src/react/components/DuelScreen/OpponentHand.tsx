import { CardState } from "@/src/game/DuelData"
import { CardPreview } from "../CardPreview"
import styles from "./Hand.module.css"

export type OpponentHandProps = {
  cards: CardState[]
}

export const OpponentHand = ({ cards }: OpponentHandProps) => {
  const cardsToRender = cards.map((card) => {
    return <CardPreview key={card.id} cardState={card} />
  })
  return <div className={`${styles.hand_container} `}>{cardsToRender}</div>
}
