import { GoldTotal } from "./GoldTotal"
import styles from "./HeaderBar.module.css"
import { useGameStore } from "../hooks/useGameStore"
import { ReactNode } from "react"

export type HeaderBarProps = {
  leftContent?: ReactNode
  rightContent?: ReactNode
}

export const HeaderBar = ({ leftContent, rightContent }: HeaderBarProps) => {
  const { game } = useGameStore()
  return (
    <div className={`${styles.headerBar}`}>
      {leftContent !== undefined && <div className={`flex gap-2`}>{leftContent}</div>}
      <div className="grow" />
      {rightContent !== undefined && <div className={`flex gap-2`}>{rightContent}</div>}
    </div>
  )
}
