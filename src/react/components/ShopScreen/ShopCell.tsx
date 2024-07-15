import { CardData } from "@/src/game/cards/CardData"
import { InventoryQuantityIndicator } from "../EditDeckScreen/InventoryQuantityIndicator"
import { useGameStore } from "../../hooks/useGameStore"
import { CardName } from "@/src/game/cards/CardName"
import { cardDataMap } from "@/src/game/cards/AllCards"
import { CardDetailed } from "../CardDetailed"
import styles from "./ShopCell.module.css"
import { buyCard } from "@/src/game/shop/buyCard"
import { COLLECTION_MAX_PER_CARD } from "@/src/game/GameData"
import { getShopCostForCard } from "@/src/game/shop/getShopCostForCard"
import { ShopBuyConfirmDialog } from "./ShopBuyConfirmDialog"

export type ShopCellProps = {
  cardName: CardName
}

export const ShopCell = ({ cardName }: ShopCellProps) => {
  const { game, setGame } = useGameStore()
  const cardData = cardDataMap[cardName]
  const quantityOwned = game.collection[cardData.name]
  const cost = getShopCostForCard(cardName)

  const onConfirmBuy = () => {
    const nextGame = buyCard(game, cardName)
    setGame(nextGame)
  }

  return (
    <div className={styles.shopCell}>
      <ShopBuyConfirmDialog
        cardName={cardName}
        cost={cost}
        trigger={
          <button disabled={quantityOwned >= COLLECTION_MAX_PER_CARD || game.gold < cost}>
            <CardDetailed cardData={cardData} />
          </button>
        }
        onConfirm={onConfirmBuy}
      />
      <InventoryQuantityIndicator quantity={quantityOwned} quantityInDeck={0} />
      <span className={styles.shopPrice}>Cost: {cost}</span>
    </div>
  )
}
