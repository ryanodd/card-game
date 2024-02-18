import { getAnimatedDuelState } from "@/src/game/DuelHelpers"

import styles from "./DebugMenu.module.css"
import { useDuelState } from "../../hooks/useDuelState"
import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import { useCallback } from "react"

export type DebugMenuProps = {}

const animationDurationMultiplierOptions = [0.25, 0.5, 1, 2, 4, 8, 16]

export const DebugMenu = ({}: DebugMenuProps) => {
  const { duel: rawDuel, setDuel } = useDuelState()
  const { game, setGame } = useGameStore()

  const duel = getAnimatedDuelState(rawDuel)

  const setAnimationDurationMultiplier = useCallback(
    (multiplier: number) => {
      setGame({
        ...game,
        settings: {
          ...game.settings,
          debug: {
            ...game.settings.debug,
            animationMultiplier: multiplier,
          },
        },
      })
    },
    [game, setGame]
  )

  return (
    <div className={`${styles.debugMenuContent}`}>
      <p>{"animation" in duel ? duel.animation.id : duel.choice.id}</p>
      <div className={`${styles.debugMenuRow}`}>
        <Button
          onClick={() => {
            console.log(window.structuredClone(game))
          }}
        >
          console.log(game)
        </Button>
      </div>
      <div className={`${styles.debugMenuRow}`}>
        <Button
          onClick={() => {
            console.log(window.structuredClone(rawDuel))
          }}
        >
          console.log(duel)
        </Button>
      </div>
      <div className={`${styles.debugMenuRow}`}>
        {animationDurationMultiplierOptions.map((option) => {
          return (
            <Button
              key={option}
              onClick={() => {
                setAnimationDurationMultiplier(option)
              }}
              disabled={game.settings.debug.animationMultiplier === option}
            >
              {`${option}x`}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
