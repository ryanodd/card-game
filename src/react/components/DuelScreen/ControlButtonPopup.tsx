import { DuelState } from "@/src/game/duel/DuelData"
import { useDuelUIStore } from "../../hooks/useDuelUIStore"
import { Button } from "../designSystem/Button"

export type ControlButtonPopupProps = {
  duel: DuelState
}

export const ControlButtonPopup = ({ duel }: ControlButtonPopupProps) => {
  const { dialogShowBattlefield, setDialogShowBattlefield } = useDuelUIStore()

  console.log(dialogShowBattlefield, duel.choice.id)
  const showCardSelectButton =
    (duel.choice.id === "MULLIGAN" || duel.choice.id === "CARD_SELECT") && dialogShowBattlefield
  const showPopup = showCardSelectButton
  const onShowCardSelectClick = () => {
    setDialogShowBattlefield(false)
  }

  if (!showPopup) {
    return null
  }
  return (
    <div className={`absolute z-20 left-12 bottom-60 flex gap-4`}>
      {showCardSelectButton && (
        <Button onClick={onShowCardSelectClick} data-size="large" data-variant="primary">
          View cards
        </Button>
      )}
    </div>
  )
}
