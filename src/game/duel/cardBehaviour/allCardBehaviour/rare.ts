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

export async function eerie_vision_play(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const playerId = getPlayerIdByCardInstanceId(duel, instanceId)
  duel = await playAnimation(duel, { id: "CARD_AIR_ACTION", durationMs: 800, cardId: instanceId })

  duel = await scryStart(duel, playerId, 2, instanceId)
  return duel
}

export async function eerie_vision_select_cards(inputDuel: DuelState, playerId: PlayerID, selectedCardIds: string[]) {
  let duel = inputDuel
  duel = await scryEnd(duel, playerId, selectedCardIds)

  duel = await drawToHand(duel, playerId, 2)
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

export const rareCardBehaviourMap = {
  "Ember Foxling": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      afterAttack: ember_foxling_after_attack,
    },
  },
  "Diabolical Cultist": { getValidTargets: getDefaultCreatureTargets },
  "Vengeful Flamewing": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Fairy Buckfly": {
    getValidTargets: getDefaultCreatureTargets,
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
  "Ancestral Presence": {
    getValidTargets: getDefaultSpellTargets,
    effects: {
      play: ancestral_presence_play,
    },
  },
  "Flame Sentinel": { getValidTargets: getDefaultCreatureTargets, effects: { support: support_flame_sentinel } },
  "Neojia Tamer": { getValidTargets: getDefaultCreatureTargets },
  "Opaldrake Thrasher": { getValidTargets: getDefaultCreatureTargets },
  "Sicklehorn Grazer": { getValidTargets: getDefaultCreatureTargets },
  "Pike Lancer": { getValidTargets: getDefaultCreatureTargets },
  "Violet Sagebeast": { getValidTargets: getDefaultCreatureTargets },
  Treegre: { getValidTargets: getDefaultCreatureTargets },
  "Fire Blob": { getValidTargets: getDefaultCreatureTargets },
  Pmochi: { getValidTargets: getDefaultCreatureTargets },
  "Venus Fang": { getValidTargets: getDefaultCreatureTargets },
  "Phoenix Dasher": { getValidTargets: getDefaultCreatureTargets },
}
