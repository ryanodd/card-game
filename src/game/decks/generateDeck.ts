import { HeroName } from "../duel/heroBehaviour/HeroName"
import { getEnergyTypesFromEnergyCounts, sortCardNames } from "../helpers"
import { heroDataMap } from "../heroes/AllHeroes"
import { Deck } from "./Deck"
import { v4 } from "uuid"
import { getRandomItemFromArray, getRandomSeed } from "@/src/utils/randomNumber"
import { CardName } from "../cards/CardName"
import { cardDataMap } from "../cards/allCards/allCards"

const NUM_CARDS_PER_DECK = 40

export type GenerateDeckOptions =
  | {
      method: "completely-random"
    }
  | {
      method: "hero"
      heroName: HeroName
    }
// | {
//     method: "energy-types"
//     cardEnergyTypes: EnergyType[]
//   }

export const generateDeck = (options: GenerateDeckOptions): Deck => {
  // const candidateHeroes = Object.values(heroDataMap).map((heroData) => {
  //   // If ANY of the hero energy types are among ANY of the specified energy types, add as candidate
  //   return heroData.energyTypes.some((energyType) => options.energyTypes.includes(energyType))
  // })

  let heroName = getRandomItemFromArray(Object.keys(heroDataMap), getRandomSeed()) as HeroName
  if (options.method === "hero") {
    heroName = options.heroName
  }

  const candidateCardEnergyTypes = [...heroDataMap[heroName].energyTypes, "neutral"]

  const candidateCardNames = Object.values(cardDataMap)
    .filter((cardData) => {
      if (cardData.energyType === "multi") {
        const cardEnergyTypes = getEnergyTypesFromEnergyCounts(cardData.cost)
        const cardHasSingleEnergyThatsMissing = cardEnergyTypes.some((energyType) => {
          return energyType !== "neutral" && !candidateCardEnergyTypes.includes(energyType)
        })
        const cardHasDualEnergyThatsMissing =
          cardData.cost.dualType !== undefined &&
          !candidateCardEnergyTypes.includes(cardData.cost.dualType.primary) &&
          !candidateCardEnergyTypes.includes(cardData.cost.dualType.secondary)
        const cardEnergyTypesAreIncompatible = cardHasSingleEnergyThatsMissing || cardHasDualEnergyThatsMissing
        return !cardEnergyTypesAreIncompatible
      }
      return candidateCardEnergyTypes.includes(cardData.energyType)
    })
    .map((cardData) => cardData.name)

  let cardNames: CardName[] = []
  for (let x = 0; x < NUM_CARDS_PER_DECK; x++) {
    cardNames.push(getRandomItemFromArray<CardName>(candidateCardNames, getRandomSeed()) as CardName)
  }
  cardNames = sortCardNames(cardNames)

  return {
    id: v4(),
    name: `Generated ${heroName} deck`,
    heroName,
    cardNames,
  }
}
