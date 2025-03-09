import { Deck } from "@/src/game/Deck"
import { useGameStore } from "./useGameStore"
import { Dispatch, SetStateAction } from "react"
import { EditDeckState } from "@/src/game/GameData"
import { v4 } from "uuid"

export const createNewEditDeckState = (deck: Deck | null): EditDeckState => {
  return {
    id: "editDeck",
    deckId: deck?.id ?? null,
    deckName: deck?.name ?? "My deck",
    heroName: deck?.heroName ?? null,
    cardNames: deck?.cardNames ?? [],
  }
}

export const useEditDeckState = () => {
  const { game, setGame } = useGameStore()

  const editDeckScreenState = game.screen
  if (editDeckScreenState.id !== "editDeck") {
    throw Error("Tried to use editDeck state when not on the deck building screen!")
  }

  const setEditDeck = (editDeck: EditDeckState) => {
    setGame({
      ...game,
      screen: editDeck,
    })
  }
  return {
    editDeck: game.screen as EditDeckState,
    setEditDeck,
  }
}
