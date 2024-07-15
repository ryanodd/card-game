import { CardData } from "@/src/game/cards/CardData"
import { InventoryCard } from "./InventoryCard"
import { useGameStore } from "../../hooks/useGameStore"
import { InventoryQuantityIndicator } from "./InventoryQuantityIndicator"

export type CardProps = {
  cardData: CardData
}

export const InventoryCardCell = ({ cardData }: CardProps) => {
  const { game } = useGameStore()

  const collectionQuantity = game.collection[cardData.name]
  const deckQuantity =
    game.screen.id === "editDeck"
      ? game.screen.deck.cardNames.filter((cardName) => cardName === cardData.name).length
      : 0

  return (
    <div className="flex flex-col">
      <InventoryCard cardData={cardData} />
      {cardData.rarity !== "base" && (
        <InventoryQuantityIndicator quantity={collectionQuantity} quantityInDeck={deckQuantity} />
      )}
    </div>
  )
}
