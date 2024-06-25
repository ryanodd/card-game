import { DuelState } from "../DuelData"
import { PlayerID } from "../PlayerData"
import { Target } from "../choices/ChoiceData"

export type CardBehaviour = {
  getValidTargets: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => Target[]
  effects?: {
    play?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string, target: Target) => Promise<DuelState>
    summon?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => Promise<DuelState>
    afterAttack?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => Promise<DuelState>
    support?: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => Promise<DuelState>
    attackModifier?: (
      inputDuel: DuelState,
      playerId: PlayerID,
      instanceId: string,
      attackAmount: number
    ) => number | "miss"
    opponentAttackModifier?: (
      inputDuel: DuelState,
      playerId: PlayerID,
      instanceId: string,
      attackAmount: number
    ) => number | "miss"
  }
}
