import { getRandomInt, getRandomSeed } from "@/src/utils/randomNumber"
import { dealDamageToCreature, dealDamageToPlayer } from "../../actions/dealDamage"
import { removeCard } from "../../actions/removeCard"
import { BUFFER_MS, playAnimation } from "../../control/playAnimation"
import { DuelState } from "../../DuelData"
import {
  getAllCardsForPlayer,
  getAllCreaturesInPlay,
  getAllCreaturesInPlayForPlayer,
  getCardByInstanceId,
  getDuelPlayerByCardInstanceId,
  getDuelPlayerById,
  getOpposingAttackingCreatureByCardId,
  getOpposingRowByCardId,
  getOtherPlayerId,
  getPlayerIdByCardInstanceId,
  getPlayerRowByCardInstanceId,
  getRandomCreatureInPlay,
  getRandomCreatureInPlayForPlayer,
  getRowIndexByCardInstanceId,
} from "../../DuelHelpers"
import { scryEnd, scryStart } from "../../actions/scry"
import { drawToHand } from "../../actions/drawToHand"
import { burn } from "../../actions/burn"
import { checkForDeaths } from "../../actions/checkForDeaths"
import { CardBehaviour } from "../CardBehaviourData"
import { CardName } from "@/src/game/cards/CardName"
import { getDefaultCreatureTargets } from "../../choices/takeTurn/getDefaultCreatureTargets"
import { getDefaultPlayerRowSpellTargets, getDefaultSpellTargets } from "../../choices/takeTurn/getDefaultSpellTargets"
import { Target } from "../../choices/ChoiceData"
import { stun } from "../../actions/stun"
import { PlayerID } from "../../PlayerData"
import { roll } from "../../actions/roll"
import { restoreHealthToPlayer } from "../../actions/restoreHealth"
import { getConvertedEnergyCost } from "@/src/game/helpers"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"
import { destroyCard } from "../../actions/destroyCard"

export async function fire_energy(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerByCardInstanceId(duel, instanceId)

  player.energy.fire += 1
  duel = await removeCard(duel, instanceId)

  return duel
}

export async function water_energy(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerByCardInstanceId(duel, instanceId)

  player.energy.water += 1
  duel = await removeCard(duel, instanceId)

  return duel
}

export async function earth_energy(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerByCardInstanceId(duel, instanceId)

  player.energy.earth += 1
  duel = await removeCard(duel, instanceId)

  return duel
}

export async function air_energy(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const player = getDuelPlayerByCardInstanceId(duel, instanceId)

  player.energy.air += 1
  duel = await removeCard(duel, instanceId)

  return duel
}

export async function ember_foxling_after_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)

  duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", durationMs: 800, cardId: instanceId })
  duel = await dealDamageToPlayer(duel, getOtherPlayerId(playerId), 1)
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  return duel
}

export async function winged_bull_play(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const row = getPlayerRowByCardInstanceId(inputDuel, instanceId)
  const card = getCardByInstanceId(duel, instanceId)
  if (row === undefined) {
    throw Error("Winged bull play: Couldn't find Winged bull's row")
  }
  if (card.cardType !== "creature") {
    throw Error("Winged bull play: Winged Bull is not a creature!")
  }
  if (row[0].instanceId === instanceId) {
    duel = await playAnimation(duel, { id: "CARD_AIR_ACTION", durationMs: 800, cardId: instanceId })

    card.modifiers.push({ id: "attackChange", quantity: 2 })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}

export function stegowulf_attack_modifier(inputDuel: DuelState, instanceId: string, attackAmount: number) {
  const row = getPlayerRowByCardInstanceId(inputDuel, instanceId)
  if (row === undefined) {
    throw Error("Stegowulf attack modifier: Couldn't find Stegowulf's row")
  }
  if (row.length === 1) {
    return attackAmount + 2
  }
  return attackAmount
}

export function stegowulf_opponent_attack_modifier(inputDuel: DuelState, instanceId: string, attackAmount: number) {
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 20) {
    return "miss"
  }
  return attackAmount
}

export async function eerie_vision_play(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
  duel = await playAnimation(duel, { id: "CARD_AIR_ACTION", durationMs: 800, cardId: instanceId })

  duel = await scryStart(duel, playerId, 3, instanceId)
  return duel
}

export async function eerie_vision_select_cards(inputDuel: DuelState, playerId: PlayerID, selectedCardIds: string[]) {
  let duel = inputDuel
  duel = await scryEnd(duel, playerId, selectedCardIds)

  duel = await drawToHand(duel, playerId, 1)
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  duel = dealDamageToPlayer(duel, playerId, 3)
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

  duel.choice = { id: "TAKE_TURN", playerId: duel.currentPlayerId }

  return duel
}

export async function startle_play(inputDuel: DuelState, instanceId: string, target: Target) {
  let duel = inputDuel
  duel = await playAnimation(duel, { id: "CARD_AIR_ACTION", durationMs: 800, cardId: instanceId })
  // TODO
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  return duel
}

