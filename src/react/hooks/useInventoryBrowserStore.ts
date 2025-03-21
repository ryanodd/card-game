import { Rarity } from "@/src/game/cards/CardData"
import { EnergyType } from "@/src/game/duel/EnergyData"
import { create } from "zustand"

export type Filters = {
  ownership: {
    unowned: boolean
  }
  energyType: Record<EnergyType, boolean>
  rarity: Record<Rarity, boolean>
}

export type InventoryBrowserState = {
  filters: Filters
}

export const defaultFilters: Filters = {
  ownership: {
    unowned: false,
  },
  energyType: {
    neutral: true,
    fire: true,
    water: true,
    earth: true,
    air: true,
  },
  rarity: {
    base: true,
    common: true,
    uncommon: true,
    rare: true,
    epic: true,
    legendary: true,
    mythic: true,
  },
}

export type InventoryBrowserStorePayload = {
  filters: Filters
  setFilters: (filters: Filters) => void
}

export const useInventoryBrowserStore = create<InventoryBrowserStorePayload>((set) => ({
  filters: defaultFilters,
  setFilters: (filters) => set({ filters }),
}))
