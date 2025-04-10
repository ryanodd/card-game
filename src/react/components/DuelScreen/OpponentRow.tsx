import styles from "./PlayArea.module.css"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { DuelCard } from "./DuelCard"
import { SortableContext, SortingStrategy, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"

import { useMemo } from "react"
import { DuelState } from "@/src/game/duel/DuelData"
import { takeTurn_executePlayCard } from "@/src/game/duel/choices/takeTurn/executePlayCard"
import { saveAndAdvanceDuelUntilChoiceOrWinner } from "@/src/game/duel/control/saveAndAdvanceDuelUntilChoiceOrWinner"
import { takeTurn_getValidTargetsForCard } from "@/src/game/duel/choices/takeTurn/getValidTargetsForCard"
import { getCardByInstanceId } from "@/src/game/duel/DuelHelpers"
import { useDuelState } from "../../hooks/useDuelState"

export const OpponentRow = () => {
  const { duel } = useDuelState()
  const opponentCards = duel.opponent.row
  const getOpponentCards = () => {
    const spaces = []
    for (let x = 0; x < opponentCards.length; x++) {
      const card = opponentCards[x]
      spaces.push(<DuelCard key={card.instanceId} duel={duel} playerId="opponent" cardState={card} />)
    }
    return spaces
  }

  return <div className={`${styles.rowHalf}`}>{getOpponentCards()}</div>
}
