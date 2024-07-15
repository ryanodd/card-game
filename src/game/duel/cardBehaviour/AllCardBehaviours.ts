import { getRandomInt, getRandomSeed } from "@/src/utils/randomNumber"
import { CardName } from "../../cards/CardName"
import { DuelState } from "../DuelData"
import {
  getCardByInstanceId,
  getDuelPlayerById,
  getOpposingAttackingCreatureByCardId,
  getOtherPlayerId,
  getPlayerRowByCardInstanceId,
  getRandomCreatureInPlayForPlayer,
  getRowIndexByCardInstanceId,
} from "../DuelHelpers"
import { PlayerID } from "../PlayerData"
import { dealDamageToCreature, dealDamageToPlayer } from "../actions/dealDamage"
import { drawToHand } from "../actions/drawToHand"
import { removeCard } from "../actions/removeCard"
import { Target } from "../choices/ChoiceData"
import { getDefaultCreatureTargets } from "../choices/takeTurn/getDefaultCreatureTargets"
import { getDefaultEnergyTargets } from "../choices/takeTurn/getDefaultEnergyTargets"
import { getDefaultPlayerRowSpellTargets, getDefaultSpellTargets } from "../choices/takeTurn/getDefaultSpellTargets"
import { BUFFER_MS, playAnimation } from "../control/playAnimation"
import { CardBehaviour } from "./CardBehaviourData"
import { burn } from "../actions/burn"
import { stun } from "../actions/stun"
import { checkForDeaths } from "../actions/checkForDeaths"
import { scryEnd, scryStart } from "../actions/scry"

export async function fire_energy(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.fire += 1
  player.energy.fire += 1
  duel = await removeCard(duel, instanceId)

  return duel
}

export async function water_energy(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)

  player.energyIncome.water += 1
  player.energy.water += 1
  duel = await removeCard(duel, instanceId)

  return duel
}

export async function earth_energy(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.earth += 1
  player.energy.earth += 1
  duel = await removeCard(duel, instanceId)

  return duel
}

export async function air_energy(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)
  player.energyIncome.air += 1
  player.energy.air += 1
  duel = await removeCard(duel, instanceId)

  return duel
}

export async function ember_foxling_after_attack(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const opponent = getDuelPlayerById(duel, getOtherPlayerId(playerId))

  duel = await playAnimation(duel, { id: "EMBER_FOXLING", durationMs: 800, attackingCardId: instanceId })
  duel = await dealDamageToPlayer(duel, getOtherPlayerId(playerId), 1)
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  return duel
}

export async function winged_bull_play(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const row = getPlayerRowByCardInstanceId(inputDuel, instanceId)
  if (row === undefined) {
    throw Error("Winged bull play: Couldn't find Winged bull's row")
  }
  if (row[0].instanceId === instanceId) {
    duel = await playAnimation(duel, { id: "WINGED_BULL", durationMs: 800, cardId: instanceId })
    const card = getCardByInstanceId(duel, instanceId)
    card.modifiers.push({ id: "attackChange", quantity: 2 })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}

export function stegowulf_attack_modifier(
  inputDuel: DuelState,
  playerId: PlayerID,
  instanceId: string,
  attackAmount: number
) {
  const row = getPlayerRowByCardInstanceId(inputDuel, instanceId)
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
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 20) {
    return "miss"
  }
  return attackAmount
}

export async function eerie_vision_play(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel

  duel = await playAnimation(duel, { id: "EERIE_VISION", durationMs: 800, cardId: instanceId })

  duel = await scryStart(duel, playerId, 3, instanceId)
  return duel
}

export async function eerie_vision_select_cards(
  inputDuel: DuelState,
  playerId: PlayerID,
  instanceId: string,
  selectedCardIds: string[]
) {
  let duel = inputDuel

  duel = await scryEnd(duel, playerId, selectedCardIds)

  duel = await drawToHand(duel, playerId, 1)
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  duel = dealDamageToPlayer(duel, playerId, 3)
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

  duel.choice = { id: "TAKE_TURN", playerId: duel.currentPlayerId }

  return duel
}

