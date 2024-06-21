import { MainView } from "../components/MainView"
import { GameBackground } from "../components/GameBackground"
import { useCallback, useEffect } from "react"

import { useEditDeckState } from "../hooks/useEditDeckState"
import { InventoryBrowser } from "../components/EditDeckScreen/InventoryBrowser"
import { useGameStore } from "../hooks/useGameStore"
import { DragOverlay, useDndContext } from "@dnd-kit/core"
import { Button } from "../components/designSystem/Button"
import { DeckList } from "../components/EditDeckScreen/DeckList"
import { InventoryCard } from "../components/EditDeckScreen/InventoryCard"
import { EditDeckCancelDialog } from "../components/EditDeckScreen/EditDeckCancelDialog"
import { cardDataMap } from "@/src/game/cards/AllCards"

export type EditDeckScreenProps = {}

export const EditDeckScreen = ({}: EditDeckScreenProps) => {
  const { game, setGame } = useGameStore()
  const { editDeck, setEditDeck } = useEditDeckState()

  const { active } = useDndContext()
  const draggedCardName = active?.id?.toString?.()?.startsWith?.("draggable-inventory-card-")
    ? active.id.toString().split("draggable-inventory-card-")[1]
    : null

  // Init? only if other store data is needed
  useEffect(() => {
    // setEditDeck({
    // }
  }, [])

  const onDoneClick = () => {
    const replaceIndex = game.decks.findIndex((deck) => deck.id === editDeck.deck.id)

    // New Deck
    if (replaceIndex === -1) {
      game.decks = [...game.decks, editDeck.deck]
      // Existing Deck
    } else {
      game.decks[replaceIndex] = editDeck.deck // Is this redundant lol? (Were we saving as we go, just by reference?)
    }

    // Save
    setGame({
      ...game,
      screen: { id: "manageDecks" },
    })
  }

  const onCancel = useCallback(() => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }, [game, setGame])

  return (
    <MainView>
      <GameBackground />
      <DragOverlay dropAnimation={null}>
        {draggedCardName !== null && <InventoryCard cardData={cardDataMap[draggedCardName]} />}
      </DragOverlay>
      <div className="absolute-fill inset-0 z-10 flex flex-col p-2 gap-2">
        <h1 className="text-3xl font-semibold text-gray-900">{editDeck.deck.name}</h1>
        <div className="flex-grow flex overflow-hidden relative">
          <InventoryBrowser />
          <DeckList />
        </div>
        <div className="flex">
          {editDeck.deck.cardNames.length === 0 ? <Button onClick={onCancel}>Cancel</Button> : <EditDeckCancelDialog />}
          <div className="flex-grow" />
          <Button onClick={onDoneClick}>Done</Button>
        </div>
      </div>
    </MainView>
  )
}
