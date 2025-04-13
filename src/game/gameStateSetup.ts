import { cardDataMap } from "./cards/allCards/allCards"
import { CardName } from "./cards/CardName"
import { GameState } from "./GameData"

export const gameStateSetup = (game: GameState): GameState => {
  // Remove cards that aren't defined anymore. Due to the game updating

  const removedCardNames: string[] = []
  Object.keys(game.cardCollection).forEach((cardName) => {
    if (cardDataMap[cardName as CardName] === undefined) {
      delete game.cardCollection[cardName as CardName]
      removedCardNames.push(cardName)
    }
  })
  if (removedCardNames.length > 0) {
    game.decks.forEach((deck) => {
      deck.cardNames = deck.cardNames.filter((cardName) => {
        if (removedCardNames.includes(cardName)) {
          return false
        }
        return true
      })
    })
  }

  // Auto-select deck if none are active
  if (game.activeDeckId === null && game.decks.length > 0) {
    game.activeDeckId = game.decks[0].id
  }
  // TODO recover mid-duel
  // Are there any other scenarios that could use recovery?
  game.screen = { id: "mainMenu", cardsRemoved: removedCardNames.length > 0 ? removedCardNames : undefined }

  return game
}
