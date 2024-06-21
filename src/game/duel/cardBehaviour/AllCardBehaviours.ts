import { CardName } from "../../cards/CardName"
import { DuelState, PlayerID } from "../DuelData"
import { getDuelPlayerById, getOtherPlayerId, getRandomInt, getRowByCardInstanceId } from "../DuelHelpers"
import { dealDamageToPlayer } from "../actions/dealDamage"
import { playerDrawN } from "../actions/playerDrawN"
import { removeCard } from "../actions/removeCard"
import { Target } from "../choices/ChoiceData"
import { getDefaultCreatureTargets } from "../choices/takeTurn/getDefaultCreatureTargets"
import { getDefaultEnergyTargets } from "../choices/takeTurn/getDefaultEnergyTargets"
import { getDefaultSpellTargets } from "../choices/takeTurn/getDefaultSpellTargets"
import { playAnimation } from "../control/playAnimation"
import { CardBehaviour } from "./CardBehaviourData"

export async function fire_energy(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.fire += 1
  player.energy.fire += 1
  duel = removeCard(duel, instanceId)
  return duel
}

export async function water_energy(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.water += 1
  player.energy.water += 1
  duel = removeCard(duel, instanceId)
  return duel
}

export async function earth_energy(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.earth += 1
  player.energy.earth += 1
  duel = removeCard(duel, instanceId)
  return duel
}

export async function air_energy(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.air += 1
  player.energy.air += 1
  duel = removeCard(duel, instanceId)
  return duel
}

export async function ember_foxling_after_attack(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const opponent = getDuelPlayerById(duel, getOtherPlayerId(playerId))

  duel = await playAnimation(duel, { id: "EMBER_FOXLING", durationMs: 600, endLag: true, attackingCardId: instanceId })

  opponent.health -= 1
  return duel
}

export function stegowulf_attack_modifier(
  inputDuel: DuelState,
  playerId: PlayerID,
  instanceId: string,
  attackAmount: number
) {
  const row = getRowByCardInstanceId(inputDuel, instanceId)
  if (row === undefined) {
    throw Error("Stegowulf attack modifier: Couldn't find Stegowulf's row")
  }
  if (row.length === 1) {
    return attackAmount + 2
  }
  return attackAmount
}

export function stegowulf_opponent_attack_modifier(
  inputDuel: DuelState,
  playerId: PlayerID,
  instanceId: string,
  attackAmount: number
) {
  const random100 = getRandomInt(100)
  if (random100 < 20) {
    return "miss"
  }
  return attackAmount
}

export async function eerie_vision_play(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  // TODO scry 3
  duel = playerDrawN(duel, { numberToDraw: 1, playerId })
  duel = dealDamageToPlayer(duel, playerId, 3)
  return duel
}

export async function startle_play(inputDuel: DuelState, playerId: PlayerID, instanceId: string, target: Target) {
  let duel = inputDuel
  // TODO
  return duel
}

export const cardBehaviourMap: Record<CardName, CardBehaviour> = {
  "Fire Energy": {
    getValidTargets: getDefaultEnergyTargets,
    effects: {
      play: fire_energy,
    },
  },
  "Water Energy": {
    getValidTargets: getDefaultEnergyTargets,
    effects: {
      play: water_energy,
    },
  },

  "Earth Energy": {
    getValidTargets: getDefaultEnergyTargets,
    effects: {
      play: earth_energy,
    },
  },

  "Air Energy": {
    getValidTargets: getDefaultEnergyTargets,
    effects: {
      play: air_energy,
    },
  },
  "Golden Friend": {
    getValidTargets: getDefaultCreatureTargets,
  },

  "Snake Network": {
    getValidTargets: getDefaultCreatureTargets,
  },

  "Ember Foxling": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      afterAttack: ember_foxling_after_attack,
    },
  },
  "Winged Bull": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Greenwing Caller": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Elder Saurus": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Vengeful Flamewing": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Sludge Amphibian": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Merfin Yodeler": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Girabu, Colossal Guardian": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Fairy Buckfly": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Nyreth, Light Eater": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Komodo Teacher": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Living Hillside": {
    getValidTargets: getDefaultCreatureTargets,
  },
  Stegowulf: {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      attackModifier: stegowulf_attack_modifier,
      opponentAttackModifier: stegowulf_opponent_attack_modifier,
    },
  },
  "Eerie Vision": {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: eerie_vision_play,
    },
  },
  Startle: {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: startle_play,
    },
  },
  "Sonic Dragon": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      // TODO supportOpponentAttackModifier: sonic_dragon_support_opponent_attack_modifier,
    },
  },
}
