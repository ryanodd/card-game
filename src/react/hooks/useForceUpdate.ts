import { useCallback, useState } from "react"

export function useForceUpdate() {
  const [, setValue] = useState<number>(0) // integer state
  const forceUpdate = useCallback(() => {
    setValue((value) => value + 1)
  }, [])
  return forceUpdate
}
