import { DuelState } from "@/src/game/DuelData"
import { CreatureSpace } from "./CreatureSpace"
import styles from "./PlayArea.module.css"
import { duelWinner } from "@/src/game/DuelHelpers"
import { ChoiceID, takeTurn_executePlayCard, takeTurn_getValidTargetsForCard } from "@/src/game/Choices"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { saveAndAdvanceDuelUntilChoice } from "@/src/game/DuelController"

export const DROPPABLE_ID_CREATURE_AREA = "droppable-creature-area"

export type PlayAreaProps = {
  duel: DuelState
}

export const PlayArea = ({ duel }: PlayAreaProps) => {
  const getHumanCreatureSpaces = () => {
    const spaces = []
    for (let x = duel.human.creatureSpaces.length - 1; x >= 0; x--) {
      spaces.push(<CreatureSpace key={x} duel={duel} playerId="human" index={x} />)
    }
    return spaces
  }

  const getOpponentCreatureSpaces = () => {
    const spaces = []
    for (let x = 0; x < duel.opponent.creatureSpaces.length; x++) {
      spaces.push(<CreatureSpace key={x} duel={duel} playerId="opponent" index={x} />)
    }
    return spaces
  }

  const { cardIdToBePlayed, energySelected } = useDuelUIStore()

  const choiceId = duel.choice.id

  const humanPlayAreaSelectable =
    !duelWinner(duel) &&
    !("animation" in duel) &&
    choiceId === ChoiceID.TAKE_TURN &&
    cardIdToBePlayed !== null &&
    takeTurn_getValidTargetsForCard(duel, cardIdToBePlayed, getEnergyCountsFromSelected(energySelected)).find(
      (target) => {
        return target.targetType === "playArea" && target.playerId === "human"
      }
    ) !== undefined

  const humanPlayAreaHighlighted = humanPlayAreaSelectable

  const DROPPABLE_ID = `droppable-human-play-area`
  const { isOver, setNodeRef } = useDroppable({ id: DROPPABLE_ID })
  useDndMonitor({
    onDragEnd: (event) => {
      if (
        event.over?.id.toString() !== DROPPABLE_ID ||
        !event.active.id.toString().startsWith("draggable-card-") ||
        !humanPlayAreaSelectable
      ) {
        return
      }
      const draggedCardInstanceId = event.active.id.toString().split("draggable-card-")[1]
      if (choiceId === ChoiceID.TAKE_TURN) {
        const newDuel = takeTurn_executePlayCard(duel, {
          cardIdToPlay: draggedCardInstanceId,
          target: { targetType: "playArea", playerId: "human" },
          energyPaid: getEnergyCountsFromSelected(energySelected),
        })
        saveAndAdvanceDuelUntilChoice(newDuel)
      }
    },
  })

  return (
    <div className="p-2 rounded-lg bg-stone-900 grid grid-cols-7 grid-rows-2">
      <div className={`${styles.opponentPlayArea} p-4 bg-stone-300 grid grid-cols-7`}>
        <div className={`${styles.opponentCreatureArea} flex flex-row gap-1 bg-slate-500 rounded-lg p-1 row-`}>
          {getOpponentCreatureSpaces()}
        </div>
      </div>
      <div
        ref={setNodeRef}
        data-highlighted={humanPlayAreaHighlighted}
        data-dragging-over={isOver}
        data-selectable={humanPlayAreaSelectable}
        className={`${styles.humanPlayArea} p-4 bg-stone-300 grid grid-cols-7`}
      >
        <div className={`${styles.humanCreatureArea} flex flex-row gap-1 bg-slate-500 rounded-lg p-1`}>
          {getHumanCreatureSpaces()}
        </div>
      </div>
    </div>
  )
}
