import { GoldTotal } from "./GoldTotal"
import styles from "./Footer.module.css"
import { useGameStore } from "../hooks/useGameStore"

export const Footer = () => {
  const { game } = useGameStore()
  return (
    <div className={`${styles.footer}`}>
      <div className={`${styles.footerRow}`}>
        <GoldTotal value={game.gold} />
      </div>
    </div>
  )
}
