import { cardDataMap } from "@/src/game/Cards"
import { useGameStore } from "../../hooks/useGameStore"
import { InventoryCard } from "./InventoryCard"
import { sortCardNames } from "@/src/game/helpers"

export type InventoryBrowserProps = {}

export const InventoryBrowser = ({}: InventoryBrowserProps) => {
  const { game } = useGameStore()
  const cardList = sortCardNames([...Object.keys(game.collection)])

  return (
    <div className="flex-grow">
      <div className="flex flex-wrap gap-2.5">
        {cardList.map((cardName) => (
          <InventoryCard key={cardName} cardData={cardDataMap[cardName]}></InventoryCard>
        ))}
      </div>
    </div>
  )
}
