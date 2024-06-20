import { DuelState } from "@/src/game/DuelData"
import styles from "./Hand.module.css"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"

import { DuelCard } from "./DuelCard"

export type OpponentHandProps = {
  duel: DuelState
}

export const OpponentHand = ({ duel }: OpponentHandProps) => {
  const opponentHandCards = duel.opponent.hand

  const cardsToRender = opponentHandCards.map((card) => {
    return <DuelCard duel={duel} key={card.instanceId} playerId="opponent" cardState={card} />
  })
  return <div className={`${styles.hand_container} `}>{cardsToRender}</div>
}
