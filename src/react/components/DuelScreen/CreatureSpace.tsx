import { ChoiceID, takeTurn_executePlayCard, takeTurn_getValidTargetsForCard } from "@/src/game/Choices"
import { DuelState, PlayerID, SpaceID } from "@/src/game/DuelData"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { duelWinner } from "@/src/game/DuelHelpers"
import { saveAndAdvanceDuelUntilChoice } from "@/src/game/DuelController"
import styles from "./CreatureSpace.module.css"
import { CardPreview } from "../CardPreview"

export type CreatureSpaceProps = {
  duel: DuelState
  playerId: PlayerID
  index: number
}

export const CreatureSpace = ({ duel, playerId, index }: CreatureSpaceProps) => {
  const { cardIdToBePlayed, energySelected } = useDuelUIStore()

  const choiceId = duel.choice.id
  const playerState = playerId === "human" ? duel.human : duel.opponent
  const spaceState = playerState.creatureSpaces[index]

  const selectable =
    playerId === "human" &&
    !duelWinner(duel) &&
    !("animation" in duel) &&
    choiceId === "TAKE_TURN" &&
    cardIdToBePlayed !== null &&
    takeTurn_getValidTargetsForCard(duel, cardIdToBePlayed, getEnergyCountsFromSelected(energySelected)).find(
      (target) => {
        return target.targetType === "space" && target.spaceId === spaceState.id
      }
    ) !== undefined
  const highlighted = selectable

  const animationAttackStart =
    "animation" in duel &&
    duel.animation.id === "ATTACK_START" &&
    (duel.animation.humanAttackingSpaceId === spaceState.id ||
      duel.animation.opponentAttackingSpaceId === spaceState.id)
  const animationAttackEnd =
    "animation" in duel &&
    duel.animation.id === "ATTACK_END" &&
    (duel.animation.humanAttackingSpaceId === spaceState.id ||
      duel.animation.opponentAttackingSpaceId === spaceState.id)

  const animationEmberFoxling =
    "animation" in duel && duel.animation.id === "EMBER_FOXLING" && duel.animation.attackingSpaceId === spaceState.id

  const DROPPABLE_ID = `droppable-${spaceState.id}`
  const { isOver, setNodeRef } = useDroppable({ id: DROPPABLE_ID, disabled: !selectable })
  useDndMonitor({
    onDragEnd: (event) => {
      if (
        event.over?.id.toString() !== DROPPABLE_ID ||
        !event.active.id.toString().startsWith("draggable-card-") ||
        !selectable
      ) {
        return
      }
      const draggedCardInstanceId = event.active.id.toString().split("draggable-card-")[1]
      if (choiceId === "TAKE_TURN") {
        const newDuel = takeTurn_executePlayCard(duel, {
          cardIdToPlay: draggedCardInstanceId,
          target: { targetType: "space", spaceId: spaceState.id },
          energyPaid: getEnergyCountsFromSelected(energySelected),
        })
        saveAndAdvanceDuelUntilChoice(newDuel)
      }
    },
  })

  return (
    <div
      ref={setNodeRef}
      onClick={() => {}}
      data-selectable={selectable}
      data-highlighted={highlighted}
      data-dragging-over={isOver}
      data-animation-attack-start={animationAttackStart}
      data-animation-attack-end={animationAttackEnd}
      data-animation-ember-foxling={animationEmberFoxling}
      data-player-id={playerId}
      className={`${index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"} ${styles.space}`}
    >
      <div className={`${styles.space_overlay}`}></div>
      {spaceState.occupant && <CardPreview duel={duel} cardState={spaceState.occupant} />}
    </div>
  )
}
