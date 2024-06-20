import { CardData, cardDataMap } from "./Cards"
import { ChoiceID } from "./Choices"
import { DuelParams } from "./DuelController"
import { CardState, DuelState, PlayerState } from "./DuelData"
import { v4 } from "uuid"
import { getActiveDeck } from "./GameData"

export const STARTING_HEALTH = 20

export const createCardsFromNames = (cardNames: string[]): CardState[] => {
  const cards: CardState[] = []
  for (let x = 0; x < cardNames.length; x++) {
    const card = cardDataMap[cardNames[x]]
    cards.push({
      instanceId: v4(),

      name: card.name,
      cost: card.cost,
      cardType: card.cardType,
      attack: card.attack,
      health: card.health,
      initialHealth: card.health,
    })
  }
  return cards
}

export const createNewDuel = ({ game, opponentDeck }: DuelParams) => {
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

    choice: { id: "CONFIRM_DUEL_START", playerId: "human" },
    animationQueue: [],
    playerGoingFirst: "human",
    currentPlayerId: "human",
    turnNumber: 1,
  }
  return duel
}
