import { playerGainEnergy } from "./Actions"
import { CardState, DuelState, EnergyCounts, PlayerID } from "./DuelData"
import { getDuelPlayerById } from "./DuelHelpers"

export type TurnEffect = {
  id: string
  text: string
}

export type HeroData = {
  id: string
  name: string
  imageSrc: string
  turnEffects: Record<string, TurnEffect>
}

export const hero1_turn1 = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, fire: 1 })
  return duel
}

export const hero1_turn3 = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, air: 1 })
  return duel
}

export const hero1_turn5 = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, fire: 1 })
  return duel
}

export const hero1: HeroData = {
  id: "hero1",
  name: "Protagonist Name lol",
  imageSrc: "/card-art/goldenFriend.png",
  turnEffects: {
    1: {
      id: "hero1_turn1",
      text: "Gain 1 {fire}",
    },
    3: {
      id: "hero1_turn3",
      text: "Gain 1 {air}",
    },
    5: {
      id: "hero1_turn5",
      text: "Gain 1 {fire}",
    },
  },
}

export const hero2_turn1 = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, water: 1 })
  return duel
}

export const hero2_turn3 = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, earth: 1 })
  return duel
}

export const hero2_turn5 = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, water: 1 })
  return duel
}

export const hero2: HeroData = {
  id: "hero2",
  name: "Antagonist Name lol",
  imageSrc: "/card-art/goldenFriend.png",
  turnEffects: {
    1: {
      id: "hero2_turn1",
      text: "Gain 1 {water}",
    },
    3: {
      id: "hero2_turn3",
      text: "Gain 1 {earth}",
    },
    5: {
      id: "hero2_turn5",
      text: "Gain 1 {water}",
    },
  },
}

export const effectMap: Record<string, Function> = {
  hero1_turn1,
  hero1_turn3,
  hero1_turn5,
  hero2_turn1,
  hero2_turn3,
  hero2_turn5,
}

export const heroDataMap: Record<string, HeroData> = {
  hero1,
  hero2,
}