export async function cave_swimmer_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
  // 10% chance to draw
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 10) {
    duel = await playAnimation(duel, { id: "CARD_WATER_ACTION", durationMs: 800, cardId: instanceId })
    duel = await drawToHand(duel, playerId, 1)
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }
  return duel
}

export async function darkwoods_hyena_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  // 50% chance to gain attack
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 50) {
    duel = await playAnimation(duel, { id: "CARD_EARTH_ACTION", durationMs: 800, cardId: instanceId })
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

export async function joltbird_agent_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)

  // Get opposing attacking creature
  const randomOpposingCreature = getRandomCreatureInPlayForPlayer(duel, getOtherPlayerId(playerId))
  if (randomOpposingCreature === undefined) {
    return duel
  }

  // 20% chance to stun
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 20) {
    duel = await playAnimation(duel, {
      id: "CARD_AIR_ACTION",
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

export async function dragon_cub_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
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
    duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", durationMs: 800, cardId: instanceId })
    duel = await burn(duel, opponentOpposingCreature.instanceId)
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}

export async function brash_splasher_after_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)

  duel = await roll(duel, instanceId, 50, async () => {
    duel = await playAnimation(duel, { id: "CARD_WATER_ACTION", durationMs: 800, cardId: instanceId })
    duel = await drawToHand(duel, playerId, 1)
    return duel
  })

  // 50% chance to draw
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 50) {
    duel = await playAnimation(duel, { id: "CARD_WATER_ACTION", durationMs: 800, cardId: instanceId })
    duel = await drawToHand(duel, playerId, 1)
  } else {
    duel = await playAnimation(duel, { id: "ROLL_FAIL", durationMs: 600, cardId: instanceId })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}

export async function support_flame_sentinel(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
  const targetCreature = getRandomCreatureInPlayForPlayer(duel, getOtherPlayerId(playerId))
  if (targetCreature === undefined) {
    return duel
  }
  duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", durationMs: 800, cardId: instanceId })
  duel = await dealDamageToCreature(duel, targetCreature.instanceId, 1)
  duel = await checkForDeaths(duel)
  return duel
}

export async function smoldering_shot_play(inputDuel: DuelState, instanceId: string, target: Target) {
  let duel = inputDuel
  if (target.targetType !== "playerRow") {
    throw Error("Smoldering shot played in non player-row")
  }
  const row = target.playerId === "human" ? duel.human.rows[target.rowIndex] : duel.opponent.rows[target.rowIndex]
  if (row.length > 0) {
    const cardIdToDealDamage = row[0].instanceId
    duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", durationMs: 800, cardId: cardIdToDealDamage })
    duel = await dealDamageToCreature(duel, cardIdToDealDamage, 3)
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }
  return duel
}

export function canyon_burrower_opposing_attack_modifier(
  inputDuel: DuelState,
  instanceId: string,
  attackAmount: number
) {
  // 30% chance to burn
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 30) {
    return "miss"
  }

  return attackAmount
}

export async function ancestral_presence_play(inputDuel: DuelState, instanceId: string, target: Target) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
  const player = getDuelPlayerByCardInstanceId(duel, instanceId)

  duel = await playAnimation(duel, { id: "PLAYER_AIR_ACTION", durationMs: 800, playerId })

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

export async function flame_demon_play(inputDuel: DuelState, instanceId: string, target: Target) {
  let duel = inputDuel
  const opponentCardsInRow = getOpposingRowByCardId(duel, instanceId)

  duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", durationMs: 800, cardId: instanceId })
  if (opponentCardsInRow === undefined) {
    return duel
  }
  for (const opponentCard of opponentCardsInRow) {
    if (opponentCard.cardType === "creature") {
      opponentCard.status = "burn"
    }
    duel = await playAnimation(duel, { id: "BURN", durationMs: BUFFER_MS, cardId: opponentCard.instanceId })
  }

  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

  return duel
}

export async function little_chublet_before_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const opponentCard = getOpposingRowByCardId(duel, instanceId)?.[0]
  if (opponentCard) {
    duel = await roll(duel, instanceId, 10, async () => {
      duel = await stun(duel, opponentCard.instanceId)
      return duel
    })
  }
  return duel
}

export async function blooming_bingus_defeat(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
  duel = await restoreHealthToPlayer(duel, playerId, 1)
  return duel
}

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

export async function clucksworth_before_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  const allCardsInPlay = getAllCreaturesInPlay(duel)

  const qtyMatchingCreatures = allCardsInPlay.filter((card) => {
    return card.name === "Clucksworth"
  }).length

  if (qtyMatchingCreatures > 1) {
    let card = getCardByInstanceId(duel, instanceId)
    if (card.cardType !== "creature") {
      throw Error("Expected Clucksworth to be a creature.")
    }
    card.modifiers.push({ id: "attackChange", quantity: 1 })
    duel = await playAnimation(duel, { id: "CARD_AIR_ACTION", cardId: instanceId, durationMs: 500 })
  }

  return duel
}

