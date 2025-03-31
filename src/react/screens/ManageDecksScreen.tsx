import { randomUUID } from "crypto"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { createNewEditDeckState } from "../hooks/useEditDeckState"
import { useGameStore } from "../hooks/useGameStore"
import { v4 } from "uuid"
import { GameBackground } from "../components/GameBackground"
import { Deck } from "@/src/game/decks/Deck"
import styles from "./ManageDecksScreen.module.css"
import { Footer } from "../components/Footer"
import { DeckGrid } from "../components/ManageDecksScreen/DeckGrid"

export const ManageDecksScreen = () => {
  const { game, setGame } = useGameStore()

  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="grow flex flex-col p-8 gap-8">
        <h1 className="text-5xl text-stone-50">Decks</h1>
        <DeckGrid />
      </div>
      <Footer
        leftContent={
          <Button className="flex items-center" onClick={onBackClick}>
            ⬅ Back
          </Button>
        }
      />
    </div>
  )
}
