import { GameState } from "../GameData"
import { PackVariant } from "../Packs"

export const addPack = (game: GameState, packVariant: PackVariant): GameState => {
  game.packs[packVariant] = game.packs[packVariant] + 1
  return game
}
