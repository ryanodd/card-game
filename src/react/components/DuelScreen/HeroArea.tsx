import { DuelState } from "@/src/game/duel/DuelData"
import { PlayerID } from "@/src/game/duel/PlayerData"
import { DuelHero } from "./DuelHero"
import { PlayerEnergyArea } from "./PlayerEnergyArea"
import { HeroHealth } from "./HeroHealth"
import styles from "./HeroArea.module.css"

export type HeroAreaProps = {
  duel: DuelState
  playerId: PlayerID
}

export const HeroArea = ({ duel, playerId }: HeroAreaProps) => {
  return (
    <div className={styles.heroArea} data-human={playerId === "human"}>
      <HeroHealth duel={duel} playerId={playerId} />
      <DuelHero duel={duel} playerId={playerId} />

      <PlayerEnergyArea duel={duel} playerId={playerId} />
    </div>
  )
}
