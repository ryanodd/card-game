import { CardData } from "@/src/game/cards/CardData"
import { InventoryQuantityIndicator } from "../EditDeckScreen/InventoryQuantityIndicator"
import { useGameStore } from "../../hooks/useGameStore"
import { CardDetailed } from "../Card/CardDetailed"
import styles from "./ShopCell.module.css"
import { COLLECTION_MAX_PER_CARD } from "@/src/game/GameData"
import { getShopCostForCard } from "@/src/game/shop/getShopCostForCard"
import { ShopBuyConfirmDialog } from "./ShopBuyConfirmDialog"
import { buyShopItem } from "@/src/game/shop/buyShopItem"
import { Pack } from "../PackScreen/Pack"
import { ShopItem } from "@/src/game/shop/ShopItem"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"
import { Coins } from "../designSystem/Icon"

export type ShopCellProps = {
  shopItem: ShopItem
  onPurchase: (shopItem: ShopItem) => void
}

export const ShopCell = ({ shopItem, onPurchase }: ShopCellProps) => {
  const { game, setGame } = useGameStore()

  let shopItemToRender = null
  const canAfford = game.gold >= shopItem.price

  const onConfirmBuy = () => {
    const nextGame = buyShopItem(game, shopItem)
    setGame(nextGame)
    onPurchase(shopItem)
  }

  const cardData = "cardName" in shopItem ? cardDataMap[shopItem.cardName] : null
  const quantityOwned = cardData ? game.cardCollection[cardData.name] : 0

  if (shopItem.type === "card" && cardData) {
    const disabled = quantityOwned >= COLLECTION_MAX_PER_CARD || !canAfford
    shopItemToRender = (
      <>
        <ShopBuyConfirmDialog
          shopItem={shopItem}
          trigger={
            // TODO reroll / hide purchased items
            <button className={styles.shopCellButton} disabled={disabled}>
              <CardDetailed cardData={cardData} />
            </button>
          }
          onConfirm={onConfirmBuy}
        />
        <InventoryQuantityIndicator variant="owned-number" quantity={quantityOwned} />
      </>
    )
  }

  if (shopItem.type === "pack") {
    const packVariant = shopItem.packVariant
    const disabled = !canAfford
    shopItemToRender = (
      <ShopBuyConfirmDialog
        shopItem={shopItem}
        trigger={
          <button className={styles.shopCellButton} disabled={disabled}>
            <Pack variant={packVariant} />
          </button>
        }
        onConfirm={onConfirmBuy}
      />
    )
  }
  return (
    <div className={styles.shopCell}>
      <span
        className={styles.shopPrice}
        data-can-afford={canAfford}
        data-disabled={quantityOwned >= COLLECTION_MAX_PER_CARD}
      >
        <Coins data-size="lg" /> {shopItem.price}
      </span>
      {shopItemToRender}
    </div>
  )
}
