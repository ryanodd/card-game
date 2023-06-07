export type GameState = {
  activeDeckIndex: number
  decks: {
    name: string
    cardNumbers: number[]
  }[]
}
