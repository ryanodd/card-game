import { ChoiceID } from "@/src/game/Choices"
import SwordSVG from "../../assets/sword-f.svg"
import styles from "./TurnPhaseIndicator.module.css"
import { DuelState } from "@/src/game/DuelData"

export type TurnPhaseIndicatorProps = {
  duel: DuelState
}

export const TurnPhaseIndicator = ({ duel }: TurnPhaseIndicatorProps) => {
  const choiceId = duel.choice.id

  const isMainPhaseOne = choiceId === ChoiceID.TAKE_TURN && !duel.attackedThisTurn
  const isMainPhaseTwo = choiceId === ChoiceID.TAKE_TURN && duel.attackedThisTurn
  const isAttackPhase =
    choiceId === ChoiceID.DECLARE_ATTACKERS ||
    choiceId === ChoiceID.DECLARE_DEFENDS ||
    choiceId === ChoiceID.RESOLVE_ATTACKS ||
    choiceId === ChoiceID.CONFIRM_END_ATTACKS

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className={`${styles.main_phase_icon}`} data-lit={isMainPhaseOne} />
        <div
          className={`${isAttackPhase || isMainPhaseTwo || isMainPhaseOne ? styles.lit : styles.unlit} ${styles.orb}`}
        />
      </div>
      <div className="relative w-6 h-2 z-10">
        <div className={`${isAttackPhase || isMainPhaseTwo ? styles.lit : styles.unlit} ${styles.bar}`} />
      </div>
      <div className="relative">
        <div className={`${styles.attack_phase_icon}`} data-lit={isAttackPhase}>
          <SwordSVG />
        </div>
        <div className={`${isAttackPhase || isMainPhaseTwo ? styles.lit : styles.unlit} ${styles.orb}`} />
      </div>
      <div className="relative w-6 h-2 z-10">
        <div className={`${isMainPhaseTwo ? styles.lit : styles.unlit} ${styles.bar}`} />
      </div>
      <div className="relative">
        <div className={`${styles.main_phase_icon}`} data-lit={isMainPhaseTwo} />
        <div className={`${isMainPhaseTwo ? styles.lit : styles.unlit} ${styles.orb}`} />
      </div>
    </div>
  )
}
