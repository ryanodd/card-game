import styles from "./Pack.module.css"
import cardStyles from "../Card/Card.module.css"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { PackVariant } from "@/src/game/GameData"

export type PackProps = ComponentPropsWithoutRef<"div"> & {
  variant: PackVariant
}

export const Pack = forwardRef<HTMLDivElement, PackProps>(({ variant, ...props }, ref) => {
  return (
    <div className={`${styles.pack} ${cardStyles.full_card_size}`} data-variant={variant} ref={ref} {...props}>
      {variant}
    </div>
  )
})

Pack.displayName = "Pack"
