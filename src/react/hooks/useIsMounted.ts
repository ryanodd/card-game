import { useEffect, useRef } from "react"

// Use this hook within a component to know whether the component is still mounted.
export const useIsMountedRef = () => {
  const isMounted = useRef(true)

  // On unmount, set isMounted to false
  useEffect(
    () => () => {
      isMounted.current = false
    },
    []
  )

  return isMounted
}

export default useIsMountedRef
