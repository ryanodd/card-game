import { CardData } from "@/src/game/cards/CardData"
import { InventoryQuantityIndicator } from "../EditDeckScreen/InventoryQuantityIndicator"
import { useGameStore } from "../../hooks/useGameStore"
import { CardName } from "@/src/game/cards/CardName"
import { cardDataMap } from "@/src/game/cards/AllCards"
import { CardDetailed } from "../CardDetailed"
import styles from "./ShopCell.module.css"
import { COLLECTION_MAX_PER_CARD } from "@/src/game/GameData"
import { getShopCostForCard } from "@/src/game/shop/getShopCostForCard"
import { ShopBuyConfirmDialog } from "./ShopBuyConfirmDialog"
import { PackVariant } from "@/src/game/Packs"
import { addPack } from "@/src/game/shop/addPack"
import { buyShopItem } from "@/src/game/shop/buyShopItem"
import { Pack } from "../PackScreen/Pack"
import { ShopItem } from "@/src/game/shop/ShopItem"

export type ShopCellProps = {
  shopItem: ShopItem
}

export const ShopCell = ({ shopItem }: ShopCellProps) => {
  const { game, setGame } = useGameStore()

  let shopItemToRender = null
  const canAfford = game.gold >= shopItem.price

  const onConfirmBuy = () => {
    const nextGame = buyShopItem(game, shopItem)
    setGame(nextGame)
  }

  if (shopItem.type === "card") {
    const cardData = cardDataMap[shopItem.cardName]
    const quantityOwned = game.cardCollection[cardData.name]
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
        <InventoryQuantityIndicator quantity={quantityOwned} quantityInDeck={0} />
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
      <span className={styles.shopPrice} data-can-afford={canAfford}>
        $ {shopItem.price}
      </span>
      {shopItemToRender}
    </div>
  )
}
