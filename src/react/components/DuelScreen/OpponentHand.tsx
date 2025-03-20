import styles from "./Hand.module.css"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"

import { DuelCard } from "./DuelCard"
import { DuelState } from "@/src/game/duel/DuelData"

export type OpponentHandProps = {
  duel: DuelState
}

export const OpponentHand = ({ duel }: OpponentHandProps) => {
  const opponentHandCards = duel.opponent.hand

  const cardsToRender = opponentHandCards.map((card) => {
    return <DuelCard duel={duel} key={card.instanceId} playerId="opponent" cardState={card} />
  })
  return <div className={`${styles.opponent_hand_container} `}>{cardsToRender}</div>
}
