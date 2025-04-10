import { Deck } from "@/src/game/decks/Deck"
import { useGameStore } from "./useGameStore"
import { EditDeckScreenState } from "@/src/game/GameData"
import { v4 } from "uuid"

export const createNewEditDeckState = (deck: Deck | null): EditDeckScreenState => {
  return {
    id: "editDeck",
    deckId: deck?.id ?? null,
    deckName: deck?.name ?? "My deck",
    heroName: deck?.heroName ?? null,
    cardNames: deck?.cardNames ?? [],
    selectHeroDialogOpen: deck ? false : true,
  }
}

export const useEditDeckState = () => {
  const { game, setGame } = useGameStore()

  const editDeckScreenState = game.screen
  if (editDeckScreenState.id !== "editDeck") {
    throw Error("Tried to use editDeck state when not on the deck building screen!")
  }

  const setEditDeck = (editDeck: EditDeckScreenState) => {
    setGame({
      ...game,
      screen: editDeck,
    })
  }
  return {
    editDeck: game.screen as EditDeckScreenState,
    setEditDeck,
  }
}
