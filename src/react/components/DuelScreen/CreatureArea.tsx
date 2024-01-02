import { DuelState } from "@/src/game/DuelData"

import styles from "./CreatureArea.module.css"
import { CardPreview } from "../CardPreview"
import { ChoiceID, takeTurn_executePlayCard, takeTurn_getValidSpaceTargets } from "@/src/game/Choices"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { saveAndRerenderDuel } from "@/src/game/DuelController"
import { duelWinner } from "@/src/game/DuelHelpers"

export type CreatureAreaProps = {
  duel: DuelState
}

export const CreatureArea = ({ duel }: CreatureAreaProps) => {
  const { cardIdToBePlayed, energySelected } = useDuelUIStore()

  const choiceId = duel.choice.id

  const getColumns = () => {
    const columns = []
    for (let x = 0; x < duel.human.creatureSpaces.length; x++) {
      const humanSpaceState = duel.human.creatureSpaces[x]
      const humanSelectable =
        !duelWinner(duel) &&
        !("animation" in duel) &&
        choiceId === ChoiceID.TAKE_TURN &&
        cardIdToBePlayed !== null &&
        takeTurn_getValidSpaceTargets(duel, cardIdToBePlayed, getEnergyCountsFromSelected(energySelected)).includes(
          humanSpaceState.id
        )
      const humanHighlighted = humanSelectable

      const humanAnimationAttackStart = "animation" in duel && duel.animation.id === "ATTACK_START"
      const humanAnimationAttackEnd = "animation" in duel && duel.animation.id === "ATTACK_END"

      const opponentSpaceState = duel.opponent.creatureSpaces[x]
      const opponentSelectable = !duelWinner(duel) && !("animation" in duel) && false
      const opponentHighlighted = opponentSelectable
      const opponentAnimationAttackStart = "animation" in duel && duel.animation.id === "ATTACK_START"
      const opponentAnimationAttackEnd = "animation" in duel && duel.animation.id === "ATTACK_END"

      columns.push(
        <div className="flex flex-col gap-1" key={x}>
          <div
            onClick={() => {
              if (!opponentSelectable) {
                return
              }
            }}
            className={`${x % 2 === 0 ? "bg-slate-300" : "bg-slate-200"} ${
              opponentSelectable ? styles.space_selectable : ""
            } ${opponentHighlighted ? styles.space_highlighted : ""} ${
              opponentAnimationAttackStart ? styles.space_animation_attack_start : ""
            } ${opponentAnimationAttackEnd ? styles.space_animation_attack_end : ""} ${styles.space}`}
          >
            <div className={`${styles.space_overlay}`}></div>
            {opponentSpaceState.occupant && <CardPreview duel={duel} cardState={opponentSpaceState.occupant} />}
          </div>
          <div
            onClick={() => {
              if (humanSelectable) {
                if (choiceId === ChoiceID.TAKE_TURN && cardIdToBePlayed) {
                  const newDuel = takeTurn_executePlayCard(duel, {
                    cardIdToPlay: cardIdToBePlayed,
                    targetSpaceId: humanSpaceState.id,
                    energyPaid: getEnergyCountsFromSelected(energySelected),
                  })
                  saveAndRerenderDuel(newDuel)
                }
              }
            }}
            className={`${x % 2 === 0 ? "bg-slate-200" : "bg-slate-300"} ${
              humanSelectable ? styles.space_selectable : ""
            } ${humanHighlighted ? styles.space_highlighted : ""} ${
              humanAnimationAttackStart ? styles.space_animation_attack_start : ""
            } ${humanAnimationAttackEnd ? styles.space_animation_attack_end : ""} ${styles.space}`}
          >
            <div className={`${styles.space_overlay}`}></div>
            {humanSpaceState.occupant && <CardPreview duel={duel} cardState={humanSpaceState.occupant} />}
          </div>
        </div>
      )
    }
    return columns
  }

  return <div className="flex rounded-md border-4 shadow-md border-slate-400 gap-1 bg-slate-400">{getColumns()}</div>
}