export async function startle_play(inputDuel: DuelState, playerId: PlayerID, instanceId: string, target: Target) {
  let duel = inputDuel
  duel = await playAnimation(duel, { id: "STARTLE", durationMs: 800, cardId: instanceId })
  // TODO
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  return duel
}

export async function cave_swimmer_support(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel

  // 10% chance to draw
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 10) {
    duel = await playAnimation(duel, { id: "CAVE_SWIMMER", durationMs: 800, cardId: instanceId })
    duel = await drawToHand(duel, playerId, 1)
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }
  return duel
}

export async function darkwoods_hyena_support(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel

  // 50% chance to gain attack
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 50) {
    duel = await playAnimation(duel, { id: "DARKWOODS_HYENA", durationMs: 800, cardId: instanceId })
    const card = getCardByInstanceId(duel, instanceId)
    if (card.cardType === "creature") {
      card.modifiers.push({ id: "attackChange", quantity: 1 })
    }
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }
  return duel
}

export async function joltbird_agent_support(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel

  // Get opposing attacking creature
  const randomOpposingCreature = getRandomCreatureInPlayForPlayer(duel, getOtherPlayerId(playerId))
  if (randomOpposingCreature === undefined) {
    return duel
  }

  // 20% chance to stun
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 20) {
    duel = await playAnimation(duel, {
      id: "JOLTBIRD_AGENT",
      durationMs: 800,
      cardId: randomOpposingCreature.instanceId,
    })
    duel = await stun(duel, randomOpposingCreature.instanceId)
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}

export async function dragon_cub_support(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const rowIndex = getRowIndexByCardInstanceId(duel, instanceId)
  if (rowIndex === undefined) {
    throw Error("Dragon cub isn't in a row!'")
  }

  //Get opposing attacking creature
  const opponentOpposingCreature = getDuelPlayerById(duel, getOtherPlayerId(playerId)).rows[rowIndex][0]
  if (opponentOpposingCreature === undefined) {
    return duel
  }

  // 30% chance to burn
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 30) {
    duel = await playAnimation(duel, { id: "DRAGON_CUB", durationMs: 800, cardId: instanceId })
    duel = await burn(duel, opponentOpposingCreature.instanceId)
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}

export async function brash_splasher_after_attack(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel

  // 50% chance to draw
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 50) {
    duel = await playAnimation(duel, { id: "BRASH_SPLASHER", durationMs: 800, cardId: instanceId })
    duel = await drawToHand(duel, playerId, 1)
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}

export async function support_flame_sentinel(inputDuel: DuelState, playerId: PlayerID, instanceId: string) {
  let duel = inputDuel
  const targetCreature = getRandomCreatureInPlayForPlayer(duel, getOtherPlayerId(playerId))
  if (targetCreature === undefined) {
    return duel
  }
  duel = await playAnimation(duel, { id: "FLAME_SENTINEL", durationMs: 800, cardId: instanceId })
  duel = await dealDamageToCreature(duel, targetCreature.instanceId, 1)
  duel = await checkForDeaths(duel)
  return duel
}

export async function smoldering_shot_play(
  inputDuel: DuelState,
  playerId: PlayerID,
  instanceId: string,
  target: Target
) {
  let duel = inputDuel
  if (target.targetType !== "playerRow") {
    throw Error("Smoldering shot played in non player-row")
  }
  const row = target.playerId === "human" ? duel.human.rows[target.rowIndex] : duel.opponent.rows[target.rowIndex]
  if (row.length > 0) {
    const cardIdToDealDamage = row[0].instanceId
    duel = await playAnimation(duel, { id: "SMOLDERING_SHOT", durationMs: 800, cardId: cardIdToDealDamage })
    duel = await dealDamageToCreature(duel, cardIdToDealDamage, 3)
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }
  return duel
}

