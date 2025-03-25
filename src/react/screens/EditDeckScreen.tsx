import { MainView } from "../components/MainView"
import { GameBackground } from "../components/GameBackground"
import { useCallback, useEffect } from "react"

import { useEditDeckState } from "../hooks/useEditDeckState"
import { useGameStore } from "../hooks/useGameStore"
import { DragOverlay, useDndContext } from "@dnd-kit/core"
import { Button } from "../components/designSystem/Button"
import { DeckListColumn } from "../components/EditDeckScreen/DeckListColumn"
import { InventoryCard } from "../components/EditDeckScreen/InventoryCard"
import { EditDeckCancelDialog } from "../components/EditDeckScreen/EditDeckCancelDialog"
import { CardName } from "@/src/game/cards/CardName"
import { Footer } from "../components/Footer"
import { Deck } from "@/src/game/decks/Deck"
import { v4 } from "uuid"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"
import { InventoryBrowser } from "../components/EditDeckScreen/InventoryBrowser"
import { heroDataMap } from "@/src/game/heroes/AllHeroes"
import { Filters, useInventoryBrowserStore } from "../hooks/useInventoryBrowserStore"

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

  // When changing heroes, add filters
  const { filters, setFilters } = useInventoryBrowserStore()
  useEffect(() => {
    if (editDeck.heroName === null) {
      setFilters({
        ...filters,
        energyType: { neutral: true, fire: true, water: true, earth: true, air: true },
      })
    } else {
      const hero = heroDataMap[editDeck.heroName]
      const newFilters: Filters = {
        ...filters,
        energyType: { neutral: true, fire: false, water: false, earth: false, air: false },
      }
      for (const energyType of hero.energyTypes) {
        newFilters.energyType[energyType] = true
      }
      setFilters(newFilters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editDeck.heroName])

  const onDoneClick = () => {
    if (editDeck.heroName === null) {
      throw new Error("Tried to create a deck without selecting a hero!")
    }

    // New Deck
    if (editDeck.deckId === null) {
      game.decks = [
        ...game.decks,
        {
          id: v4(),
          name: editDeck.deckName,
          heroName: editDeck.heroName,
          cardNames: editDeck.cardNames,
        },
      ]
      // Existing Deck
    } else {
      const replaceIndex = game.decks.findIndex((deck) => deck.id === editDeck.deckId)

      game.decks[replaceIndex] = {
        id: editDeck.deckId,
        name: editDeck.deckName,
        heroName: editDeck.heroName,
        cardNames: editDeck.cardNames,
      }
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
        {draggedCardName !== null && <InventoryCard cardData={cardDataMap[draggedCardName as CardName]} />}
      </DragOverlay>
      <div className="absolute-fill inset-0 z-10 flex flex-col">
        <div className="grow flex flex-col overflow-hidden p-2 gap-2">
          <h1 className="text-5xl text-stone-50">{editDeck.deckName}</h1>
          <div className="flex-grow flex gap-2 overflow-hidden relative">
            <InventoryBrowser cardsDraggable />
            <DeckListColumn />
          </div>
        </div>
        <Footer
          leftContent={
            editDeck.cardNames.length === 0 ? <Button onClick={onCancel}>Cancel</Button> : <EditDeckCancelDialog />
          }
          rightContent={<Button onClick={onDoneClick}>Done</Button>}
        />
      </div>
    </MainView>
  )
}
