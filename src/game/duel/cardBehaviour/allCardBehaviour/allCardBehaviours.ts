import { getRandomInt, getRandomSeed } from "@/src/utils/randomNumber"
import { dealDamageToCreature } from "../../actions/dealDamage"
import { removeCard } from "../../actions/removeCard"
import { BUFFER_MS, playAnimation } from "../../control/playAnimation"
import { DuelState } from "../../DuelData"
import { getDuelPlayerByCardInstanceId, getOpposingAttackingCreatureByCardId } from "../../DuelHelpers"
import { CardBehaviour } from "../CardBehaviourData"
import { CardName } from "@/src/game/cards/CardName"
import { getConvertedEnergyCost } from "@/src/game/helpers"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"
import { destroyCard } from "../../actions/destroyCard"
import { baseCardBehaviourMap } from "./base"
import { commonCardBehaviourMap } from "./common"
import { uncommonCardBehaviourMap } from "./uncommon"
import { rareCardBehaviourMap } from "./rare"
import { epicCardBehaviourMap } from "./epic"
import { legendaryCardBehaviourMap } from "./legendary"
import { mythicCardBehaviourMap } from "./mythic"

export const cardBehaviourMap: Record<CardName, CardBehaviour> = {
  ...baseCardBehaviourMap,
  ...commonCardBehaviourMap,
  ...uncommonCardBehaviourMap,
  ...rareCardBehaviourMap,
  ...epicCardBehaviourMap,
  ...legendaryCardBehaviourMap,
  ...mythicCardBehaviourMap,
}
