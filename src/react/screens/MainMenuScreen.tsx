import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { Footer } from "../components/Footer"
import { DefaultDialog } from "../components/designSystem/Dialog"
import { DuelSetupContent } from "../components/DuelSetup/DuelSetupContent"
import packageJson from "../../../package.json"
import Image from "next/image"
import islandBackgroundImage from "../../../public/backgrounds/island.jpg"
import styles from "./MainMenuScreen.module.css"
import { InventoryFooter } from "../components/InventoryFooter"
import MenuButton from "@radix-ui/react-dropdown-menu"
import { HeaderBar } from "../components/HeaderBar"
import { SettingsDialog } from "../components/SettingsDialog"
import { Gear, Shop, Swords, TreasureMap, Trophy } from "../components/designSystem/Icon"
import { Logo } from "../components/Logo"

export const MainMenuScreen = () => {
  const { game, setGame } = useGameStore()
  const version = packageJson.version

  const onLeagueClick = () => {
    setGame({ ...game, screen: { id: "league" } })
  }

  const onCampaignClick = () => {
    setGame({ ...game, screen: { id: "campaignSelect" } })
  }

  const onShopClick = () => {
    setGame({ ...game, screen: { id: "shop" } })
  }

  const godMode = game.settings.godMode

  return (
    <div className="h-full flex flex-col">
      <Image className={styles.islandBackgroundImage} src={islandBackgroundImage} alt="Island map" />

      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <HeaderBar
        rightContent={
          <SettingsDialog
            trigger={
              <Button data-icon-only data-variant="secondary">
                <Gear />
              </Button>
            }
          />
        }
      />
      <div className="grow flex flex-col justify-center items-center gap-4  p-4">
        <DefaultDialog
          trigger={
            <Button className={styles.locationButton} data-id="quickDuel" data-size="large">
              <Swords />
              Quick battle
            </Button>
          }
          content={<DuelSetupContent duelEntryPoint={{ duelType: "play-now" }} />}
        />
        <Button className={styles.locationButton} data-id="league" data-size="large" onClick={onLeagueClick}>
          <Trophy />
          League
        </Button>
        <Button
          className={styles.locationButton}
          data-id="campaign"
          data-size="large"
          onClick={onCampaignClick}
          disabled={!godMode}
        >
          <TreasureMap />
          Campaign
        </Button>
        <Button className={styles.locationButton} data-id="shop" data-size="large" onClick={onShopClick}>
          <Shop />
          Shop
        </Button>
      </div>
      <div className="flex gap-2 justify-between">
        <InventoryFooter />
        <span className="self-end text-white text-xs px-2 py-1">Version {version}</span>
      </div>
      <Footer />
    </div>
  )
}
