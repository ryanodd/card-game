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
} from "../../DuelHelpers"
import { burn } from "../../actions/burn"
import { restoreHealthToCreature } from "../../actions/restoreHealth"
import { roll } from "../../actions/roll"
import { stun } from "../../actions/stun"
import { getDefaultSpellTargets } from "../../choices/takeTurn/getDefaultSpellTargets"
import { getConvertedEnergyCost } from "@/src/game/helpers"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"
import { destroyCard } from "../../actions/destroyCard"

export async function duskwood_ostrich_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  duel = await roll(duel, instanceId, 25, async () => {
    const card = getCardByInstanceId(duel, instanceId)
    if (card.cardType !== "creature") {
      throw Error("Duskwood ostrich support: not a creature!")
    }
    card.modifiers.push({ id: "attackChange", quantity: 1 })
    return duel
  })

  return duel
}

export async function winged_bull_before_combat(inputDuel: DuelState, instanceId: string) {
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
    card.modifiers.push({ id: "attackChange", quantity: 1 })
    duel = await playAnimation(duel, { id: "PAUSE", durationMs: BUFFER_MS })
  }

  return duel
}

export function bad_chicken_defense_modifier(inputDuel: DuelState, instanceId: string, attackAmount: number) {
  const random100 = getRandomInt(100, getRandomSeed())
  if (random100 < 20) {
    return "miss"
  }

  return attackAmount
}

export async function snail_support(inputDuel: DuelState, instanceId: string) {
  let duel = inputDuel
  const card = getCardByInstanceId(duel, instanceId)
  duel = await roll(duel, instanceId, 20, async () => {
    if (card.cardType !== "creature") {
      throw Error("Snail is not a creature")
    }
    card.shield = true
    return duel
  })
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

export const commonCardBehaviourMap = {
  "Desert Crawler": { getValidTargets: getDefaultCreatureTargets },
  "Bouldering Brawler": { getValidTargets: getDefaultCreatureTargets },
  Scrungy: { getValidTargets: getDefaultCreatureTargets },
  "Molten Loaf": { getValidTargets: getDefaultCreatureTargets },
  Snail: { getValidTargets: getDefaultCreatureTargets, effects: { support: snail_support } },
  Bubblebloop: { getValidTargets: getDefaultCreatureTargets },
  "Cleansing Storm": { getValidTargets: getDefaultSpellTargets },
  Shark: {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      beforeAttack: shark_before_attack,
    },
  },
  "Duskwood Ostrich": { getValidTargets: getDefaultCreatureTargets, effects: { support: duskwood_ostrich_support } },
  "Spade Manta": { getValidTargets: getDefaultCreatureTargets },
  "Towering Owl": { getValidTargets: getDefaultCreatureTargets },
  Hyllophant: { getValidTargets: getDefaultCreatureTargets },
  "Hulking Menace": { getValidTargets: getDefaultCreatureTargets },
  "Grassland Scout": { getValidTargets: getDefaultCreatureTargets },
  Narples: { getValidTargets: getDefaultCreatureTargets },
  "Winged Bull": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      beforeCombat: winged_bull_before_combat,
    },
  },
  "Bad Chicken": {
    getValidTargets: getDefaultCreatureTargets,
    effects: {
      defenseModifier: bad_chicken_defense_modifier,
    },
  },
}
