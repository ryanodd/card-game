import { createNewDuel } from "@/src/game/duel/createNewDuel"
import { useGameStore } from "../../hooks/useGameStore"
import { GoldTotal } from "../GoldTotal"
import { Button } from "../designSystem/Button"
import styles from "./DuelSetup.module.css"
import { deckMap } from "@/src/game/Decks"
import { challengeMap } from "@/src/game/Campaign"

export type DuelSetupContentProps = {
  challengeId: string
}

export const DuelSetupContent = ({ challengeId }: DuelSetupContentProps) => {
  const { game, setGame } = useGameStore()
  const challenge = challengeMap[challengeId]

  //
  const onChangeDeck = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }

  const onConfirm = () => {
    setGame({
      ...game,
      screen: { id: "duel", duel: createNewDuel({ game, opponentDeck: deckMap.firstOpponent }), debugUiOpen: false },
    })
  }

  const rewardMessage = `Reward: ${challenge.reward.type === "gold" ? `${challenge.reward.quantity} gold` : "Unknown"}`

  return (
    <div className={styles.duelSetupContent}>
      <h1 className={styles.duelSetupTitle}>{challenge.title}</h1>
      <h2 className={styles.duelSetupReward}>{rewardMessage}</h2>
      <div className={styles.duelSetupActionRow}>
        <Button data-variant="secondary" data-size="large" onClick={onChangeDeck} style={{ flexBasis: 0, flexGrow: 1 }}>
          Change decks
        </Button>
        <Button data-variant="primary" data-size="large" onClick={onConfirm} style={{ flexBasis: 0, flexGrow: 1 }}>
          Start
        </Button>
      </div>
    </div>
  )
}