export async function ancestral_presence_play(
  inputDuel: DuelState,
  playerId: PlayerID,
  instanceId: string,
  target: Target
) {
  let duel = inputDuel
  const player = getDuelPlayerById(duel, playerId)

  duel = await playAnimation(duel, { id: "ANCESTRAL_PRESENCE", durationMs: 800, playerId })

  // Select cards
  const cardsToAddToHand = []
  if (player.discard.length > 0) {
    const [chosenCard] = player.discard.splice(getRandomInt(player.discard.length, getRandomSeed()), 1)
    cardsToAddToHand.push(chosenCard)
  }
  if (player.discard.length > 0) {
    const [chosenCard] = player.discard.splice(getRandomInt(player.discard.length, getRandomSeed()), 1)
    cardsToAddToHand.push(chosenCard)
  }

  // Add to hand
  for (let x = 0; x < cardsToAddToHand.length; x++) {
    const cardToAdd = cardsToAddToHand[x]
    player.hand.push(cardToAdd)
  }

  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

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

  "Bed of Snakes": {
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
    effects: {
      play: winged_bull_play,
    },
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
  "Spirit Giant": {
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
    },
  },
  "Eerie Vision": {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: eerie_vision_play,
      selectCards: eerie_vision_select_cards,
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
  "Cave Swimmer": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      support: cave_swimmer_support,
    },
  },
  "Darkwoods Hyena": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      support: darkwoods_hyena_support,
    },
  },
  "Monstrous Flamebeast": {
    getValidTargets: getDefaultCreatureTargets,
    keywords: {
      trample: true,
    },
  },
  "Ancestral Presence": {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: ancestral_presence_play,
    },
  },
  "Canyon Burrower": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Dragon Cub": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      support: dragon_cub_support,
    },
  },
  "Glikki Forager": { getValidTargets: getDefaultCreatureTargets },
  "Hydrus, Seaborn Titan": { getValidTargets: getDefaultCreatureTargets },
  "Flame Sentinel": { getValidTargets: getDefaultCreatureTargets, effects: { support: support_flame_sentinel } },
  "Brash Splasher": {
    getValidTargets: getDefaultCreatureTargets,
    effects: { afterAttack: brash_splasher_after_attack },
  },
  "Joltbird Agent": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      support: joltbird_agent_support,
    },
  },
  "Something Bandit": { getValidTargets: getDefaultCreatureTargets },
  "Something Raider": { getValidTargets: getDefaultCreatureTargets },
  "Something Captain": { getValidTargets: getDefaultCreatureTargets },
  "Ilstrom, Tidal Inferno": { getValidTargets: getDefaultCreatureTargets },
  "Helix Stag": { getValidTargets: getDefaultCreatureTargets },
  "Bonehide Mole": { getValidTargets: getDefaultCreatureTargets },
  "Neojia Tamer": { getValidTargets: getDefaultCreatureTargets },
  Huddolin: { getValidTargets: getDefaultCreatureTargets },
  "Opaldrake Thrasher": { getValidTargets: getDefaultCreatureTargets },
  "Smoldering Shot": {
    getValidTargets: getDefaultPlayerRowSpellTargets,
    effects: {
      play: smoldering_shot_play,
    },
  },
  "Saurongar The Smotherer": { getValidTargets: getDefaultCreatureTargets },
  "Time Collapse": { getValidTargets: getDefaultSpellTargets },
  "Fairy Arsonist": { getValidTargets: getDefaultCreatureTargets },
  "Emerald Makasaur": { getValidTargets: getDefaultCreatureTargets },
  "Dazzling Fennec": { getValidTargets: getDefaultCreatureTargets },
  "Astral Caller": { getValidTargets: getDefaultCreatureTargets },
  "Red Crab Brawler": { getValidTargets: getDefaultCreatureTargets },
  "Sicklehorn Grazer": { getValidTargets: getDefaultCreatureTargets },
  "Pike Lancer": { getValidTargets: getDefaultCreatureTargets },
  Hyllophant: { getValidTargets: getDefaultCreatureTargets },
  "Violet Sagebeast": { getValidTargets: getDefaultCreatureTargets },
}
