import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { GameBackground } from "../components/GameBackground"
import { useCallback, useMemo, useState } from "react"
import { Footer } from "../components/Footer"
import { ShopCell } from "../components/ShopScreen/ShopCell"
import { decideShopItems } from "@/src/game/shop/decideShopItems"
import { ShopItem } from "@/src/game/shop/ShopItem"
import { Toast } from "../components/designSystem/Toast"

export const ShopScreen = () => {
  const { game, setGame } = useGameStore()

  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  const shopItems = useMemo(() => {
    return decideShopItems()
  }, [])

  const [purchaseSuccessToast, setPurchaseSuccessToast] = useState<{ title: string; packAction?: boolean } | null>(null)
  const onPurchase = useCallback(
    (shopItem: ShopItem) => {
      if (shopItem.type === "pack") {
        setPurchaseSuccessToast({ title: `Purchased ${shopItem.title}.`, packAction: true })
      }
      if (shopItem.type === "card") {
        setPurchaseSuccessToast({ title: `Purchased ${shopItem.title}.` })
      }
    },
    [setPurchaseSuccessToast]
  )

  return (
    <MainView>
      <GameBackground />
      <Toast
        toastTitle={purchaseSuccessToast?.title}
        open={purchaseSuccessToast !== null}
        toastAction={
          !!purchaseSuccessToast?.packAction && (
            <Button
              onClick={() => {
                setGame({ ...game, screen: { id: "managePacks" } })
              }}
            >
              Go to packs
            </Button>
          )
        }
        onOpenChange={(open) => {
          if (!open) {
            setPurchaseSuccessToast(null)
          }
        }}
      />
      <div className="w-full h-full flex flex-col">
        <div className="grow flex flex-col p-8 gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-stone-50">Shop</h1>
            <h2 className="text-xl text-stone-50">The shop&apos;s contents change daily.</h2>
          </div>
          <div className="grow flex items-center">
            <div className="grow flex gap-4">
              {shopItems.map((shopItem, i) => {
                return <ShopCell key={i} shopItem={shopItem} onPurchase={onPurchase} />
              })}
            </div>
          </div>
        </div>
        <Footer
          leftContent={
            <Button className="flex items-center" onClick={onBackClick}>
              ⬅ Back
            </Button>
          }
        />
      </div>
    </MainView>
  )
}
