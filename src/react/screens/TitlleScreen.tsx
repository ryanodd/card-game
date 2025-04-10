import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { GameBackground } from "../components/GameBackground"
import { SettingsDialog } from "../components/SettingsDialog"
import { Footer } from "../components/Footer"
import { DefaultDialog } from "../components/designSystem/Dialog"
import { DuelSetupContent } from "../components/DuelSetup/DuelSetupContent"
import { getTotalPacksInInventory } from "@/src/game/shop/Packs"
import { Logo } from "../components/Logo"
import packageJson from "../../../package.json"

export const TitleScreen = () => {
  const { game, setGame } = useGameStore()

  const onStartClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="grow flex flex-col justify-center items-center gap-4  p-4">
        <Logo />
        <div className="flex flex-col mt-8 gap-4">
          <Button data-size="large" onClick={onStartClick}>
            Start game
          </Button>
        </div>
      </div>
    </div>
  )
}
