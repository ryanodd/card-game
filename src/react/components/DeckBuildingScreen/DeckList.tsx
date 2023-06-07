import { useDeckBuildingStore } from "../../hooks/useDeckBuildingStore"
import { DeckCard } from "./DeckCard"

export const DeckList = () => {
  const { deckBuilding } = useDeckBuildingStore()
  return (
    <div className="w-48 bg-stone-800">
      {deckBuilding.deckCardNos.map((number) => (
        <DeckCard key={number} cardNumber={number} />
      ))}
    </div>
  )
}
