import { DuelState } from "../DuelData"
import { PlayerID } from "../PlayerData"
import { Target } from "../choices/ChoiceData"

export type CardBehaviour = {
  getValidTargets: (inputDuel: DuelState, instanceId: string) => Target[]
  keywords?: {
    trample?: boolean
    enrage?: boolean
  }
  effects?: {
    play?: (inputDuel: DuelState, instanceId: string, target: Target) => Promise<DuelState>
    summon?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
    beforeAttack?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
    afterAttack?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
    beforeCombat?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
    support?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
    attackModifier?: (inputDuel: DuelState, instanceId: string, attackAmount: number) => number | "miss"
    defenseModifier?: (inputDuel: DuelState, instanceId: string, attackAmount: number) => number | "miss"
    selectCards?: (inputDuel: DuelState, playerId: PlayerID, cardsSelected: string[]) => Promise<DuelState>
    defeat?: (inputDuel: DuelState, instanceId: string) => Promise<DuelState>
  }
}
