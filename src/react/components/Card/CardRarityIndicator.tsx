import { Rarity } from "@/src/game/cards/CardData"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import cardStyles from "./Card.module.css"

export type CardRarityIndicatorProps = ComponentPropsWithoutRef<"div"> & {
  rarity: Rarity
}

export const CardRarityIndicator = forwardRef<HTMLDivElement, CardRarityIndicatorProps>(
  ({ rarity, className, ...props }, ref) => {
    return <div className={`${className} ${cardStyles.rarityIndicator}`} data-rarity={rarity} {...props} ref={ref} />
  }
)

CardRarityIndicator.displayName = "CardRarityIndicator"
