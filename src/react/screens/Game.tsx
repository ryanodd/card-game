import { useEffect } from "react"
import { DuelScreen } from "./DuelScreen"
import * as Tooltip from "@radix-ui/react-tooltip"
import { useGameStore } from "../hooks/useGameStore"
import { useForceUpdate } from "../hooks/useForceUpdate"
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { MainMenuScreen } from "./MainMenuScreen"
import { ManageDecksScreen } from "./ManageDecksScreen"
import { EditDeckScreen } from "./EditDeckScreen"
import { MyDndTest } from "./MyDndTest"
import { CampaignLocationSelectScreen } from "./CampaignLocationSelectScreen"
import { ShopScreen } from "./ShopScreen"
import { CollectionScreen } from "./CollectionScreen"
import { ManagePacksScreen } from "./ManagePacksScreen"
import { LeagueScreen } from "./LeagueScreen"
import { OpenPackScreen } from "./OpenPackScreen"

export const Game = () => {
  const forceUpdate = useForceUpdate()
  const { game, setRerenderFunction } = useGameStore()

  // Hook up UI updater
  useEffect(() => {
    setRerenderFunction(forceUpdate)
  }, [forceUpdate, setRerenderFunction])

  // Defines when drags are actually considered clicks
  // https://github.com/clauderic/dnd-kit/issues/591#issuecomment-1017050816
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  )

  return (
    <Tooltip.Provider skipDelayDuration={0}>
      <DndContext sensors={sensors}>
        {game.screen.id === "mainMenu" && <MainMenuScreen />}
        {game.screen.id === "league" && <LeagueScreen />}
        {game.screen.id === "campaignSelect" && <CampaignLocationSelectScreen />}
        {game.screen.id === "shop" && <ShopScreen />}
        {game.screen.id === "managePacks" && <ManagePacksScreen />}
        {game.screen.id === "openPack" && <OpenPackScreen />}
        {game.screen.id === "manageDecks" && <ManageDecksScreen />}
        {game.screen.id === "editDeck" && <EditDeckScreen />}
        {game.screen.id === "collection" && <CollectionScreen />}
        {game.screen.id === "duel" && <DuelScreen />}
      </DndContext>
    </Tooltip.Provider>
  )
}
