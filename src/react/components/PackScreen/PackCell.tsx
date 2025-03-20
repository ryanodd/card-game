import { openPack, PackVariant } from "@/src/game/Packs"
import { useGameStore } from "../../hooks/useGameStore"
import { Pack } from "./Pack"

export type PackCellProps = {
  variant: PackVariant
}

export const PackCell = ({ variant }: PackCellProps) => {
  const { game, setGame } = useGameStore()
  const onClick = () => {
    setGame(openPack(game, variant))
  }
  return <Pack variant={variant} onClick={onClick} />
}
