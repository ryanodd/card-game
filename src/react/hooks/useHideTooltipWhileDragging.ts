import { useEffect, useState } from "react"

/* Fixes the problem where dragging something wrapped in a tooltip will have the tooltip open while dragging.
 * consumes `isDragging`, which should come from dndkit's useDraggable.
 * returns [isTooltipOpen, setIsTooltipOpen] to be used with Radix Tooltip's `open` and `onOpenChange`, respectively.
 */
export const useHideTooltipWhileDragging = (isDragging: boolean): [boolean, (isOpen: boolean) => void] => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  useEffect(() => {
    if (isTooltipOpen && isDragging) {
      setIsTooltipOpen(false)
    }
  }, [isTooltipOpen, isDragging])
  const setIsTooltipOpenWrapper = (isOpen: boolean) => {
    // If dragging, cancel the Tooltip's request to open.
    if (isDragging) {
      return
    }
    setIsTooltipOpen(isOpen)
  }
  return [isTooltipOpen, setIsTooltipOpenWrapper]
}
