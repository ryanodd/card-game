import { DECK_MIN_SIZE } from "@/src/game/Deck"
import { useEditDeckState } from "../../hooks/useEditDeckState"

export const DeckListFooter = () => {
  const { editDeck, setEditDeck } = useEditDeckState()
  return (
    <div className="bg-stone-900 flex justify-end px-2 py-1">
      <p className="text-lg text-stone-50">
        {editDeck.deck.cardNames.length}/{DECK_MIN_SIZE} Cards
      </p>
    </div>
  )
}
