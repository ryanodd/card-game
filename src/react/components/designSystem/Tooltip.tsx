import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { ReactNode, useEffect, useState } from "react"

export type TooltipProps = Omit<TooltipPrimitive.TooltipContentProps, "content"> & {
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

  if (content === undefined) {
    return <>{children}</>
  }

  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(open) => {
        onOpenChange?.(open)
      }}
      disableHoverableContent
      delayDuration={200}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content style={{ zIndex: 999 }} {...props}>
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