export async function shark_before_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  let opponentCard = getOpposingAttackingCreatureByCardId(duel, instanceId)
  if (opponentCard && getConvertedEnergyCost(cardDataMap[opponentCard.name]) <= 2) {
    duel = await playAnimation(duel, { id: "CARD_WATER_ACTION", cardId: instanceId, durationMs: 500 })
    duel = await destroyCard(duel, opponentCard.instanceId)
  }
  return duel
}

export async function cataclysm_play(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  const opposingPlayerId = getOtherPlayerId(getPlayerIdByCardInstanceId(duel, instanceId))

  const randomMonsterToBurn = getRandomCreatureInPlayForPlayer(duel, opposingPlayerId)
  if (randomMonsterToBurn !== undefined) {
    burn(duel, randomMonsterToBurn.instanceId)
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: 500 })
  }

  for (let x = 0; x < 8; x++) {
    const randomMonster = getRandomCreatureInPlayForPlayer(duel, opposingPlayerId)
    if (randomMonster !== undefined) {
      dealDamageToCreature(duel, randomMonster.instanceId, 1)
      duel = await playAnimation(duel, { id: "PAUSE", durationMs: 500 })
    }
  }

  return duel
}

export const cardBehaviourMap: Record<CardName, CardBehaviour> = {
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
    effects: {
      opposingAttackModifier: canyon_burrower_opposing_attack_modifier,
    },
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
  "Zardian Raider": { getValidTargets: getDefaultCreatureTargets },
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
  "Moltsteed Racer": { getValidTargets: getDefaultCreatureTargets },
  "Volcanic Shellster": { getValidTargets: getDefaultCreatureTargets },

  "Blooming Bingus": { getValidTargets: getDefaultCreatureTargets, effects: { defeat: blooming_bingus_defeat } },
  "Spade Manta": { getValidTargets: getDefaultCreatureTargets },
  Plasmite: { getValidTargets: getDefaultCreatureTargets },
  "Sky Dino": { getValidTargets: getDefaultCreatureTargets },
  "Little Imp Guy": { getValidTargets: getDefaultCreatureTargets },
  Clucksworth: { getValidTargets: getDefaultCreatureTargets, effects: { beforeAttack: clucksworth_before_attack } },
  "Little Chublet": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      beforeAttack: little_chublet_before_attack,
    },
  },
  "Sun King Salamander": { getValidTargets: getDefaultCreatureTargets },
  "Hulking Menace": { getValidTargets: getDefaultCreatureTargets },
  Treegre: { getValidTargets: getDefaultCreatureTargets },
  "Celestial Riftkeeper": { getValidTargets: getDefaultCreatureTargets },
  "Spewing Cavern": { getValidTargets: getDefaultCreatureTargets },
  "Cleansing Storm": { getValidTargets: getDefaultSpellTargets },

  "Cloud Pegasus": { getValidTargets: getDefaultCreatureTargets },
  Scrungy: { getValidTargets: getDefaultCreatureTargets },
  "Inferno Demon": { getValidTargets: getDefaultCreatureTargets },
  Narples: { getValidTargets: getDefaultCreatureTargets },
  "Desert Crawler": { getValidTargets: getDefaultCreatureTargets },
  Lion: { getValidTargets: getDefaultCreatureTargets },
  "Bouldering Brawler": { getValidTargets: getDefaultCreatureTargets },

  "Grassland Scout": { getValidTargets: getDefaultCreatureTargets },
  "Fire Blob": { getValidTargets: getDefaultCreatureTargets },
  Pmochi: { getValidTargets: getDefaultCreatureTargets },
  Stegobobo: { getValidTargets: getDefaultCreatureTargets },
  Shark: { getValidTargets: getDefaultCreatureTargets },
  "Manta Sprite": { getValidTargets: getDefaultCreatureTargets },
  "Sol Guardian": { getValidTargets: getDefaultCreatureTargets },
  Crab: { getValidTargets: getDefaultCreatureTargets },
  "Venus Fang": { getValidTargets: getDefaultCreatureTargets },
  "Ethereal Nightmother": { getValidTargets: getDefaultCreatureTargets },
  "Feathered Scrapper": { getValidTargets: getDefaultCreatureTargets },
  "Diabolical Cultist": { getValidTargets: getDefaultCreatureTargets },
  "Bad Chicken": { getValidTargets: getDefaultCreatureTargets },
  Snail: { getValidTargets: getDefaultCreatureTargets },
  Bubblebloop: { getValidTargets: getDefaultCreatureTargets },
  "Phoenix Dasher": { getValidTargets: getDefaultCreatureTargets },
  Plewb: { getValidTargets: getDefaultCreatureTargets },
  Wolf: { getValidTargets: getDefaultCreatureTargets },
  "Flame Demon": { getValidTargets: getDefaultCreatureTargets, effects: { play: flame_demon_play } },
  "Owldus The Arcane": { getValidTargets: getDefaultCreatureTargets },
  "Mega Demigod": { getValidTargets: getDefaultCreatureTargets },
  "Molten Loaf": { getValidTargets: getDefaultCreatureTargets },
  "Eruption of Boulders": {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: eruption_of_boulders_play,
    },
  },
  Cataclysm: {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: cataclysm_play,
    },
  },
}
