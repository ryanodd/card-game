import Image from "next/image"
import styles from "./Inventory.module.css"
import { Tooltip } from "../Tooltip"
import { HeroName } from "@/src/game/duel/heroBehaviour/HeroName"
import { heroDataMap } from "@/src/game/heroes/AllHeroes"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import { forwardRef, useCallback } from "react"
import { HeroDetailed } from "../HeroDetailed"
import { calculateTranslateYOffsetRem } from "@/src/utils/calculateYOffsetRem"

export const DECK_LIST_HERO_IMAGE_WIDTH_REMS = 20
export const DECK_LIST_HERO_IMAGE_HEIGHT_REMS = 5

export type HeroCellProps = {
  heroName: HeroName | null
}

export const HeroCell = forwardRef<HTMLButtonElement, HeroCellProps>(({ heroName, ...props }: HeroCellProps, ref) => {
  const heroData = heroDataMap[heroName as HeroName]

  const heroCell = (
    <button
      ref={ref}
      {...props}
      className={styles.heroCell}
      style={{ width: `${DECK_LIST_HERO_IMAGE_WIDTH_REMS}rem`, height: `${DECK_LIST_HERO_IMAGE_HEIGHT_REMS}rem` }}
    >
      {heroData ? (
        <Image
          className="object-cover"
          src={heroData.imageSrc}
          alt={heroData.name}
          width={512}
          height={512}
          style={{
            width: `${DECK_LIST_HERO_IMAGE_WIDTH_REMS}rem`,
            height: `${DECK_LIST_HERO_IMAGE_HEIGHT_REMS}rem`,
            objectPosition: `left 0 top ${calculateTranslateYOffsetRem(
              heroData,
              DECK_LIST_HERO_IMAGE_WIDTH_REMS,
              DECK_LIST_HERO_IMAGE_HEIGHT_REMS
            )}rem`,
          }}
        />
      ) : null}

      <div className={`${styles.heroCellContent}`}>
        <span className={`${styles.heroCellText} text-outline `}>{heroData?.name ?? "Select Hero"}</span>
      </div>
    </button>
  )

  if (heroData) {
    return (
      <Tooltip content={<HeroDetailed heroData={heroData} />} side="left">
        {heroCell}
      </Tooltip>
    )
  }
  return heroCell
})

HeroCell.displayName = "HeroCell"
