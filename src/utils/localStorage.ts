import { GameState } from "../game/GameData"

const LOCAL_STORAGE_KEY = "saveData"

export const saveGameToLocalStorage = (gameData: GameState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameData))
}

export const loadGameFromLocalStorage = () => {
  const jsonString = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (jsonString === null) {
    return null
  }
  // TODO this is defeinitely not rigorous to cheaters. Maybe even bugs.
  const parsedGameState = JSON.parse(jsonString) as GameState
  return parsedGameState
}
