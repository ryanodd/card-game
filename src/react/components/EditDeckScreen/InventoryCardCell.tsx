import { CardData } from "@/src/game/cards/CardData"
import { InventoryCard } from "./InventoryCard"
import { useGameStore } from "../../hooks/useGameStore"
import { InventoryQuantityIndicator } from "./InventoryQuantityIndicator"
import { CardDetailed } from "../CardDetailed"
import { Button } from "../designSystem/Button"

export type InventoryCardProps = {
  cardData: CardData
  draggable?: boolean
}

export const InventoryCardCell = ({ cardData, draggable = false }: InventoryCardProps) => {
  const { game } = useGameStore()

  const collectionQuantity = game.cardCollection[cardData.name]
  const deckQuantity =
    game.screen.id === "editDeck" ? game.screen.cardNames.filter((cardName) => cardName === cardData.name).length : 0

  return (
    <div className="flex flex-col items-center justify-center">
      {draggable ? <InventoryCard cardData={cardData} /> : <CardDetailed cardData={cardData} />}
      <div className="flex items-center">
        <Button data-size="small" data-icon-only>
          -
        </Button>
        <InventoryQuantityIndicator quantity={collectionQuantity} quantityInDeck={deckQuantity} />
        <Button data-size="small" data-icon-only>
          +
        </Button>
      </div>
    </div>
  )
}
