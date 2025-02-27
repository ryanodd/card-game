import { CardData } from "@/src/game/cards/CardData"
import { InventoryCard } from "./InventoryCard"
import { useGameStore } from "../../hooks/useGameStore"
import { InventoryQuantityIndicator } from "./InventoryQuantityIndicator"
import { CardDetailed } from "../CardDetailed"

export type InventoryCardProps = {
  cardData: CardData
  draggable?: boolean
}

export const InventoryCardCell = ({ cardData, draggable = false }: InventoryCardProps) => {
  const { game } = useGameStore()

  const collectionQuantity = game.collection[cardData.name]
  const deckQuantity =
    game.screen.id === "editDeck"
      ? game.screen.deck.cardNames.filter((cardName) => cardName === cardData.name).length
      : 0

  return (
    <div className="flex flex-col">
      {draggable ? <InventoryCard cardData={cardData} /> : <CardDetailed cardData={cardData} />}

      {cardData.rarity !== "base" && (
        <InventoryQuantityIndicator quantity={collectionQuantity} quantityInDeck={deckQuantity} />
      )}
    </div>
  )
}
