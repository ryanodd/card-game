import { CardState, EnergyCounts } from "./DuelData"

export type EnergyType = "neutral" | "fire" | "water" | "earth" | "air"

export type CardData = {
  number: number
  name: string
  imageSrc: string
  attack: number
  health: number
  text?: string
  cost: EnergyCounts
}

export const goldenFriend: CardData = {
  number: 1,
  name: "Golden Friend",
  imageSrc: "/card-art/goldenFriend.png",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
}

export const networkOfSnakes: CardData = {
  number: 2,
  name: "Network of Snakes",
  imageSrc: "/card-art/networkOfSnakes.png",
  attack: 1,
  health: 4,
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
}

// Whenever this successfully attacks opponent's face, deal 1 damage to the opponent
export const emberFoxling: CardData = {
  number: 3,
  name: "Ember Foxling",
  imageSrc: "/card-art/emberFoxling.png",
  attack: 2,
  health: 1,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
}

export const wingedBull: CardData = {
  number: 4,
  name: "Winged Bull",
  imageSrc: "/card-art/wingedBull.png",
  attack: 3,
  health: 3,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
}

export const greenwingCaller: CardData = {
  number: 5,
  name: "Greenwing Caller",
  imageSrc: "/card-art/greenwingCaller.png",
  attack: 6,
  health: 5,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
}

export const elderSaurus: CardData = {
  number: 6,
  name: "Elder Saurus",
  imageSrc: "/card-art/elderSaurus.png",
  attack: 5,
  health: 5,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
}

export const vengefulFlamewing: CardData = {
  number: 7,
  name: "Vengeful Flamewing",
  imageSrc: "/card-art/vengefulFlamewing.png",
  attack: 4,
  health: 3,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
}

export const sludgeAmphibian: CardData = {
  number: 8,
  name: "Sludge Amphibian",
  imageSrc: "/card-art/sludgeAmphibian.png",
  attack: 2,
  health: 5,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
}

export const cardDataMap: Record<number, CardData> = {
  1: goldenFriend,
  2: networkOfSnakes,
  3: emberFoxling,
  4: wingedBull,
  5: greenwingCaller,
  6: elderSaurus,
  7: vengefulFlamewing,
  8: sludgeAmphibian,
}
