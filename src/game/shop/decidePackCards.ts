import { CardName } from "../cards/CardName"
import { PackRarity } from "./PackData"

export const decidePackCards = (packRarity: PackRarity): CardName[] => {
  if (packRarity === "uncommon") {
  }
  return ["Elder Saurus", "Hydrus, Seaborn Titan", "Bonehide Mole"]
}
