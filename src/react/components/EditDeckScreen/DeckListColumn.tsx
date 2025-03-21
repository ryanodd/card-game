import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { DECK_LIST_CARD_WIDTH_REMS, DeckListCard } from "./DeckListCard"
import { sortDeckListNames } from "@/src/game/helpers"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import styles from "./Inventory.module.css"
import { CardName } from "@/src/game/cards/CardName"
import { DeckListFooter } from "./DeckListFooter"
import { HeroCell } from "./HeroCell"
import { DefaultDialog } from "../designSystem/Dialog"
import { HeroSelectDialogContent } from "./HeroSelectDialogContent"
import { HeroSelectDialog } from "./HeroSelectDialog"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"

export const DROPPABLE_ID_DECKLIST = "droppable-decklist"

export const DeckListColumn = () => {
  const { editDeck, setEditDeck } = useEditDeckState()

  const cardTotalsMap: Record<string, number> = {}
  editDeck.cardNames.forEach((cardName) => {
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
      const draggedCardName = event.active.id.toString().split("draggable-inventory-card-")[1] as CardName
      if (!Object.keys(cardDataMap).includes(draggedCardName)) {
        throw Error(`Dragged card not found by name: ${draggedCardName}`)
      }
      const newEditDeckState = {
        ...editDeck,

        cardNames: sortDeckListNames([draggedCardName, ...editDeck.cardNames]),
      }
      setEditDeck(newEditDeckState)
    },
  })

  return (
    <div ref={setNodeRef} className={`${styles.deckListColumn} ${isOver ? "brightness-125" : ""}`}>
      <HeroSelectDialog
        open={editDeck.selectHeroDialogOpen}
        onOpenChange={(open: boolean) => {
          setEditDeck({ ...editDeck, selectHeroDialogOpen: open })
        }}
        trigger={<HeroCell heroName={editDeck.heroName} />}
        content={<HeroSelectDialogContent />}
      />

      <div className={`${styles.deckList} `}>
        {[...Object.keys(cardTotalsMap)].map((cardName) => (
          <DeckListCard key={cardName} cardName={cardName} quantity={cardTotalsMap[cardName]} />
        ))}
        {/*
         * for image cropping reasons, the image determines the width of this deck list.
         * When we're empty, maintain width with this empty div.
         */}
        {editDeck.cardNames.length === 0 && <div style={{ width: `${DECK_LIST_CARD_WIDTH_REMS}rem` }} />}
      </div>

      <DeckListFooter />
    </div>
  )
}
