import { DuelState, PlayerID } from "@/src/game/DuelData"
import { getDuelPlayerById, getSpaceById } from "@/src/game/DuelHelpers"

import styles from "./DefendLine.module.css"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"

export type DefendLinesProps = {
  duel: DuelState
  playerId: PlayerID
  index: number
}

export const DefendLine = ({ duel, playerId, index }: DefendLinesProps) => {
  const mySpaceId = getDuelPlayerById(duel, playerId).creatureSpaces[index].id
  const { defendersToAttackers } = useDuelUIStore()

  const attackingSpaceId = defendersToAttackers[mySpaceId] ?? duel.defendersToAttackers[mySpaceId]

  if (!attackingSpaceId) {
    return null
  }

  const attackingSpaceIndex = getSpaceById(duel, attackingSpaceId).index

  let direction = "up"
  if (playerId === "human" && attackingSpaceIndex === index - 1) {
    direction = "up-left"
  }
  if (playerId === "human" && attackingSpaceIndex === index) {
    direction = "up"
  }
  if (playerId === "human" && attackingSpaceIndex === index + 1) {
    direction = "up-right"
  }
  if (playerId === "opponent" && attackingSpaceIndex === index - 1) {
    direction = "down-left"
  }
  if (playerId === "opponent" && attackingSpaceIndex === index) {
    direction = "down"
  }
  if (playerId === "opponent" && attackingSpaceIndex === index + 1) {
    direction = "down-right"
  }

  return <div className={`${styles.defend_line}`} data-direction={direction} />
}
