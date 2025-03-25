import styles from "./Inventory.module.css"
import { CardName } from "@/src/game/cards/CardName"
import { InventoryCardCell } from "./InventoryCardCell"
import { Button } from "../designSystem/Button"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "../designSystem/Icon"
import { useInventoryBrowserStore } from "../../hooks/useInventoryBrowserStore"
import { cardDataMap } from "@/src/game/cards/allCards/allCards"

export type InventoryBrowserProps = {
  cards: CardName[]
  cardsDraggable?: boolean
}

// !!There is a value that much match this in Inventory.module.css
const INVENTORY_CARD_CELL_WIDTH = 260

export const InventoryGrid = ({ cards, cardsDraggable = false }: InventoryBrowserProps) => {
  const { filters } = useInventoryBrowserStore()
  const inventoryGridRef = useRef<HTMLDivElement | null>(null)
  const [cardsPerPage, setCardsPerPage] = useState(8)
  useLayoutEffect(() => {
    function updateSize() {
      if (inventoryGridRef.current) {
        setCardsPerPage(
          Math.max(
            1,
            2 * Math.floor(inventoryGridRef.current?.getBoundingClientRect().width / INVENTORY_CARD_CELL_WIDTH)
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
  }, [cardsPerPage, filters])

  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const totalPages = Math.ceil(cards.length / cardsPerPage)

  return (
    <div className={styles.inventoryGridContainer}>
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
        {cards
          .slice(currentPageNumber * cardsPerPage, currentPageNumber * cardsPerPage + cardsPerPage)
          .map((cardName) => (
            <InventoryCardCell
              key={cardName}
              cardData={cardDataMap[cardName]}
              showAddSubtractControls={cardsDraggable}
              draggable={cardsDraggable}
            />
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
