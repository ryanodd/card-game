import { useGameStore } from "../../hooks/useGameStore"
import { InventoryCard } from "./InventoryCard"
import { sortCardNames } from "@/src/game/helpers"
import styles from "./Inventory.module.css"
import { cardDataMap } from "@/src/game/cards/AllCards"
import { CardName } from "@/src/game/cards/CardName"
import { InventoryCardCell } from "./InventoryCardCell"
import { Button } from "../designSystem/Button"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "../designSystem/Icon"

export type InventoryBrowserProps = {
  cardsDraggable?: boolean
}

const INVENTORY_CARD_APPROXIMATE_WIDTH = 296

export const InventoryBrowser = ({ cardsDraggable = false }: InventoryBrowserProps) => {
  const { game } = useGameStore()
  const cardList = sortCardNames([...Object.keys(game.cardCollection)] as CardName[])

  const inventoryGridRef = useRef<HTMLDivElement | null>(null)
  const [cardsPerPage, setCardsPerPage] = useState(8)
  useLayoutEffect(() => {
    function updateSize() {
      if (inventoryGridRef.current) {
        setCardsPerPage(
          Math.max(
            1,
            2 * Math.floor(inventoryGridRef.current?.getBoundingClientRect().width / INVENTORY_CARD_APPROXIMATE_WIDTH)
          )
        )
      }
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    setCurrentPageNumber(0)
  }, [cardsPerPage])

  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const totalPages = Math.ceil(cardList.length / cardsPerPage)

  return (
    <div className={styles.inventoryContainer}>
      <Button
        onClick={() => {
          setCurrentPageNumber(Math.max(0, currentPageNumber - 1))
        }}
        disabled={currentPageNumber <= 0}
        data-icon-only
      >
        <ArrowLeft />
      </Button>
      <div className={`flex-grow ${styles.inventoryGrid}`} ref={inventoryGridRef}>
        {cardList
          .slice(currentPageNumber * cardsPerPage, currentPageNumber * cardsPerPage + cardsPerPage)
          .map((cardName) => (
            <InventoryCardCell key={cardName} cardData={cardDataMap[cardName]} draggable={cardsDraggable} />
          ))}
      </div>
      <Button
        onClick={() => {
          setCurrentPageNumber(Math.min(totalPages - 1, currentPageNumber + 1))
        }}
        disabled={currentPageNumber >= totalPages - 1}
        data-icon-only
      >
        <ArrowRight />
      </Button>
    </div>
  )
}
