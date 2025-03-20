import { DuelState } from "@/src/game/duel/DuelData"
import { PlayerID } from "@/src/game/duel/PlayerData"
import { DuelHero } from "./DuelHero"
import { PlayerEnergyArea } from "./PlayerEnergyArea"

export type HeroAreaProps = {
  duel: DuelState
  playerId: PlayerID
}

export const HeroArea = ({ duel, playerId }: HeroAreaProps) => {
  return (
    <div className="h-72 w-56 justify-start flex flex-col gap-4 items-center">
      <DuelHero duel={duel} playerId={playerId} />
      <PlayerEnergyArea duel={duel} playerId={playerId} />
    </div>
  )
}
