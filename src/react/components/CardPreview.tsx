import styles from "./Card.module.css"
import Image from "next/image"
import { EnergyIcon } from "./EnergyIcon"
import { CardDetailed } from "./CardDetailed"
import { Tooltip } from "./Tooltip"
import { CardState, DuelState } from "@/src/game/duel/DuelData"
import { getEffectiveAttack } from "@/src/game/duel/helpers/getEffectiveAttack"
import { getEffectiveHealth } from "@/src/game/duel/helpers/getEffectiveHealth"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"

export const getCardHealthDisplayValue = (cardState: CardState) => {
  if (cardState.cardType === "creature") {
    return cardState.health - cardState.damage
  }
  return 0
}

export type CardPreviewProps = {
  duel: DuelState
  cardState: CardState
  showCostIcons?: boolean
  isTooltipOpen?: boolean
  setIsTooltipOpen?: (open: boolean) => void
}

export const CardPreview = ({ duel, cardState, showCostIcons, isTooltipOpen, setIsTooltipOpen }: CardPreviewProps) => {
  const cardData = cardDataMap[cardState.name]

  const getCostIcons = () => {
    const icons = []
    if (cardData.cost.neutral !== 0) {
      icons.push(<EnergyIcon energyType="neutral" size="small" amount={cardData.cost.neutral} key="neutral" />)
    }
    if (cardData.cost.fire !== undefined) {
      for (let x = 0; x < cardData.cost.fire; x++) {
        icons.push(<EnergyIcon energyType="fire" size="small" key={`fire-${x}`} />)
      }
    }
    if (cardData.cost.water !== undefined) {
      for (let x = 0; x < cardData.cost.water; x++) {
        icons.push(<EnergyIcon energyType="water" size="small" key={`water-${x}`} />)
      }
    }
    if (cardData.cost.earth !== undefined) {
      for (let x = 0; x < cardData.cost.earth; x++) {
        icons.push(<EnergyIcon energyType="earth" size="small" key={`earth-${x}`} />)
      }
    }
    if (cardData.cost.air !== undefined) {
      for (let x = 0; x < cardData.cost.air; x++) {
        icons.push(<EnergyIcon energyType="air" size="small" key={`air-${x}`} />)
      }
    }
    return icons
  }

  return (
    <Tooltip
      content={<CardDetailed cardData={cardData} cardState={cardState} />}
      open={isTooltipOpen}
      onOpenChange={setIsTooltipOpen}
    >
      <div
        className={`${styles.card} ${styles.card_size} ${styles.card_border} relative`}
        data-background={cardData.energyType}
      >
        {showCostIcons && <div className="absolute -top-2 -left-2 z-10 flex">{getCostIcons()}</div>}
        <div className={`${styles.image_border} relative`}>
          <Image src={cardData.imageSrcSmall} alt={cardData.name} width={512} height={512} />
        </div>
        <div className={`${styles.cardFooter}`}>
          {cardState.cardType === "creature" && (
            <>
              <div className={`${styles.attackIndicator} pl-1.5 pr-2 h-8 rounded-tr-xl`}>
                <h2
                  className={`${"text-2xl"} ${
                    getEffectiveAttack(cardState) > cardState.attack ? "text-green-300" : "text-stone-50"
                  } font-semibold text-outline`}
                >
                  {getEffectiveAttack(cardState)}
                </h2>
              </div>
              <div className={`${styles.healthIndicator} w-8 h-8 rounded-tl-xl`}>
                <h2
                  className={`text-2xl  font-semibold text-outline ${
                    cardState.damage > 0
                      ? "text-red-300"
                      : getEffectiveHealth(cardState) > cardState.health
                      ? "text-green-300"
                      : "text-stone-50"
                  }`}
                >
                  {getCardHealthDisplayValue(cardState)}
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </Tooltip>
  )
}
