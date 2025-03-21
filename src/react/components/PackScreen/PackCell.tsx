import { PackVariant } from "@/src/game/shop/Packs"
import { useGameStore } from "../../hooks/useGameStore"
import { Pack } from "./Pack"
import { openPack } from "@/src/game/shop/openPack"
import styles from "./PackCell.module.css"

export type PackCellProps = {
  variant: PackVariant
}

export const PackCell = ({ variant }: PackCellProps) => {
  const { game, setGame } = useGameStore()
  const onClick = () => {
    setGame(openPack(game, variant))
  }
  const quantity = game.packs[variant]
  return (
    <button className={styles.packCell}>
      <Pack variant={variant} onClick={onClick} />
      <span className={styles.packQuantity}>{`x${quantity}`}</span>
    </button>
  )
}
