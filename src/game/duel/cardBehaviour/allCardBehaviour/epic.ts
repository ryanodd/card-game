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

export async function joltbird_agent_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)

  // Get opposing attacking creature
  const randomOpposingCreature = getRandomCreatureInPlayForPlayer(duel, getOtherPlayerId(playerId))
  if (randomOpposingCreature === undefined) {
    return duel
  }

  // 20% chance to stun
  duel = await roll(duel, instanceId, 20, async () => {
    duel = await playAnimation(duel, {
      id: "CARD_AIR_ACTION",
      durationMs: 800,
      cardId: randomOpposingCreature.instanceId,
    })
    duel = await stun(duel, randomOpposingCreature.instanceId)
    return duel
  })

  return duel
}

export const epicCardBehaviourMap = {
  Cataclysm: {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: cataclysm_play,
    },
  },
  "Flame Demon": { getValidTargets: getDefaultCreatureTargets, effects: { play: flame_demon_play } },
  "Komodo Teacher": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Something Captain": { getValidTargets: getDefaultCreatureTargets },
  "Helix Stag": { getValidTargets: getDefaultCreatureTargets },
  Stegowulf: {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      attackModifier: stegowulf_attack_modifier,
    },
  },
  "Joltbird Agent": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      support: joltbird_agent_support,
    },
  },
  Plasmite: { getValidTargets: getDefaultCreatureTargets },
  "Ethereal Nightmother": { getValidTargets: getDefaultCreatureTargets },
  "Time Collapse": { getValidTargets: getDefaultSpellTargets },
  "Manta Sprite": { getValidTargets: getDefaultCreatureTargets },
  "Astral Caller": { getValidTargets: getDefaultCreatureTargets },
  "Cowl Panther": {
    getValidTargets: getDefaultCreatureTargets,
  },
}
