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
} from "../../DuelHelpers"
import { burn } from "../../actions/burn"
import { restoreHealthToCreature } from "../../actions/restoreHealth"
import { roll } from "../../actions/roll"
import { stun } from "../../actions/stun"

export async function little_imp_guy_before_attack(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  let opponentCard = getOpposingAttackingCreatureByCardId(duel, instanceId)
  if (opponentCard) {
    duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", cardId: instanceId, durationMs: 500 })
    duel = await dealDamageToCreature(duel, opponentCard.instanceId, 1)
  }

  return duel
}

export async function dragon_cub_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel

  //Get opposing attacking creature
  const opponentOpposingCreature = getOpposingAttackingCreatureByCardId(duel, instanceId)
  console.log(opponentOpposingCreature)
  if (opponentOpposingCreature === undefined) {
    return duel
  }

  // 30% chance to burn
  duel = await roll(duel, instanceId, 30, async () => {
    duel = await playAnimation(duel, { id: "CARD_FIRE_ACTION", durationMs: 800, cardId: instanceId })
    duel = await burn(duel, opponentOpposingCreature.instanceId)
    return duel
  })

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
  const player = getPlayerByCardInstanceId(duel, instanceId)
  const rowIndex = player.row.findIndex((card) => {
    return card.instanceId === instanceId
  })
  const cardBehind = player.row[rowIndex + 1]
  if (cardBehind !== undefined) {
    duel = await restoreHealthToCreature(duel, cardBehind.instanceId, 1)
  }
  return duel
}

export const baseCardBehaviourMap = {
  "Little Imp Guy": {
    getValidTargets: getDefaultCreatureTargets,
    effects: { beforeAttack: little_imp_guy_before_attack },
  },
  "Dragon Cub": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      support: dragon_cub_support,
    },
  },
  Clucksworth: { getValidTargets: getDefaultCreatureTargets, effects: { beforeAttack: clucksworth_before_attack } },
  "Little Chublet": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      beforeAttack: little_chublet_before_attack,
    },
  },
  Crab: { getValidTargets: getDefaultCreatureTargets },
  "Blooming Bingus": { getValidTargets: getDefaultCreatureTargets, effects: { defeat: blooming_bingus_defeat } },
  Stegobobo: { getValidTargets: getDefaultCreatureTargets },
  "Cloud Pegasus": { getValidTargets: getDefaultCreatureTargets },
  Plewb: { getValidTargets: getDefaultCreatureTargets },
  Wolf: { getValidTargets: getDefaultCreatureTargets },
  Lion: { getValidTargets: getDefaultCreatureTargets },
  "Elder Saurus": {
    getValidTargets: getDefaultCreatureTargets,
  },
}
