import styles from "./DebugMenu.module.css"
import { useDuelState } from "../../hooks/useDuelState"
import { useGameStore } from "../../hooks/useGameStore"
import { Button } from "../designSystem/Button"
import { useCallback } from "react"

export type DebugMenuProps = {}

const animationDurationMultiplierOptions = [0.25, 0.5, 1, 2, 4, 8, 16]

export const DebugMenu = ({}: DebugMenuProps) => {
  const { duel, setDuel } = useDuelState()
  const { game, setGame } = useGameStore()

  const setAnimationDurationMultiplier = useCallback(
    (multiplier: number) => {
      setGame({
        ...game,
        settings: {
          ...game.settings,
          animationMultiplier: multiplier,
        },
      })
    },
    [game, setGame]
  )

  return (
    <div className={`${styles.debugMenuContent}`}>
      <p className="text-stone-50">{duel.currentAnimation ? duel.currentAnimation?.id : duel.choice.id}</p>
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
            console.log(window.structuredClone(duel))
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
              disabled={game.settings.animationMultiplier === option}
            >
              {`${option}x`}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
