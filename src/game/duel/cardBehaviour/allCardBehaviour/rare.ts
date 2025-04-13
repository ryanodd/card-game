import { getRandomInt, getRandomSeed } from "@/src/utils/randomNumber"
import { dealDamageToCreature } from "../../actions/dealDamage"
import { getDefaultCreatureTargets } from "../../choices/takeTurn/getDefaultCreatureTargets"
import { BUFFER_MS, playAnimation } from "../../control/playAnimation"
import { DuelState } from "../../DuelData"
import {
  getAllCreaturesInPlay,
  getCardByInstanceId,
  getDuelPlayerByCardInstanceId,
  getDuelPlayerById,
  getOpposingAttackingCreatureByCardId,
  getOpposingRowByCardId,
  getOtherPlayerByPlayerId,
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
import { scryEnd, scryStart } from "../../actions/scry"
import { PlayerID } from "../../PlayerData"
import { Target } from "../../choices/ChoiceData"
import { drawToHand } from "../../actions/drawToHand"
import { checkForDeaths } from "../../actions/checkForDeaths"

export async function ember_foxling_after_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)

  duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", durationMs: 800, cardId: instanceId })
  const randomOpponentCreature = getRandomCreatureInPlayForPlayer(duel, getOtherPlayerId(playerId))
  if (randomOpponentCreature !== undefined) {
    duel = await dealDamageToCreature(duel, randomOpponentCreature.instanceId, 1)
  }
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  return duel
}

export async function jebubblesaur_before_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const targetCreature = getOpposingAttackingCreatureByCardId(duel, instanceId)
  if (targetCreature === undefined || targetCreature.cardType !== "creature") {
    return duel
  }
  duel = await roll(duel, instanceId, 50, async () => {
    duel = await playAnimation(duel, { id: "CARD_WATER_ACTION", durationMs: 600, cardId: targetCreature.instanceId })
    targetCreature.modifiers.push({ id: "attackChange", quantity: -1 })
    return duel
  })

  return duel
}

export async function startle_play(inputDuel: DuelState, instanceId: string, target: Target) {
  let duel = inputDuel
  duel = await playAnimation(duel, { id: "CARD_AIR_ACTION", durationMs: 800, cardId: instanceId })
  // TODO
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  return duel
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

export function phoenix_dasher_defense_modifier(inputDuel: DuelState, instanceId: string, attackAmount: number) {
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 20) {
    return "miss"
  }
  return attackAmount
}

export async function phoenix_dasher_defeat(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
  const randomEnemyCreature = getRandomCreatureInPlayForPlayer(duel, getOtherPlayerId(playerId))
  if (randomEnemyCreature === undefined) {
    return duel
  }
  duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", durationMs: 800, cardId: instanceId })
  duel = await burn(duel, randomEnemyCreature.instanceId)
  duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })

  return duel
}

export const rareCardBehaviourMap = {
  "Flame Sentinel": { getValidTargets: getDefaultCreatureTargets, effects: { support: support_flame_sentinel } },
  "Ember Foxling": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      afterAttack: ember_foxling_after_attack,
    },
  },
  "Diabolical Cultist": { getValidTargets: getDefaultCreatureTargets },
  Jebubblesaur: { getValidTargets: getDefaultCreatureTargets, effects: { beforeAttack: jebubblesaur_before_attack } },
  Treegre: { getValidTargets: getDefaultCreatureTargets },
  "Venus Fang": { getValidTargets: getDefaultCreatureTargets },
  Startle: {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: startle_play,
    },
  },
  "Ancestral Presence": {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: ancestral_presence_play,
    },
  },

  "Neojia Tamer": { getValidTargets: getDefaultCreatureTargets },
  "Opaldrake Thrasher": { getValidTargets: getDefaultCreatureTargets },
  "Pike Lancer": { getValidTargets: getDefaultCreatureTargets },
  "Violet Sagebeast": { getValidTargets: getDefaultCreatureTargets },

  "Fire Blob": { getValidTargets: getDefaultCreatureTargets },
  Pmochi: { getValidTargets: getDefaultCreatureTargets },

  "Phoenix Dasher": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      defenseModifier: phoenix_dasher_defense_modifier,
      defeat: phoenix_dasher_defeat,
    },
  },
}
