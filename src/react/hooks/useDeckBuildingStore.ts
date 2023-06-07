import { DeckBuildingState } from "@/src/game/Deck"
import { create } from "zustand"

export const initialDeckBuildingState: DeckBuildingState = {
  deckName: "",
  deckCardNos: [],
}

export type DeckBuildingStorePayload = {
  deckBuilding: DeckBuildingState
  setDeckBuilding: (newDeckBuilding: DeckBuildingState) => void
}

export const useDeckBuildingStore = create<DeckBuildingStorePayload>((set) => ({
  deckBuilding: initialDeckBuildingState,
  setDeckBuilding: (newDeckBuilding) => set({ deckBuilding: newDeckBuilding }),
}))
