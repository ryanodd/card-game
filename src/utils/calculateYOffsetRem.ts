import { CardData } from "../game/cards/CardData"
import { HeroData } from "../game/heroes/HeroData"

// Assumes actual srcImage is square, and matches displayImage width
export const calculateTranslateYOffsetRem = (cardOrHeroData: CardData | HeroData, width: number, height: number) => {
  const imageCenterYRem = width * (cardOrHeroData.imageCenterYPercent / 100) // what the 'centerY' of the image is, in rem
  const toCenterY = height / 2
  const translateYOffsetResult = toCenterY - imageCenterYRem

  const minTranslation = -(width - height) // So we clip to the bottom
  const maxTranslation = 0 // So we clip to the top

  const result = Math.max(minTranslation, Math.min(maxTranslation, translateYOffsetResult))
  return result
}
