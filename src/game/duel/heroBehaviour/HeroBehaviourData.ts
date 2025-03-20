import { DuelState } from "../DuelData"
import { PlayerID } from "../PlayerData"
import { Target } from "../choices/ChoiceData"

export type HeroBehaviour = {
  produceTurnEnergy: (inputDuel: DuelState, playerId: PlayerID) => Promise<DuelState>
  turnStart?: (inputDuel: DuelState, playerId: PlayerID) => Promise<DuelState>
  // keywords?: {
  //   trample?: boolean
  //   enrage?: boolean
  // }
  // effects?: {
  //   play?: (inputDuel: DuelState, instanceId: string, target: Target) => Promise<DuelState>
  //   summon?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
  //   afterAttack?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
  //   support?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
  //   attackModifier?: (inputDuel: DuelState, instanceId: string, attackAmount: number) => number | "miss"
  //   opposingAttackModifier?: (inputDuel: DuelState, instanceId: string, attackAmount: number) => number | "miss"
  //   selectCards?: (inputDuel: DuelState, instanceId: string, cardsSelected: string[]) => Promise<DuelState>
  // }
}
