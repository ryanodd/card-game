import { useEffect } from "react"
import { DuelScreen } from "./DuelScreen"
import * as Tooltip from "@radix-ui/react-tooltip"
import { useGameStore } from "../hooks/useGameStore"
import { useForceUpdate } from "../hooks/useForceUpdate"
import { DndContext } from "@dnd-kit/core"
import { MainMenuScreen } from "./MainMenuScreen"
import { ManageDecksScreen } from "./ManageDecksScreen"
import { EditDeckScreen } from "./EditDeckScreen"

export const Game = () => {
  const forceUpdate = useForceUpdate()
  const { game, setRerenderFunction } = useGameStore()

  // Hook up UI updater
  useEffect(() => {
    setRerenderFunction(forceUpdate)
  }, [forceUpdate, setRerenderFunction])

  return (
    <Tooltip.Provider skipDelayDuration={0}>
      <DndContext>
        {game.screen.id === "mainMenu" && <MainMenuScreen />}
        {game.screen.id === "manageDecks" && <ManageDecksScreen />}
        {game.screen.id === "editDeck" && <EditDeckScreen />}
        {game.screen.id === "duel" && <DuelScreen />}
        {/* {game.screen.id === "duelEnd" && <DuelEndScreen />} */}
      </DndContext>
    </Tooltip.Provider>
  )
}
