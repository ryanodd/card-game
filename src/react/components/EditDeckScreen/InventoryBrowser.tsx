import { CardName } from "@/src/game/cards/CardName"
import { useGameStore } from "../../hooks/useGameStore"
import { InventoryGrid } from "./InventoryGrid"
import { getEnergyTypesFromEnergyCounts, sortCardNames } from "@/src/game/helpers"
import { GameState } from "@/src/game/GameData"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"

import styles from "./Inventory.module.css"
import { Filters, useInventoryBrowserStore } from "../../hooks/useInventoryBrowserStore"
import { InventoryFilters } from "./InventoryFilters"

export const filterCardNames = (game: GameState, cardNames: CardName[], filters: Filters) => {
  let cardNamesToReturn = cardNames
  if (!filters.ownership.unowned) {
    cardNamesToReturn = cardNamesToReturn.filter((cardName) => {
      return game.cardCollection[cardName] > 0
    })
  }
  cardNamesToReturn = cardNamesToReturn.filter((cardName) => {
    const cardEnergyTypes = getEnergyTypesFromEnergyCounts(cardDataMap[cardName].cost)
    for (const cardEnergyType of cardEnergyTypes) {
      if (filters.energyType[cardEnergyType] && !(cardEnergyType === "neutral" && cardEnergyTypes.length > 1)) {
        return true
      }
    }
    return false
  })

  for (const [rarity, shouldInclude] of Object.entries(filters.rarity)) {
    if (!shouldInclude) {
      cardNamesToReturn = cardNamesToReturn.filter((cardName) => {
        return cardDataMap[cardName].rarity !== rarity
      })
    }
  }

  if (!filters.completion.complete) {
    cardNamesToReturn = cardNamesToReturn.filter((cardName) => {
      return !cardDataMap[cardName].complete
    })
  }
  if (!filters.completion.incomplete) {
    cardNamesToReturn = cardNamesToReturn.filter((cardName) => {
      return cardDataMap[cardName].complete
    })
  }

  return cardNamesToReturn
}

export type InventoryBrowserProps = {
  cardsDraggable?: boolean
}

export const InventoryBrowser = ({ cardsDraggable }: InventoryBrowserProps) => {
  const { game } = useGameStore()
  const { filters } = useInventoryBrowserStore()

  let cardList = filterCardNames(game, [...Object.keys(game.cardCollection)] as CardName[], filters)
  cardList = sortCardNames(cardList)

  return (
    <div className={styles.inventoryBrowser}>
      <InventoryFilters />
      <InventoryGrid cards={cardList} cardsDraggable={cardsDraggable} />
    </div>
  )
}
