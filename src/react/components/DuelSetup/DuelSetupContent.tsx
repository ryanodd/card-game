import { createNewDuel, DuelEntryPoint, DuelParams, getDuelParamsFromEntryPoint } from "@/src/game/duel/createNewDuel"
import { useGameStore } from "../../hooks/useGameStore"
import { GoldTotal } from "../GoldTotal"
import { Button } from "../designSystem/Button"
import styles from "./DuelSetup.module.css"
import { generateDeck } from "@/src/game/decks/generateDeck"
import { LeagueGame } from "@/src/game/league/leagueTypes"
import { DuelInfo } from "@/src/game/duel/DuelData"

export type DuelSetupContentProps = {
  duelEntryPoint: DuelEntryPoint
}

export const DuelSetupContent = ({ duelEntryPoint }: DuelSetupContentProps) => {
  const { game, setGame } = useGameStore()

  //
  const onChangeDeck = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }

  const onConfirm = () => {
    setGame({
      ...game,
      screen: {
        id: "duel",
        duel: createNewDuel(getDuelParamsFromEntryPoint(game, duelEntryPoint)),
        debugUiOpen: false,
      },
    })
  }

  return (
    <div className={styles.duelSetupContent}>
      <h1 className={styles.duelSetupTitle}>Ready to start duel?</h1>
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
