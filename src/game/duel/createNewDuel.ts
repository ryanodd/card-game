import { cardDataMap } from "../cards/AllCards"
import { CardState, DuelState } from "./DuelData"
import { v4 } from "uuid"
import { GameState, getActiveDeck } from "../GameData"
import { Deck } from "../Deck"
import { CardName } from "../cards/CardName"
import { CardData } from "../cards/CardData"

export const STARTING_HEALTH = 20

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
      }
    case "spell":
      return {
        instanceId: v4(),
        name: cardData.name,
        cost: cardData.cost,
        cardType: cardData.cardType,
        modifiers: [],
      }
    case "energy":
      return {
        instanceId: v4(),
        name: cardData.name,
        cost: cardData.cost,
        cardType: cardData.cardType,
        modifiers: [],
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

export const createNewDuel = ({ game, opponentDeck }: { game: GameState; opponentDeck: Deck }) => {
  const deck = getActiveDeck(game)
  if (deck === undefined) {
    throw Error("Tried to start a new duel but no active deck found")
  }
  const duel: DuelState = {
    id: "duel",
    human: {
      heroId: "hero1",
      health: STARTING_HEALTH,
      deck: createCardsFromNames(deck.cardNames),
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
      energyIncome: {
        neutral: 0,
        fire: 0,
        water: 0,
        earth: 0,
        air: 0,
      },
      drawnDead: false,
      playedEnergyThisTurn: false,
    },
    opponent: {
      heroId: "hero2",
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
      energyIncome: {
        neutral: 0,
        fire: 0,
        water: 0,
        earth: 0,
        air: 0,
      },
      drawnDead: false,
      playedEnergyThisTurn: false,
    },

    currentAnimation: null,
    choice: { id: "CONFIRM_DUEL_START", playerId: "human" },
    playerGoingFirst: "human",
    currentPlayerId: "human",
    turnNumber: 1,

    duelCompleteData: null,
  }
  return duel
}
