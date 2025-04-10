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

export const legendaryCardBehaviourMap = {
  "Sol Guardian": { getValidTargets: getDefaultCreatureTargets },
  "Spirit Giant": {
    getValidTargets: getDefaultCreatureTargets,
  },
  "Owldus the Arcane": { getValidTargets: getDefaultCreatureTargets },
  "Celestial Riftkeeper": { getValidTargets: getDefaultCreatureTargets },
  "Mega Demigod": { getValidTargets: getDefaultCreatureTargets },
}
