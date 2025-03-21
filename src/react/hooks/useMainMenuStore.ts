import { create } from "zustand"

export type ManageDecksStorePayload = {
  renamingDeckId: string | null
  setRenamingDeck: (deckId: string | null) => void
}

export const useManageDecksStore = create<ManageDecksStorePayload>((set) => ({
  renamingDeckId: null,
  setRenamingDeck: (deckId) => set({ renamingDeckId: deckId }),
}))
