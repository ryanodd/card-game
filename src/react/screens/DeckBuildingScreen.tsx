import { MainView } from "../components/MainView"
import { GameBackground } from "../components/GameBackground"
import { useEffect } from "react"

import { useDeckBuildingStore } from "../hooks/useDeckBuildingStore"

export type DuelScreenProps = {}

export const DuelScreen = ({}: DuelScreenProps) => {
  const { deckBuilding } = useDeckBuildingStore()

  // Init? only if other store data is needed
  useEffect(() => {
    // setDeckBuilding({
    // }
  }, [])

  return (
    <MainView>
      <GameBackground />
      <div className="absolute-fill inset-0 z-10 flex gap-4"></div>
    </MainView>
  )
}
