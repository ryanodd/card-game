import { useGameStore } from "../../hooks/useGameStore"
import { GoldTotal } from "../GoldTotal"
import { Button } from "../designSystem/Button"
import styles from "./DuelComplete.module.css"

export type DuelCompleteContentProps = {}

export const DuelCompleteContent = ({}) => {
  const { game, setGame } = useGameStore()
  const duelCompleteData = game.screen.id === "duel" ? game.screen.duel.duelCompleteData : null

  const onConfirm = () => {
    setGame({
      ...game,
      screen: { id: "mainMenu" },
    })
  }

  if (duelCompleteData === null) {
    return null
  }

  return (
    <div className={styles.duelCompleteContent}>
      <h1 className={styles.duelCompleteTitle}>{duelCompleteData.winner === "human" ? "You win" : "You lose"}</h1>
      <h2 className={styles.duelCompleteDescription}>
        {duelCompleteData.winner === "human" ? "Nice." : `"Womp womp"`}
      </h2>
      <div className={styles.goldSection}>
        <GoldTotal value={game.gold} />
        {duelCompleteData.goldReward > 0 && (
          <p className={styles.goldRewardAmount}>+{duelCompleteData.goldReward} gold</p>
        )}
      </div>
      <Button data-variant="primary" data-size="large" onClick={onConfirm}>
        OK
      </Button>
    </div>
  )
}
