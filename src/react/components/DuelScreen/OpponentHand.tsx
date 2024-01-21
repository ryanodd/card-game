import { CardState, DuelState } from "@/src/game/DuelData"
import { CardPreview } from "../CardPreview"
import styles from "./Hand.module.css"
import { CardBackTexture } from "../CardBackTexture"

export type OpponentHandProps = {
  duel: DuelState
  cards: CardState[]
}

export const OpponentHand = ({ duel, cards }: OpponentHandProps) => {
  const cardsToRender = cards.map((card) => {
    return <CardBackTexture key={card.instanceId} />
  })
  return <div className={`${styles.hand_container} `}>{cardsToRender}</div>
}
