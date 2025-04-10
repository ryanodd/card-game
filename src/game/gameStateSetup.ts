import { cardDataMap } from "./cards/allCards/allCards"
import { GameState } from "./GameData"

export const gameStateSetup = (game: GameState): GameState => {
  // Remove cards that aren't defined anymore. Due to the game updating
  // TODO give the user a notice that this happened
  const removedCardNames: string[] = []
  game.decks.forEach((deck) => {
    deck.cardNames = deck.cardNames.filter((cardName) => {
      if (cardDataMap[cardName] === undefined) {
        removedCardNames.push(cardName)
        return false
      }
      return true
    })
  })

  // Auto-select deck if none are active
  if (game.activeDeckId === null && game.decks.length > 0) {
    game.activeDeckId = game.decks[0].id
  }

  // TODO recover mid-duel
  // Are there any other scenarios that could use recovery?
  game.screen = { id: "mainMenu" }

  return game
}
