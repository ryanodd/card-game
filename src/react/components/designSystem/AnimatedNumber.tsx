import { useEffect, useRef, useState } from "react"
import styles from "./AnimatedNumber.module.css"

const ANIMATION_DURATION_MS = 1000

// A number that animates when it changes,
// displaying the change to the number (e.g. -1, +3)
export type AnimatedNumberProps = {
  value: number
}

export const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const oldHealthValueRef = useRef(value)
  const [animatedValue, setAnimatedValue] = useState<number | null>(null)
  useEffect(() => {
    if (value === oldHealthValueRef.current) {
      return
    }
    setAnimatedValue(value - oldHealthValueRef.current)
    oldHealthValueRef.current = value

    setTimeout(() => {
      setAnimatedValue(null)
    }, ANIMATION_DURATION_MS)
  }, [value])

  if (animatedValue === null) {
    return null
  }

  return <h2 className={`${styles.animatedNumber} font-medium text-4xl text-outline-2`}>{animatedValue}</h2>
}
