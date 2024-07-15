import { MainView } from "../components/MainView"
import { GameBackground } from "../components/GameBackground"
import { useCallback, useEffect } from "react"

import { InventoryBrowser } from "../components/EditDeckScreen/InventoryBrowser"
import { useGameStore } from "../hooks/useGameStore"
import { Button } from "../components/designSystem/Button"
import { Footer } from "../components/Footer"

export type CollectionScreenProps = {}

export const CollectionScreen = ({}: CollectionScreenProps) => {
  const { game, setGame } = useGameStore()

  const onBackClick = useCallback(() => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }, [game, setGame])

  return (
    <MainView>
      <GameBackground />
      <div className="absolute-fill inset-0 z-10 flex flex-col ">
        <div className="grow overflow-hidden flex flex-col p-2 gap-2">
          <h1 className="text-5xl text-stone-50">Collection</h1>
          <div className="flex-grow flex overflow-hidden relative">
            <InventoryBrowser />
          </div>
          <div className="flex">
            <div className="flex-grow" />
          </div>
        </div>
        <Footer leftContent={<Button onClick={onBackClick}>⬅ Back</Button>} />
      </div>
    </MainView>
  )
}
