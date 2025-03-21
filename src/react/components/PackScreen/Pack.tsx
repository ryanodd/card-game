import { PackVariant } from "@/src/game/shop/Packs"
import styles from "./Pack.module.css"
import cardStyles from "../Card.module.css"
import { ComponentPropsWithoutRef, forwardRef } from "react"

export type PackProps = ComponentPropsWithoutRef<"button"> & {
  variant: PackVariant
}

export const Pack = forwardRef<HTMLButtonElement, PackProps>(({ variant, ...props }, ref) => {
  return (
    <button className={`${styles.pack} ${cardStyles.full_card_size}`} data-variant={variant} ref={ref} {...props}>
      {variant}
    </button>
  )
})

Pack.displayName = "Pack"
