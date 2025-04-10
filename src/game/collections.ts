import { cardDataMap } from "./cards/allCards/allCards"
import { CardName } from "./cards/CardName"
import { DECK_MIN_SIZE } from "./decks/Deck"
import { HeroName } from "./duel/heroBehaviour/HeroName"
import { heroDataMap } from "./heroes/AllHeroes"

export const ALL_CARDS_COLLECTION: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    prev[cardData.name] = DECK_MIN_SIZE
    return prev
  }, {} as Record<CardName, number>),
}

export const RYANS_FAVORITE_TEST_COLLECTION: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    prev[cardData.name] = 2
    return prev
  }, {} as Record<CardName, number>),
  "Elder Saurus": 1,
}

export const EMPTY_COLLECTION: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    prev[cardData.name] = 0
    return prev
  }, {} as Record<CardName, number>),
}

export const STARTING_COLLECTION: Record<CardName, number> = {
  ...Object.values(cardDataMap).reduce((prev, cardData) => {
    if (cardData.rarity === "base") {
      prev[cardData.name] = 4
    } else {
      prev[cardData.name] = 0
    }

    return prev
  }, {} as Record<CardName, number>),
}

export const ALL_HEROES_COLLECTION: Record<HeroName, boolean> = {
  ...Object.values(heroDataMap).reduce((prev, heroData) => {
    prev[heroData.name] = true
    return prev
  }, {} as Record<HeroName, boolean>),
}
