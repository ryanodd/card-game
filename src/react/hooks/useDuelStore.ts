import { DuelState } from "@/src/game/DuelData"
import { GameState } from "@/src/game/GameData"
import { createNewDuel } from "@/src/game/createNewDuel"
import { create } from "zustand"

//Dummy data that is never used; zustand needs to provide init values but they're determined by other stores
export const dummyGameState: GameState = {
  activeDeckIndex: 0,
  decks: [
    {
      name: "NULL",
      cardNumbers: [],
    },
  ],
}
export const dummyDuelState: DuelState = createNewDuel({ game: dummyGameState, opponentDeckCardNos: [] })

export type DuelStorePayload = {
  duel: DuelState
  setDuel: (newDuel: DuelState) => void
  rerender: () => void
  setRerenderFunction: (newRerenderFunction: () => void) => void
}

export const useDuelStore = create<DuelStorePayload>((set) => ({
  duel: dummyDuelState,
  setDuel: (newDuel) => set({ duel: newDuel }),
  rerender: () => {},
  setRerenderFunction: (newRerenderFunction) => set({ rerender: newRerenderFunction }),
}))
