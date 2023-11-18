import { CardData, cardDataMap, goldenFriend, networkOfSnakes } from "./Cards"
import { ChoiceID } from "./Choices"
import { DuelParams } from "./DuelController"
import { CardState, DuelState, PlayerState } from "./DuelData"
import { v4 } from "uuid"

export const STARTING_HEALTH = 20

export const createCardsFromNos = (cardNos: number[]): CardState[] => {
  const cards: CardState[] = []
  for (let x = 0; x < cardNos.length; x++) {
    const card = cardDataMap[cardNos[x]]
    cards.push({
      id: v4(),
      number: card.number,
      attack: card.attack,
      health: card.health,

      cost: card.cost,
      summonSick: false,
      attackedThisTurn: false,
    })
  }
  return cards
}

export const createNewDuel = ({ game, opponentDeckCardNos }: DuelParams) => {
  const duel: DuelState = {
    human: {
      heroId: "hero1",
      health: STARTING_HEALTH,
      deck: createCardsFromNos(game.decks[game.activeDeckIndex].cardNumbers),
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
      deck: createCardsFromNos(opponentDeckCardNos),
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
