import { CardState, DuelState } from "@/src/game/DuelData"

import styles from "./CreatureArea.module.css"
import { CardPreview } from "../CardPreview"
import {
  ChoiceID,
  declareAttackers_getValidSpaceTargets,
  declareDefenders_getValidAttackerTargets,
  declareDefenders_getValidDefenderTargets,
  resolveAttacks_execute,
  resolveAttacks_getValidAttackerTargets,
  resolveAttacks_getValidDefenderTargets,
  takeTurn_executePlayCard,
  takeTurn_getValidSpaceTargets,
} from "@/src/game/Choices"
import { getEnergyCountsFromSelected, useDuelUIStore } from "../../hooks/useDuelUIStore"
import { saveAndRerenderDuel } from "@/src/game/DuelController"
import AttackSVG from "../../assets/sword-f.svg"
import DefendSVG from "../../assets/shield-f.svg"
import { DefendLine } from "./DefendLine"
import { duelWinner } from "@/src/game/DuelHelpers"

const QTY_LANES = 7

export type CreatureAreaProps = {
  duel: DuelState
}

export const CreatureArea = ({ duel }: CreatureAreaProps) => {
  const {
    cardIdToBePlayed,
    energySelected,
    attackersToDeclare,
    setAttackersToDeclare,
    spaceIdToDefend,
    setSpaceIdToDefend,
    spaceIdToAttack,
    setSpaceIdToAttack,
    defendersToAttackers,
    setDefendersToAttackers,
  } = useDuelUIStore()

  const choiceId = duel.choice.id

  const getColumns = () => {
    const columns = []
    for (let x = 0; x < QTY_LANES; x++) {
      const humanSpaceState = duel.human.creatureSpaces[x]
      const humanSelectable =
        !duelWinner(duel) &&
        !("animation" in duel) &&
        ((choiceId === ChoiceID.TAKE_TURN &&
          cardIdToBePlayed !== null &&
          takeTurn_getValidSpaceTargets(duel, cardIdToBePlayed, getEnergyCountsFromSelected(energySelected)).includes(
            humanSpaceState.id
          )) ||
          (choiceId === ChoiceID.DECLARE_ATTACKERS &&
            declareAttackers_getValidSpaceTargets(duel).includes(humanSpaceState.id)) ||
          (choiceId === ChoiceID.DECLARE_DEFENDS &&
            (spaceIdToDefend === null || spaceIdToDefend === humanSpaceState.id) &&
            declareDefenders_getValidDefenderTargets(duel).includes(humanSpaceState.id)) ||
          (choiceId === ChoiceID.RESOLVE_ATTACKS &&
            resolveAttacks_getValidAttackerTargets(duel).includes(humanSpaceState.id) &&
            (spaceIdToAttack === null || spaceIdToAttack === humanSpaceState.id)))
      const humanHighlighted =
        humanSelectable &&
        !attackersToDeclare.includes(humanSpaceState.id) &&
        spaceIdToDefend !== humanSpaceState.id &&
        (spaceIdToAttack === null || spaceIdToAttack === humanSpaceState.id) &&
        !Object.keys(defendersToAttackers).includes(humanSpaceState.id)
      const humanFaded =
        humanSpaceState.occupant?.summonSick === true || humanSpaceState.occupant?.attackedThisTurn === true
      const humanAttacking =
        attackersToDeclare.includes(humanSpaceState.id) || duel.attackingSpaceIds.includes(humanSpaceState.id)
      const humanDefending =
        spaceIdToDefend === humanSpaceState.id ||
        Object.keys(defendersToAttackers).includes(humanSpaceState.id) ||
        Object.keys(duel.defendersToAttackers).includes(humanSpaceState.id)
      const humanAnimationAttackStart =
        "animation" in duel &&
        duel.animation.id === "ATTACK_START" &&
        duel.animation.attackingSpaceId === humanSpaceState.id
      const humanAnimationAttackEnd =
        "animation" in duel &&
        duel.animation.id === "ATTACK_END" &&
        duel.animation.attackingSpaceId === humanSpaceState.id

      const opponentSpaceState = duel.opponent.creatureSpaces[x]
      const opponentSelectable =
        !duelWinner(duel) &&
        !("animation" in duel) &&
        ((choiceId === ChoiceID.RESOLVE_ATTACKS &&
          spaceIdToAttack !== null &&
          resolveAttacks_getValidDefenderTargets(duel, spaceIdToAttack).includes(opponentSpaceState.id)) ||
          (choiceId === ChoiceID.DECLARE_DEFENDS &&
            spaceIdToDefend !== null &&
            declareDefenders_getValidAttackerTargets(duel, spaceIdToDefend).includes(opponentSpaceState.id)))
      const opponentHighlighted =
        opponentSelectable && !Object.keys(defendersToAttackers).includes(opponentSpaceState.id)
      const opponentFaded =
        opponentSpaceState.occupant?.summonSick === true || opponentSpaceState.occupant?.attackedThisTurn === true
      const opponentAttacking = duel.attackingSpaceIds.includes(opponentSpaceState.id)
      const opponentDefending = Object.keys(duel.defendersToAttackers).includes(opponentSpaceState.id)
      const opponentAnimationAttackStart =
        "animation" in duel &&
        duel.animation.id === "ATTACK_START" &&
        duel.animation.attackingSpaceId === opponentSpaceState.id
      const opponentAnimationAttackEnd =
        "animation" in duel &&
        duel.animation.id === "ATTACK_END" &&
        duel.animation.attackingSpaceId === opponentSpaceState.id

      columns.push(
        <div className="flex flex-col gap-1" key={x}>
          <div
            onClick={() => {
              if (!opponentSelectable) {
                return
              }
              if (choiceId === ChoiceID.DECLARE_DEFENDS && spaceIdToDefend !== null) {
                const newDefendersToAttackers = defendersToAttackers
                newDefendersToAttackers[spaceIdToDefend] = opponentSpaceState.id
                setDefendersToAttackers(newDefendersToAttackers)
                setSpaceIdToDefend(null)
              }
              if (choiceId === ChoiceID.RESOLVE_ATTACKS && spaceIdToAttack !== null) {
                const newDuel = resolveAttacks_execute(duel, {
                  attackingSpaceId: spaceIdToAttack,
                  defendingSpaceId: opponentSpaceState.id,
                })
                saveAndRerenderDuel(newDuel)
              }
            }}
            className={`${x % 2 === 0 ? "bg-slate-300" : "bg-slate-200"} ${
              opponentSelectable ? styles.space_selectable : ""
            } ${opponentHighlighted ? styles.space_highlighted : ""} ${opponentFaded ? styles.space_faded : ""} ${
              opponentAttacking ? styles.space_toAttack : ""
            } ${opponentDefending ? styles.space_defending : ""} ${
              opponentAnimationAttackStart ? styles.space_animation_attack_start : ""
            } ${opponentAnimationAttackEnd ? styles.space_animation_attack_end : ""} ${styles.space}`}
          >
            <div className={`${styles.space_overlay}`}>
              {opponentAttacking && (
                <div className={`${styles.space_attack_icon}`} data-direction="down">
                  <AttackSVG />
                </div>
              )}
              {opponentDefending && (
                <div className={`${styles.space_defend_icon}`}>
                  <DefendSVG />
                  <DefendLine duel={duel} playerId="opponent" index={opponentSpaceState.index} />
                </div>
              )}
            </div>
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
                if (choiceId === ChoiceID.DECLARE_ATTACKERS) {
                  if (!attackersToDeclare.includes(humanSpaceState.id)) {
                    setAttackersToDeclare([...attackersToDeclare, humanSpaceState.id])
                  } else {
                    setAttackersToDeclare(
                      attackersToDeclare.filter((spaceId) => {
                        return spaceId !== humanSpaceState.id
                      })
                    )
                  }
                }
                if (choiceId === ChoiceID.RESOLVE_ATTACKS) {
                  const defenders = resolveAttacks_getValidDefenderTargets(duel, humanSpaceState.id)
                  if (defenders.length === 0) {
                    const newDuel = resolveAttacks_execute(duel, {
                      attackingSpaceId: humanSpaceState.id,
                      defendingSpaceId: null,
                    })
                    saveAndRerenderDuel(newDuel)
                  }
                  if (defenders.length === 1) {
                    const newDuel = resolveAttacks_execute(duel, {
                      attackingSpaceId: humanSpaceState.id,
                      defendingSpaceId: defenders[0],
                    })
                    saveAndRerenderDuel(newDuel)
                  }
                  // TODO automatically select defender if there's only 1? Blocked on vfx
                  if (defenders.length >= 2) {
                    setSpaceIdToAttack(spaceIdToAttack ? null : humanSpaceState.id)
                  }
                }
                if (choiceId === ChoiceID.DECLARE_DEFENDS) {
                  setSpaceIdToDefend(
                    spaceIdToDefend === humanSpaceState.id ||
                      Object.keys(defendersToAttackers).includes(humanSpaceState.id)
                      ? null
                      : humanSpaceState.id
                  )
                  delete defendersToAttackers[humanSpaceState.id]
                }
              }
            }}
            className={`${x % 2 === 0 ? "bg-slate-200" : "bg-slate-300"} ${
              humanSelectable ? styles.space_selectable : ""
            } ${humanHighlighted ? styles.space_highlighted : ""} ${humanFaded ? styles.space_faded : ""} ${
              humanAttacking ? styles.space_toAttack : ""
            } ${humanDefending ? styles.space_defending : ""} ${
              humanAnimationAttackStart ? styles.space_animation_attack_start : ""
            } ${humanAnimationAttackEnd ? styles.space_animation_attack_end : ""} ${styles.space}`}
          >
            <div className={`${styles.space_overlay}`}>
              {humanAttacking && (
                <div className={`${styles.space_attack_icon}`} data-direction="up">
                  <AttackSVG />
                </div>
              )}
              {humanDefending && (
                <>
                  <div className={`${styles.space_defend_icon}`}>
                    <DefendSVG />
                  </div>
                  <DefendLine duel={duel} playerId="human" index={humanSpaceState.index} />
                </>
              )}
            </div>
            {humanSpaceState.occupant && <CardPreview duel={duel} cardState={humanSpaceState.occupant} />}
          </div>
        </div>
      )
    }
    return columns
  }

  return <div className="flex rounded-md border-4 shadow-md border-slate-400 gap-1 bg-slate-400">{getColumns()}</div>
}
