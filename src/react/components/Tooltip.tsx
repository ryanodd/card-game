import { useDraggable } from "@dnd-kit/core"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { ReactNode, useEffect, useState } from "react"
import useIsMountedRef from "../hooks/useIsMounted"

export type TooltipProps = {
  children: ReactNode
  content: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Tooltip({ children, content, open, defaultOpen, onOpenChange, ...props }: TooltipProps) {
  // /* Workaround for a random bug:
  //  * When dragging & dropping something that is also a tooltip,
  //  * the open===true comes in JUST before the hovering stops. So you get a glitchy flash on drop.
  //  * this delays open===true just enough to fix the problem ¯\_(ツ)_/¯ sometimes...
  //  */
  // const isMountedRef = useIsMountedRef()
  // const [openLocal, setOpenLocal] = useState<boolean | undefined>(false)
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!isMountedRef.current) {
  //       return
  //     }
  //     setOpenLocal(open)
  //   }, 30)
  // }, [open])

  return (
    <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} disableHoverableContent>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content side="top" align="center" style={{ zIndex: 999 }} {...props}>
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
