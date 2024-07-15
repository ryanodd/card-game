import { CampaignLocationId } from "./Campaign"
import { Deck } from "./Deck"
import { CardName } from "./cards/CardName"
import { DuelState } from "./duel/DuelData"
import { PackRarity } from "./shop/PackData"

export type MainMenuState = {
  id: "mainMenu"
}

export type DuelScreenState = {
  id: "duel"
  duel: DuelState
  debugUiOpen: boolean
}

export type EditDeckState = {
  id: "editDeck"
  deck: Deck
}

export type ScreenState =
  | MainMenuState
  | { id: "campaignSelect" }
  | { id: "shop" }
  | { id: "packs" }
  | { id: "manageDecks" }
  | EditDeckState
  | { id: "collection" }
  | DuelScreenState

export type SettingsState = {
  animationMultiplier: number
  godMode: boolean
}

export const COLLECTION_MAX_PER_CARD = 3

export type CampaignLocationCompletionData = {
  unlocked: boolean
  completed: boolean
}

export type GameState = {
  screen: ScreenState
  activeDeckId: string | null
  collection: Record<CardName, number>
  currentCampaign?: {
    campaignId: string
    round: number
    deck: Deck
  }
  campaignCompletion: Record<CampaignLocationId, CampaignLocationCompletionData>
  decks: Deck[]
  gold: number
  packs: Record<PackRarity, number>
  settings: SettingsState
}

export const getActiveDeck = (game: GameState) => {
  return game.decks.find((deck) => {
    return deck.id === game.activeDeckId
  })
}
