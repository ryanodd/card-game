import { CardCost } from "../../cards/CardData"
import { EnergyCost, EnergyCostEnergy } from "../EnergyData"

export const cardCostToEnergyCost = (cost: CardCost) => {
  const energyCostToReturn: EnergyCost = []
  for (let x = 0; x < cost.fire; x++) {
    energyCostToReturn.push({ fire: true, water: false, earth: false, air: false })
  }
  for (let x = 0; x < cost.water; x++) {
    energyCostToReturn.push({ fire: false, water: true, earth: false, air: false })
  }
  for (let x = 0; x < cost.earth; x++) {
    energyCostToReturn.push({ fire: false, water: false, earth: true, air: false })
  }
  for (let x = 0; x < cost.air; x++) {
    energyCostToReturn.push({ fire: false, water: false, earth: false, air: true })
  }
  for (let x = 0; x < cost.neutral; x++) {
    energyCostToReturn.push({ fire: true, water: true, earth: true, air: true })
  }
  if (cost.dualType) {
    for (let x = 0; x < cost.dualType.quantity; x++) {
      if (cost.dualType.primary === "neutral" || cost.dualType.secondary === "neutral") {
        throw Error("Invalid dual energy type: neutral can't be one of the types")
      }
      const energy: EnergyCostEnergy = {
        fire: false,
        water: false,
        earth: false,
        air: false,
      }
      energy[cost.dualType.primary] = true
      energy[cost.dualType.secondary] = true
      energyCostToReturn.push(energy)
    }
  }
  return energyCostToReturn
}
