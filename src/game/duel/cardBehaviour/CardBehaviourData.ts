import { DuelState } from "../DuelData"
import { PlayerID } from "../PlayerData"
import { Target } from "../choices/ChoiceData"

export type CardBehaviour = {
  getValidTargets: (inputDuel: DuelState, playerId: PlayerID, instanceId: string) => Target[]
  keywords?: {
    trample?: boolean
    enrage?: boolean
  }
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
    opposingAttackModifier?: (
      inputDuel: DuelState,
      playerId: PlayerID,
      instanceId: string,
      attackAmount: number
    ) => number | "miss"
    selectCards?: (
      inputDuel: DuelState,
      playerId: PlayerID,
      instanceId: string,
      cardsSelected: string[]
    ) => Promise<DuelState>
  }
}
