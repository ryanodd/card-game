import { Deck, EditDeckState } from "@/src/game/Deck"
import { useGameStore } from "./useGameStore"
import { Dispatch, SetStateAction } from "react"

export const createNewEditDeckState = (deck: Deck): EditDeckState => {
  return {
    id: "editDeck",
    deck, // TODO might need a deep copy here
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
