import { campaignData } from "@/src/game/Campaign"
import { Button } from "../designSystem/Button"
import styles from "./LocationSelect.module.css"
import { useGameStore } from "../../hooks/useGameStore"

export type LocationSelectProps = {}

export const LocationSelect = ({}: LocationSelectProps) => {
  const { game, setGame } = useGameStore()

  return (
    <div className={styles.locationSelectContainer}>
      {campaignData.locations.map((campaign) => (
        <Button key={campaign.id} data-size="large" disabled={game.campaignCompletion[campaign.id].unlocked === false}>
          {campaign.title}
        </Button>
      ))}
      <svg viewBox="0 0 1000 100" className={styles.pathDashedLine}>
        <line x1="0" x2="1000" y1="50" y2="50" stroke="#DDDDDD" stroke-width="2" stroke-dasharray="18 18" />
      </svg>
    </div>
  )
}
