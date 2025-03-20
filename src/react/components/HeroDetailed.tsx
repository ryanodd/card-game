import Image from "next/image"
import heroStyles from "./Hero.module.css"

import { calculateTranslateYOffsetRem } from "@/src/utils/calculateYOffsetRem"
import { HeroData } from "@/src/game/heroes/HeroData"

export const HERO_IMAGE_WIDTH_REMS = 16
export const HERO_IMAGE_HEIGHT_REMS = 12

export type HeroDetailedProps = {
  heroData: HeroData
  // heroState?: HeroState
}

export const HeroDetailed = ({ heroData }: HeroDetailedProps) => {
  return (
    <div
      className={`${heroStyles.hero} ${heroStyles.full_hero_size} ${heroStyles.full_hero_border} bg-zinc-300 relative p-2 gap-2`}
      data-background={heroData.energyType}
    >
      <div className="flex gap-0.5 items-center -ml-1 -my-1">
        <h2 className={`${heroStyles.heroName} tracking-tight`}>{heroData.name}</h2>
      </div>
      <Image
        className="object-cover self-center rounded-md shadow-md pointer-events-none"
        src={heroData.imageSrc}
        alt={heroData.name}
        width={512}
        height={512}
        style={{
          width: `${HERO_IMAGE_WIDTH_REMS}rem`,
          height: `${HERO_IMAGE_HEIGHT_REMS}rem`,
          objectPosition: `left 0 top ${calculateTranslateYOffsetRem(
            heroData,
            HERO_IMAGE_WIDTH_REMS,
            HERO_IMAGE_HEIGHT_REMS
          )}rem`,
        }}
      />
      <div className={`${heroStyles.heroCaptionRow}`}>
        <span className={`${heroStyles.heroCaptionLeftSection}`}></span>
        {heroData.rarity !== "base" && (
          <div className={`${heroStyles.rarityIndicator}`} data-rarity={heroData.rarity} />
        )}
        {!heroData.complete && <span className="justify-self-end self-center text-xs text-red-950">Incomplete</span>}
      </div>

      <div className={heroStyles.textContainer}>
        <p className={`${heroStyles.heroText}  `}>{heroData.text}</p>
      </div>
      <div className={`${heroStyles.heroFooter} h-8 -mb-2 -mx-2 gap-2`}></div>
    </div>
  )
}
