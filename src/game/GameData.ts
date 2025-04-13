import { CampaignLocationId } from "./Campaign"
import { Deck } from "./decks/Deck"
import { CardName } from "./cards/CardName"
import { DuelState } from "./duel/DuelData"
import { HeroName } from "./duel/heroBehaviour/HeroName"
import { League } from "./league/leagueTypes"

export type MainMenuScreenState = {
  id: "mainMenu"
  cardsRemoved?: string[]
}

export type DuelScreenState = {
  id: "duel"
  duel: DuelState
  debugUiOpen: boolean
}

export type EditDeckScreenState = {
  id: "editDeck"
  deckId: string | null
  deckName: string
  heroName: HeroName | null
  cardNames: CardName[]
  selectHeroDialogOpen: boolean
}

export type CollectionScreenState = {
  id: "collection"
}

export type OpenPackScreenState = {
  id: "openPack"
  cardsOpened: CardName[]
}

export type ScreenState =
  | { id: "title" }
  | MainMenuScreenState
  | { id: "league" }
  | { id: "campaignSelect" }
  | { id: "shop" }
  | { id: "managePacks" }
  | OpenPackScreenState
  | { id: "manageDecks" }
  | EditDeckScreenState
  | CollectionScreenState
  | DuelScreenState

export type SettingsState = {
  animationMultiplier: number
  godMode: boolean
}

export const COLLECTION_MAX_PER_CARD = 4

export type CampaignLocationCompletionData = {
  unlocked: boolean
  completed: boolean
}

export type PackVariant = "Standard Pack" | "Elite Pack" // | "mythic"

export type GameState = {
  screen: ScreenState
  activeDeckId: string | null
  cardCollection: Record<CardName, number>
  heroCollection: Record<HeroName, boolean>
  league: League
  currentCampaign?: {
    campaignId: string
    round: number
    deck: Deck
  }
  campaignCompletion: Record<CampaignLocationId, CampaignLocationCompletionData>
  decks: Deck[]
  gold: number
  packs: Record<PackVariant, number>
  settings: SettingsState
}

export const getActiveDeck = (game: GameState): Deck | undefined => {
  return game.decks.find((deck) => {
    return deck.id === game.activeDeckId
  })
}
