export type EnergyType = "neutral" | "fire" | "water" | "earth" | "air"

export type EnergyCounts = {
  neutral: number
  fire: number
  water: number
  earth: number
  air: number
}

/**
 * Here's the deal with dual-type energy costs:
 * I don't know if it's feasible/worthwhile to implement this the 'proper' way,
 * where it would work with an arbitrary number of dual-type energy on a card.
 * But imagine the auto-paying algorithm. How does it decide
 */
export type EnergyCostEnergy = {
  fire: boolean
  water: boolean
  earth: boolean
  air: boolean
}

export type EnergyCost = EnergyCostEnergy[]
