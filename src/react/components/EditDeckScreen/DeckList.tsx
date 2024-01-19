import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { DeckListCard } from "./DeckListCard"
import { cardDataMap } from "@/src/game/Cards"
import { sortCardNames } from "@/src/game/helpers"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import styles from "./Inventory.module.css"

export const DROPPABLE_ID_DECKLIST = "droppable-decklist"

export const DeckList = () => {
  const { editDeck, setEditDeck } = useEditDeckState()

  const cardTotalsMap: Record<string, number> = {}
  editDeck.deck.cardNames.forEach((cardName) => {
    cardTotalsMap[cardName] = cardTotalsMap[cardName] ? cardTotalsMap[cardName] + 1 : 1
  })

  const { isOver, setNodeRef } = useDroppable({
    id: DROPPABLE_ID_DECKLIST,
  })

  useDndMonitor({
    onDragEnd: (event) => {
      if (event.over?.id !== DROPPABLE_ID_DECKLIST) {
        return
      }
      if (!event.active.id.toString().startsWith("draggable-inventory-card-")) {
        return
      }
      const draggedCardName = event.active.id.toString().split("draggable-inventory-card-")[1]
      if (!Object.keys(cardDataMap).includes(draggedCardName)) {
        throw Error(`Dragged card not found by name: ${draggedCardName}`)
      }
      const newEditDeckState = {
        ...editDeck,
        deck: {
          ...editDeck.deck,
          cardNames: sortCardNames([draggedCardName, ...editDeck.deck.cardNames]),
        },
      }
      setEditDeck(newEditDeckState)
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`${styles.deckList} bg-stone-800 p-1 flex flex-col gap-1 ${isOver ? "brightness-125" : ""}`}
    >
      {[...(Object.keys(cardTotalsMap) as unknown as number[])].map((cardNo) => (
        <DeckListCard key={cardNo} cardNumber={cardNo} quantity={cardTotalsMap[cardNo]} />
      ))}
    </div>
  )
}
