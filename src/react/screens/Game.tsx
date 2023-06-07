import { useEffect } from "react"
import { DuelScreen } from "./DuelScreen"
import * as Tooltip from "@radix-ui/react-tooltip"
import { useGameStore } from "../hooks/useGameStore"
import { useForceUpdate } from "../hooks/useForceUpdate"

export const Game = () => {
  const forceUpdate = useForceUpdate()
  const { setRerenderFunction } = useGameStore()

  // Hook up UI updater
  useEffect(() => {
    setRerenderFunction(forceUpdate)
  }, [forceUpdate, setRerenderFunction])

  return (
    <Tooltip.Provider>
      <DuelScreen />
    </Tooltip.Provider>
  )
}
