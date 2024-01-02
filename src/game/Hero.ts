import { playerGainEnergy } from "./Actions"
import { EnergyType } from "./Cards"
import { DuelState, PlayerID } from "./DuelData"

export type HeroData = {
  id: string
  name: string
  imageSrc: string
}

export const gainFire = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, fire: 1 })
  return duel
}

export const gainAir = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, air: 1 })
  return duel
}

export const gainWater = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, water: 1 })
  return duel
}

export const gainEarth = (duel: DuelState, playerId: PlayerID) => {
  duel = playerGainEnergy(duel, { playerId, earth: 1 })
  return duel
}

export type HeroUiIconType = EnergyType | "effect"

export const hero1: HeroData = {
  id: "hero1",
  name: "Protagonist Name lol",
  imageSrc: "/card-art/goldenFriend.png",
}

export const hero2: HeroData = {
  id: "hero2",
  name: "Antagonist Name lol",
  imageSrc: "/card-art/goldenFriend.png",
}

export const effectMap: Record<string, Function> = {
  gainFire,
  gainAir,
  gainWater,
  gainEarth,
}

export const heroDataMap: Record<string, HeroData> = {
  hero1,
  hero2,
}
