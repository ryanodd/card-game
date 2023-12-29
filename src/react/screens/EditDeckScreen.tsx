import { MainView } from "../components/MainView"
import { GameBackground } from "../components/GameBackground"
import { useEffect } from "react"

import { useEditDeckState } from "../hooks/useEditDeckState"
import { InventoryBrowser } from "../components/EditDeckScreen/InventoryBrowser"
import { useGameStore } from "../hooks/useGameStore"
import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import { cardDataMap } from "@/src/game/Cards"
import { Button } from "../components/designSystem/Button"
import { DeckList } from "../components/EditDeckScreen/DeckList"

export type EditDeckScreenProps = {}

export const DROPPABLE_ID_DECK_BUILDING_SCREEN = "droppable-deck-biulding-screen"

export const EditDeckScreen = ({}: EditDeckScreenProps) => {
  const { game, setGame } = useGameStore()
  const { editDeck, setEditDeck } = useEditDeckState()

  // Init? only if other store data is needed
  useEffect(() => {
    // setEditDeck({
    // }
  }, [])

  const { setNodeRef } = useDroppable({
    id: DROPPABLE_ID_DECK_BUILDING_SCREEN,
  })

  useDndMonitor({
    onDragEnd: (event) => {
      if (event.over?.id !== DROPPABLE_ID_DECK_BUILDING_SCREEN) {
        return
      }
      if (!event.active.id.toString().startsWith("draggable-deck-list-card-")) {
        return
      }
      const draggedCardName = event.active.id.toString().split("draggable-deck-list-card-")[1]
      if (!Object.keys(cardDataMap).includes(draggedCardName)) {
        throw Error(`Dragged card not found by name: ${draggedCardName}`)
      }
      const removedCardIndex = editDeck.deck.cardNames.findIndex((value) => value === draggedCardName)
      if (removedCardIndex === -1) {
        throw Error(`Removed card not found in deck: ${draggedCardName}`)
      }
      editDeck.deck.cardNames.splice(removedCardIndex, 1)
    },
  })

  const onDoneClick = () => {
    const replaceIndex = game.decks.findIndex((deck) => deck.id === editDeck.deck.id)
    game.decks[replaceIndex] = editDeck.deck // Is this redundant? (Are we saving as we go, just by reference?)
    setGame({
      ...game,
      screen: { id: "manageDecks" },
    })
  }

  return (
    <MainView>
      <GameBackground />
      <div className="absolute-fill inset-0 z-10 flex flex-col p-2 gap-2" ref={setNodeRef}>
        <h1 className="text-3xl font-semibold text-gray-900">{editDeck.deck.name}</h1>
        <div className="flex-grow flex">
          <InventoryBrowser />
          <DeckList />
        </div>
        <div className="flex">
          <div className="flex-grow" />
          <Button onClick={onDoneClick}>Done</Button>
        </div>
      </div>
    </MainView>
  )
}
