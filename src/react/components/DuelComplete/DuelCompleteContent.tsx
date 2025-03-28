import { useGameStore } from "../../hooks/useGameStore"
import { GoldTotal } from "../GoldTotal"
import { Button } from "../designSystem/Button"
import styles from "./DuelComplete.module.css"

export type DuelCompleteContentProps = {}

export const DuelCompleteContent = ({}) => {
  const { game, setGame } = useGameStore()

  const onConfirm = () => {
    setGame({
      ...game,
      screen: { id: "mainMenu" },
    })
  }

  const duel = game.screen.id === "duel" ? game.screen.duel : null
  const duelComplete = duel?.winner !== null
  if (!duel || !duelComplete) {
    return null
  }

  const goldReward = duel.info.reward?.goldQuantity

  return (
    duel && (
      <div className={styles.duelCompleteContent}>
        <h1 className={styles.duelCompleteTitle}>
          {duel.winner === "human" && "You win"}
          {duel.winner === "opponent" && "You lose"}
          {duel.winner === "draw" && "It was a draw?"}
        </h1>
        <h2 className={styles.duelCompleteDescription}>
          {duel.winner === "human" && "Nice."}
          {duel.winner === "opponent" && `"Womp womp"`}
          {duel.winner === "draw" && "That's rare."}
        </h2>
        {(duel.winner === "human" || duel.winner === "draw") && (
          <div className={styles.goldSection}>
            <GoldTotal value={game.gold} />

            {goldReward !== undefined && <p className={styles.goldRewardAmount}>+{goldReward} gold</p>}
          </div>
        )}
        <Button data-variant="primary" data-size="large" onClick={onConfirm}>
          OK
        </Button>
      </div>
    )
  )
}
