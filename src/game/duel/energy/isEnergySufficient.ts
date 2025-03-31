import { EnergyCost, EnergyCounts, EnergyType } from "../EnergyData"

export const getEnergyRequiredFromCost = (cost: EnergyCost) => {
  const singleEnergiesRequired: EnergyCounts = {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
    neutral: 0,
  }

  let dualEnergyRequired = 0
  let dualEnergyTypes: EnergyType[] = []
  for (const energyType of cost) {
    if (energyType.fire && !(energyType.water || energyType.earth || energyType.air)) {
      singleEnergiesRequired["fire"]++
      continue
    }
    if (energyType.water && !(energyType.fire || energyType.earth || energyType.air)) {
      singleEnergiesRequired["water"]++
      continue
    }
    if (energyType.earth && !(energyType.fire || energyType.water || energyType.air)) {
      singleEnergiesRequired["earth"]++
      continue
    }
    if (energyType.air && !(energyType.fire || energyType.water || energyType.earth)) {
      singleEnergiesRequired["air"]++
      continue
    }

    if (energyType.fire && energyType.water && energyType.earth && energyType.air) {
      singleEnergiesRequired["neutral"]++
      continue
    }

    // Dual type energy detected - Populate dualTypes
    // Assumes costs can only contain ONE variety of dual type energy
    dualEnergyRequired++
    if (dualEnergyTypes.length === 0) {
      if (energyType.fire) {
        dualEnergyTypes.push("fire")
      }
      if (energyType.water) {
        dualEnergyTypes.push("water")
      }
      if (energyType.earth) {
        dualEnergyTypes.push("earth")
      }
      if (energyType.air) {
        dualEnergyTypes.push("air")
      }
    }
  }
  return {
    singleEnergiesRequired,
    dualEnergyRequired,
    dualEnergyTypes,
  }
}

export const isEnergySufficient = (energy: EnergyCounts, cost: EnergyCost, mustMatchExactly?: boolean): boolean => {
  const { singleEnergiesRequired, dualEnergyRequired, dualEnergyTypes } = getEnergyRequiredFromCost(cost)

  const energyRemainderForNeutralAndDualType: EnergyCounts = {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
    neutral: 0,
  }
  if (energy.fire < singleEnergiesRequired["fire"]) {
    return false
  }
  energyRemainderForNeutralAndDualType["fire"] = energy.fire - singleEnergiesRequired["fire"]
  if (energy.water < singleEnergiesRequired["water"]) {
    return false
  }
  energyRemainderForNeutralAndDualType["water"] = energy.water - singleEnergiesRequired["water"]
  if (energy.earth < singleEnergiesRequired["earth"]) {
    return false
  }
  energyRemainderForNeutralAndDualType["earth"] = energy.earth - singleEnergiesRequired["earth"]
  if (energy.air < singleEnergiesRequired["air"]) {
    return false
  }
  energyRemainderForNeutralAndDualType["air"] = energy.air - singleEnergiesRequired["air"]

  if (dualEnergyRequired && dualEnergyTypes.length !== 2) {
    throw Error("Invalid cost. Dual energy costs for a card must only contain 2 energy types")
  }
  for (let x = 0; x < dualEnergyRequired; x++) {
    if (energyRemainderForNeutralAndDualType[dualEnergyTypes[0]] > 0) {
      energyRemainderForNeutralAndDualType[dualEnergyTypes[0]] -= 1
      continue
    }
    if (energyRemainderForNeutralAndDualType[dualEnergyTypes[1]] > 0) {
      energyRemainderForNeutralAndDualType[dualEnergyTypes[1]] -= 1
      continue
    }
    return false
  }

  let totalEnergyRemaining =
    energyRemainderForNeutralAndDualType["fire"] +
    energyRemainderForNeutralAndDualType["water"] +
    energyRemainderForNeutralAndDualType["earth"] +
    energyRemainderForNeutralAndDualType["air"] +
    energy.neutral

  if (totalEnergyRemaining < singleEnergiesRequired["neutral"]) {
    return false
  }
  totalEnergyRemaining -= singleEnergiesRequired["neutral"]

  return mustMatchExactly ? totalEnergyRemaining === 0 : true
}
