import { CardState, DuelReward, DuelState } from "./DuelData"
import { v4 } from "uuid"
import { GameState, getActiveDeck } from "../GameData"
import { Deck } from "../decks/Deck"
import { CardName } from "../cards/CardName"
import { CardData } from "../cards/CardData"
import { heroDataMap } from "../heroes/AllHeroes"
import { LeagueGame } from "../league/leagueTypes"
import { campaignChallengeMap } from "../Campaign"
import { generateDeck } from "../decks/generateDeck"
import { cardDataMap } from "../cards/allCards/allCards"

export const STARTING_HEALTH = 15

export const cardDataToCardState = (cardData: CardData): CardState => {
  switch (cardData.cardType) {
    case "creature":
      return {
        instanceId: v4(),
        name: cardData.name,
        cost: cardData.cost,
        cardType: cardData.cardType,
        attack: cardData.attack,
        health: cardData.health,
        damage: 0,
        summoningSickness: false,
        modifiers: [],
        status: null,
      }
    case "spell":
      return {
        instanceId: v4(),
        name: cardData.name,
        cost: cardData.cost,
        cardType: cardData.cardType,
      }
  }
}

export const createCardsFromNames = (cardNames: CardName[]): CardState[] => {
  const cards: CardState[] = []

  for (let x = 0; x < cardNames.length; x++) {
    const cardData = cardDataMap[cardNames[x]]
    cards.push(cardDataToCardState(cardData))
  }
  return cards
}

export type DuelEntryPoint =
  | {
      duelType: "play-now"
    }
  | {
      duelType: "league"
      leagueGame: LeagueGame
    }
  | {
      duelType: "campaign"
      campaignChallengeId: string
    }

export const getDuelParamsFromEntryPoint = (game: GameState, entryPoint: DuelEntryPoint): DuelParams => {
  const humanDeck = getActiveDeck(game)
  if (humanDeck === undefined) {
    throw Error("No active deck found")
  }

  if (entryPoint.duelType === "league") {
    const opponentLeaguePlayer = game.league.players[entryPoint.leagueGame.playerIdRight]
    if (opponentLeaguePlayer.human) {
      throw Error("League opponent is human")
    }
    const opponentDeck = opponentLeaguePlayer.deck
    return {
      humanDeck: humanDeck,
      opponentDeck: opponentDeck,
      reward: {
        type: "gold",
        goldQuantity: 20,
      },
      leagueGame: true,
    }
  }

  if (entryPoint.duelType === "campaign") {
    const campaignChallenge = campaignChallengeMap[entryPoint.campaignChallengeId]
    const opponentDeck = campaignChallenge.opponentDeck
    return {
      humanDeck: humanDeck,
      opponentDeck: opponentDeck,
      reward: campaignChallenge.reward,
    }
  }

  // last case - entryPoint.duelType === "play-now"
  return {
    humanDeck: humanDeck,
    opponentDeck: generateDeck({ method: "completely-random" }),
    reward: {
      type: "gold",
      goldQuantity: 20,
    },
    tutorial: true,
  }
}

export type DuelParams = {
  humanDeck: Deck
  opponentDeck: Deck
  reward?: DuelReward
  leagueGame?: boolean
  tutorial?: boolean
}

export const createNewDuel = ({ humanDeck, opponentDeck, reward, leagueGame, tutorial }: DuelParams) => {
  const duel: DuelState = {
    id: "duel",
    info: {
      reward,
      leagueGame: leagueGame === true,
      tutorial: tutorial === true,
    },
    human: {
      hero: heroDataMap[humanDeck.heroName],
      health: STARTING_HEALTH,
      deck: createCardsFromNames(humanDeck.cardNames),
      hand: [],
      discard: [],
      rows: [[], []],
      cardSelect: [],
      inPlay: null,
      energy: {
        neutral: 0,
        fire: 0,
        water: 0,
        earth: 0,
        air: 0,
      },
      energyCapacity: 0,
      drawnDead: false,
    },
    opponent: {
      hero: heroDataMap[opponentDeck.heroName],
      health: STARTING_HEALTH,
      deck: createCardsFromNames(opponentDeck.cardNames),
      hand: [],
      discard: [],
      rows: [[], []],
      cardSelect: [],
      inPlay: null,
      energy: {
        neutral: 0,
        fire: 0,
        water: 0,
        earth: 0,
        air: 0,
      },
      energyCapacity: 0,
      drawnDead: false,
    },

    currentAnimation: null,
    choice: { id: "CONFIRM_DUEL_START", playerId: "human" },
    playerGoingFirst: "human",
    currentPlayerId: "human",
    turnNumber: 1,

    winner: null,
  }
  return duel
}
