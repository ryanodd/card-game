import { getRandomInt, getRandomSeed } from "@/src/utils/randomNumber"
import { dealDamageToCreature } from "../../actions/dealDamage"
import { getDefaultCreatureTargets } from "../../choices/takeTurn/getDefaultCreatureTargets"
import { BUFFER_MS, playAnimation } from "../../control/playAnimation"
import { DuelState } from "../../DuelData"
import {
  getAllCreaturesInPlay,
  getCardByInstanceId,
  getDuelPlayerById,
  getOpposingAttackingCreatureByCardId,
  getOpposingRowByCardId,
  getOtherPlayerId,
  getPlayerByCardInstanceId,
  getPlayerIdByCardInstanceId,
  getPlayerRowByCardInstanceId,
  getRandomCreatureInPlayForPlayer,
} from "../../DuelHelpers"
import { burn } from "../../actions/burn"
import { restoreHealthToCreature } from "../../actions/restoreHealth"
import { roll } from "../../actions/roll"
import { stun } from "../../actions/stun"
import { getDefaultSpellTargets } from "../../choices/takeTurn/getDefaultSpellTargets"
import { drawToHand } from "../../actions/drawToHand"

export async function eruption_of_boulders_play(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  const opposingPlayerId = getOtherPlayerId(getPlayerIdByCardInstanceId(duel, instanceId))
  for (let x = 0; x < 5; x++) {
    const randomMonster = getRandomCreatureInPlayForPlayer(duel, opposingPlayerId)
    if (randomMonster !== undefined) {
      dealDamageToCreature(duel, randomMonster.instanceId, 1)
      duel = await playAnimation(duel, { id: "PAUSE", durationMs: 500 })
    }
  }

  return duel
}

export async function brash_splasher_after_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)

  // 50% chance to draw
  duel = await roll(duel, instanceId, 50, async () => {
    duel = await playAnimation(duel, { id: "CARD_WATER_ACTION", durationMs: 800, cardId: instanceId })
    duel = await drawToHand(duel, playerId, 1)
    return duel
  })

  return duel
}

export async function cave_swimmer_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)

  // 10% chance to draw
  duel = await roll(duel, instanceId, 10, async () => {
    duel = await playAnimation(duel, { id: "CARD_WATER_ACTION", durationMs: 800, cardId: instanceId })
    duel = await drawToHand(duel, playerId, 1)
    return duel
  })
  return duel
}

icy_herder_before_attack

export async function icy_herder_before_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  const monsterBehind = getPlayerRowByCardInstanceId(duel, instanceId)?.[1]
  if (monsterBehind === undefined || monsterBehind.cardType !== "creature") {
    return duel
  }

  duel = await playAnimation(duel, { id: "CARD_EARTH_ACTION", durationMs: 800, cardId: instanceId })
  monsterBehind.modifiers.push({ id: "healthChange", quantity: 1 })

  return duel
}

export async function gnarldebeast_hyena_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  // 50% chance to gain attack
  duel = await roll(duel, instanceId, 10, async () => {
    duel = await playAnimation(duel, { id: "CARD_EARTH_ACTION", durationMs: 800, cardId: instanceId })
    const card = getCardByInstanceId(duel, instanceId)
    if (card.cardType === "creature") {
      card.modifiers.push({ id: "attackChange", quantity: 1 })
    }
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
    return duel
  })
  return duel
}

export function bloodthirsty_bear_attack_modifier(inputDuel: DuelState, instanceId: string, attackAmount: number) {
  let duel = inputDuel
  const card = getCardByInstanceId(duel, instanceId)
  if (card.cardType !== "creature") {
    throw Error("Bloodthirsty bear is not a creature")
  }
  if (card.damage > 0) {
    return attackAmount + 2
  }
  return attackAmount
}

export function feathered_scrapper_defense_modifier(inputDuel: DuelState, instanceId: string, attackAmount: number) {
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 20) {
    return "miss"
  }

  return attackAmount
}

export async function spirit_woomlet_defeat(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)

  duel = await drawToHand(duel, playerId, 1)
  return duel
}

export const uncommonCardBehaviourMap = {
  "Sun King Salamander": { getValidTargets: getDefaultCreatureTargets },
  "Volcanic Shellster": { getValidTargets: getDefaultCreatureTargets },
  "Eruption of Boulders": {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: eruption_of_boulders_play,
    },
  },
  "Spewing Cavern": { getValidTargets: getDefaultCreatureTargets },
  "Brash Splasher": {
    getValidTargets: getDefaultCreatureTargets,
    effects: { afterAttack: brash_splasher_after_attack },
  },
  "Cave Swimmer": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      support: cave_swimmer_support,
    },
  },
  "Merfin Yodeler": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Icy Herder": {
    getValidTargets: getDefaultCreatureTargets,
    effects: { afterAttack: icy_herder_before_attack },
  },
  "Bed of Snakes": {
    getValidTargets: getDefaultCreatureTargets,
  },
  Gnarldebeast: {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      support: gnarldebeast_hyena_support,
    },
  },
  "Bloodthirsty Bear": {
    getValidTargets: getDefaultCreatureTargets,
    attackModifier: {
      attackModifier: bloodthirsty_bear_attack_modifier,
    },
  },
  "Living Hillside": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Dazzling Fennec": { getValidTargets: getDefaultCreatureTargets },
  "Feathered Scrapper": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      defenseModifier: feathered_scrapper_defense_modifier,
    },
  },

  "Sky Dino": { getValidTargets: getDefaultCreatureTargets },
  "Sonic Dragon": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      // TODO supportOpponentAttackModifier: sonic_dragon_support_opponent_attack_modifier,
    },
  },
  "Spirit Woomlet": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      defeat: spirit_woomlet_defeat,
    },
  },
}
