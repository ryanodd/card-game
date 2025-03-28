import { MainView } from "../components/MainView"
import { Button } from "../components/designSystem/Button"
import { useGameStore } from "../hooks/useGameStore"
import { GameBackground } from "../components/GameBackground"
import { Footer } from "../components/Footer"
import { LeagueNextGameSection } from "../components/LeagueScreen/LeagueNextGameSection"
import { LeagueStandingsTable } from "../components/LeagueScreen/LeagueStandingsTable"
import { LeagueScheduleTable } from "../components/LeagueScreen/LeagueScheduleTable"

export const LeagueScreen = () => {
  const { game, setGame } = useGameStore()

  const onBackClick = () => {
    setGame({ ...game, screen: { id: "mainMenu" } })
  }

  return (
    <MainView>
      <div className="w-full h-full flex flex-col ">
        <div className="flex flex-col p-8 gap-8">
          <h1 className="text-5xl text-stone-50">League</h1>
        </div>
        <div className=" basis-0 grow flex gap-4 p-4 justify-center items-center overflow-hidden">
          <LeagueNextGameSection />
          <LeagueStandingsTable />
          <div className="h-full flex flex-col">
            <LeagueScheduleTable />
          </div>
        </div>
        <Footer
          leftContent={
            <Button className="flex items-center" onClick={onBackClick}>
              ⬅ Back
            </Button>
          }
        />
      </div>
    </MainView>
  )
}
