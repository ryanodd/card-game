import { GameState } from "../game/GameData"

const LOCAL_STORAGE_KEY = "saveData"

export const saveGameToLocalStorage = (gameData: GameState) => {
  if (typeof window === "undefined") {
    return
  }
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameData))
}

export const loadGameFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return null
  }
  const jsonString = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!jsonString) {
    return null
  }
  // TODO this is defeinitely not rigorous to cheaters. Maybe even bugs.
  const parsedGameState = JSON.parse(jsonString) as GameState
  return parsedGameState
}
