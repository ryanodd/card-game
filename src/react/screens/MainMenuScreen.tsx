import { getActiveDeck } from "@/src/game/GameData"
import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { deckMap } from "@/src/game/decks/Decks"
import { GameBackground } from "../components/GameBackground"
import { GoldTotal } from "../components/GoldTotal"
import { createNewDuel } from "@/src/game/duel/createNewDuel"
import { SettingsDialog } from "../components/SettingsDialog"
import { Footer } from "../components/Footer"
import { DefaultDialog } from "../components/designSystem/Dialog"
import { DuelSetupContent } from "../components/DuelSetup/DuelSetupContent"

export const MainMenuScreen = () => {
  const { game, setGame } = useGameStore()

  const onLeagueClick = () => {
    setGame({ ...game, screen: { id: "league" } })
  }

  const onCampaignClick = () => {
    setGame({ ...game, screen: { id: "campaignSelect" } })
  }

  const onShopClick = () => {
    setGame({ ...game, screen: { id: "shop" } })
  }

  const onManageDeckClick = () => {
    setGame({ ...game, screen: { id: "manageDecks" } })
  }
  const onCollectionClick = () => {
    setGame({ ...game, screen: { id: "collection" } })
  }

  const onPacksClick = () => {
    setGame({ ...game, screen: { id: "managePacks" } })
  }

  const godMode = game.settings.godMode

  return (
    <MainView>
      <GameBackground />
      <div className="h-full flex flex-col">
        <div className="grow flex flex-col justify-center items-center gap-4  p-4">
          <h1 className="text-3xl text-stone-50">{"It's a card game!"}</h1>
          <h2 className="text-lg text-stone-50">{`Active deck: ${getActiveDeck(game)?.name ?? "None"}`}</h2>
          <div className="flex flex-col mt-8 gap-4">
            <div className="flex flex-col gap-4">
              <DefaultDialog
                trigger={
                  <Button data-variant="primary" data-size="large">
                    Play Now
                  </Button>
                }
                content={<DuelSetupContent duelEntryPoint={{ duelType: "play-now" }} />}
              />
              <Button data-size="large" onClick={onLeagueClick}>
                League
              </Button>
              {godMode && (
                <Button data-size="large" onClick={onCampaignClick}>
                  Campaign
                </Button>
              )}
            </div>
            <div className="flex flex-col mt-8 gap-4">
              <div className="flex gap-4">
                <Button className="w-48 flex-grow" data-size="large" onClick={onManageDeckClick}>
                  Decks
                </Button>
                <Button className="w-48 flex-grow" data-size="large" onClick={onCollectionClick}>
                  Collection
                </Button>
              </div>
              <Button data-size="large" onClick={onShopClick}>
                Shop
              </Button>
              <Button data-size="large" onClick={onPacksClick}>
                Packs
              </Button>
            </div>
            <div className="flex flex-col mt-8 gap-4">
              <SettingsDialog trigger={<Button data-size="large">Settings</Button>} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MainView>
  )
}
