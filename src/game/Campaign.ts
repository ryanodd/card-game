import { Deck } from "./Deck"
import { deckMap } from "./Decks"

export type Round = {
  id: string
  title: string
  opponentDeck: Deck
}

export type Campaign = {
  id: string
  title: string
  rounds: Round[]
}

export const campaignData: Campaign[] = [
  {
    id: "tutorial",
    title: "Tutorial",
    rounds: [
      {
        id: "tutorial1",
        title: "First Duel",
        opponentDeck: deckMap.firstOpponent,
      },
      {
        id: "tutorial2",
        title: "Second Duel",
        opponentDeck: deckMap.firstOpponent,
      },
      {
        id: "tutorial3",
        title: "Third Duel",
        opponentDeck: deckMap.firstOpponent,
      },
    ],
  },
]
