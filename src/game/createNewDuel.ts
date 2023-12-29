import { CardData, cardDataMap, goldenFriend, networkOfSnakes } from "./Cards"
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
      attack: card.attack,
      health: card.health,

      cost: card.cost,
      summonSick: false,
      attackedThisTurn: false,
    })
  }
  return cards
}

export const createNewDuel = ({ game, opponentDeckCardNames }: DuelParams) => {
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
      creatureSpaces: [
        { id: v4(), index: 0, occupant: null },
        { id: v4(), index: 1, occupant: null },
        { id: v4(), index: 2, occupant: null },
        { id: v4(), index: 3, occupant: null },
        { id: v4(), index: 4, occupant: null },
        { id: v4(), index: 5, occupant: null },
        { id: v4(), index: 6, occupant: null },
      ],
      energy: {
        neutral: 0,
        fire: 0,
        water: 0,
        earth: 0,
        air: 0,
      },
      incomes: ["fire", "fire", "air"],
      drawnDead: false,
    },
    opponent: {
      heroId: "hero2",
      health: STARTING_HEALTH,
      deck: createCardsFromNames(opponentDeckCardNames),
      hand: [],
      discard: [],
      creatureSpaces: [
        { id: v4(), index: 0, occupant: null },
        { id: v4(), index: 1, occupant: null },
        { id: v4(), index: 2, occupant: null },
        { id: v4(), index: 3, occupant: null },
        { id: v4(), index: 4, occupant: null },
        { id: v4(), index: 5, occupant: null },
        { id: v4(), index: 6, occupant: null },
      ],
      energy: {
        neutral: 0,
        fire: 0,
        water: 0,
        earth: 0,
        air: 0,
      },
      incomes: ["water", "water", "earth"],
      drawnDead: false,
    },

    choice: { id: ChoiceID.CONFIRM_START, playerId: "human" },
    animationQueue: [],
    playerGoingFirst: "human",
    currentPlayerId: "human",
    turnNumber: 1,
    attackedThisTurn: false,

    attackingSpaceIds: [],
    defendersToAttackers: {},
  }
  return duel
}
