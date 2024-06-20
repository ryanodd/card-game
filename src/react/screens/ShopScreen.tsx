import { randomUUID } from "crypto"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { createNewEditDeckState } from "../hooks/useEditDeckState"
import { useGameStore } from "../hooks/useGameStore"
import { v4 } from "uuid"
import { GameBackground } from "../components/GameBackground"
import { Deck } from "@/src/game/Deck"
import styles from "./ManageDecksScreen.module.css"
import { GoldTotal } from "../components/GoldTotal"

export const ShopScreen = () => {
  const { game, setGame } = useGameStore()

  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  return (
    <MainView>
      <GameBackground />
      <div className="w-full h-full flex p-4 flex-col">
        <h1 className="text-5xl">Shop</h1>
        <div className="grow"></div>
        <div className="flex justify-between items-center">
          <Button className="flex items-center" onClick={onBackClick}>
            ⬅ Back
          </Button>
          <GoldTotal value={game.gold} />
        </div>
      </div>
    </MainView>
  )
}
