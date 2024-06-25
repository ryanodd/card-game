import { GoldTotal } from "./GoldTotal"
import styles from "./Footer.module.css"
import { useGameStore } from "../hooks/useGameStore"
import { ReactNode } from "react"

export type FooterProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
}

export const Footer = ({ leftContent, rightContent }: FooterProps) => {
  const { game } = useGameStore()
  return (
    <div className={`${styles.footer}`}>
      <div className={`${styles.footerRow}`}>
        {leftContent !== undefined && <div className={`flex gap-2`}>{leftContent}</div>}
        <div className="grow" />
        <GoldTotal value={game.gold} />
        {rightContent !== undefined && <div className={`flex gap-2`}>{rightContent}</div>}
      </div>
    </div>
  )
}
