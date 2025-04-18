import { Deck } from "./decks/Deck"
import { deckMap } from "./decks/Decks"
import { DuelReward } from "./duel/DuelData"

export type CampaignChallenge = {
  id: string
  title: string
  opponentDeck: Deck
  reward: DuelReward
}

export const campaignChallengeMap: Record<string, CampaignChallenge> = {
  playNow: {
    id: "playNow",
    title: "Play now",
    opponentDeck: deckMap.firstOpponent,
    reward: { type: "gold", goldQuantity: 50 },
  },
  tutorial1: {
    id: "tutorial1",
    title: "Tutorial 1",
    opponentDeck: deckMap.firstOpponent,
    reward: { type: "gold", goldQuantity: 50 },
  },
  tutorial2: {
    id: "tutorial2",
    title: "Tutorial 2",
    opponentDeck: deckMap.firstOpponent,
    reward: { type: "gold", goldQuantity: 50 },
  },
  tutorial3: {
    id: "tutorial3",
    title: "Tutorial 3",
    opponentDeck: deckMap.firstOpponent,
    reward: { type: "gold", goldQuantity: 50 },
  },
}

export type CampaignLocationId = "tutorial" | "location1" | "location2" | "location3"

export type CampaignLocation = {
  id: CampaignLocationId
  title: string
} & {
  locationType: "gauntlet" // | "some other thing"
  challengeIds: string[]
} // | {locationType: "some other thing"}

export type CampaignData = {
  locations: CampaignLocation[]
}

export const campaignData: CampaignData = {
  locations: [
    {
      id: "tutorial",
      title: "Tutorial",
      locationType: "gauntlet",
      challengeIds: ["tutorial1", "tutorial2", "tutorial3"],
    },

    {
      id: "location1",
      title: "Location 1",
      locationType: "gauntlet",
      challengeIds: ["1-1", "1-2", "1-3"],
    },
    {
      id: "location2",
      title: "Location 2",
      locationType: "gauntlet",
      challengeIds: ["2-1", "2-2", "2-3"],
    },
    {
      id: "location3",
      title: "Location 3",
      locationType: "gauntlet",
      challengeIds: ["3-1", "3-2", "3-3", "3-4", "3-5"],
    },
  ],
}
