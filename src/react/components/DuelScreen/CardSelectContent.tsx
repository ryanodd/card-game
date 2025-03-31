import { DuelState } from "@/src/game/duel/DuelData"
import styles from "./CardSelectContent.module.css"
import { getDuelPlayerById } from "@/src/game/duel/DuelHelpers"
import { CardPreview } from "../Card/CardPreview"
import { Button } from "../designSystem/Button"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"
import { mulligan_execute } from "@/src/game/duel/choices/mulligan"
import { useState } from "react"
import { saveAndAdvanceDuelUntilChoiceOrWinner } from "@/src/game/duel/control/saveAndAdvanceDuelUntilChoiceOrWinner"
import { confirmStart_execute } from "@/src/game/duel/choices/confirmStart"
import { CardDetailed } from "../Card/CardDetailed"
import { CardDetailedScaled } from "../Card/CardDetailedScaled"
import { cardSelect_execute } from "@/src/game/duel/choices/cardSelect"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"

export type CardSelectContentProps = {
  duel: DuelState
}

export const CardSelectContent = ({ duel }: CardSelectContentProps) => {
  const { setDialogShowBattlefield } = useDuelUIStore()
  const player = getDuelPlayerById(duel, duel.choice.playerId)
  const cardsToSelect = player.cardSelect
  const choiceId = duel.choice.id

  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])

  const onShowBattlefieldClick = () => {
    setDialogShowBattlefield(true)
  }
  const onSubmitClick = async () => {
    if (choiceId === "MULLIGAN") {
      const nextDuel = await mulligan_execute(duel, selectedCardIds)
      saveAndAdvanceDuelUntilChoiceOrWinner(nextDuel)
    }
    if (choiceId === "CARD_SELECT") {
      const nextDuel = await cardSelect_execute(duel, selectedCardIds)
      saveAndAdvanceDuelUntilChoiceOrWinner(nextDuel)
    }
  }

  const onCardClick = (cardId: string) => {
    if (selectedCardIds.includes(cardId)) {
      setSelectedCardIds(
        selectedCardIds.filter((id) => {
          return id !== cardId
        })
      )
    } else {
      setSelectedCardIds([...selectedCardIds, cardId])
    }
  }

  return (
    <div className={styles.cardSelectContent}>
      <h1 className={styles.cardSelectTitle}>
        {choiceId === "MULLIGAN" && "Redraw cards"}
        {choiceId === "CARD_SELECT" && duel.choice.title}
      </h1>
      <h2 className={styles.cardSelectDescription}>
        {choiceId === "MULLIGAN" && "Select cards to shuffle back into your deck & redraw."}
        {choiceId === "CARD_SELECT" && duel.choice.description}
      </h2>
      <div className={styles.cardSelectRow}>
        {cardsToSelect.map((card) => {
          return (
            <button
              key={card.instanceId}
              onClick={() => {
                onCardClick(card.instanceId)
              }}
              className={styles.cardSelectButton}
              data-selected={selectedCardIds.includes(card.instanceId)}
              data-choice-id={choiceId}
            >
              <CardDetailedScaled scale={0.75}>
                <CardDetailed key={card.instanceId} cardData={cardDataMap[card.name]} />
              </CardDetailedScaled>
              {choiceId === "MULLIGAN" && selectedCardIds.includes(card.instanceId) && (
                <span className={`${styles.cardSelectButtonMulliganIndicator} text-outline`}>X</span>
              )}
              {choiceId === "CARD_SELECT" && selectedCardIds.includes(card.instanceId) && (
                <span className={`${styles.cardSelectButtonSelectedIndicator} text-outline`}>✓</span>
              )}
            </button>
          )
        })}
      </div>
      <div className={styles.cardSelectButtonRow}>
        <Button data-variant="secondary" data-size="large" onClick={onShowBattlefieldClick}>
          Show Battlefield
        </Button>
        <Button data-variant="primary" data-size="large" onClick={onSubmitClick}>
          Submit
        </Button>
      </div>
    </div>
  )
}
