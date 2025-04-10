import { HeroName } from "../duel/heroBehaviour/HeroName"
import { getEnergyTypesFromEnergyCounts, sortCardNames } from "../helpers"
import { heroDataMap } from "../heroes/AllHeroes"
import { Deck } from "./Deck"
import { v4 } from "uuid"
import { getRandomItemFromArray, getRandomSeed } from "@/src/utils/randomNumber"
import { CardName } from "../cards/CardName"
import { cardDataMap } from "../cards/allCards/allCards"
import { EMPTY_COLLECTION } from "../collections"

const NUM_CARDS_PER_DECK = 40

export type GenerateDeckOptions = { collection?: Record<CardName, number>; name?: string } & (
  | {
      method: "completely-random"
    }
  | {
      method: "hero"
      heroName: HeroName
    }
)
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
  let cardQuantities: Record<CardName, number> = structuredClone(EMPTY_COLLECTION)
  while (cardNames.length < NUM_CARDS_PER_DECK && candidateCardNames.length > 0) {
    const chosenCardName = getRandomItemFromArray<CardName>(candidateCardNames, getRandomSeed()) as CardName
    if (options.collection && options.collection[chosenCardName] === cardQuantities[chosenCardName]) {
      candidateCardNames.splice(
        candidateCardNames.findIndex((cardName) => cardName === chosenCardName),
        1
      )
      continue
    }
    cardNames.push(chosenCardName)
    cardQuantities[chosenCardName] += 1
  }
  cardNames = sortCardNames(cardNames)

  return {
    id: v4(),
    name: options.name ?? `Generated ${heroName} deck`,
    heroName,
    cardNames,
  }
}
