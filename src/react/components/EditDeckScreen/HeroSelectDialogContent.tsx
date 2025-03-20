import { useGameStore } from "../../hooks/useGameStore"
import styles from "./HeroSelect.module.css"
import { useEditDeckState } from "../../hooks/useEditDeckState"
import { HeroName } from "@/src/game/duel/heroBehaviour/HeroName"
import { heroDataMap } from "@/src/game/heroes/AllHeroes"
import { HeroDetailed } from "../HeroDetailed"

export const HeroSelectDialogContent = () => {
  const { game, setGame } = useGameStore()
  const { editDeck, setEditDeck } = useEditDeckState()

  const heroList = [...Object.keys(game.heroCollection)] as HeroName[]

  const onSelectHero = (heroName: HeroName) => {
    setEditDeck({ ...editDeck, heroName, selectHeroDialogOpen: false })
  }

  return (
    <div className={styles.heroSelectContent}>
      <h1 className={styles.heroSelectTitle}>Select Hero</h1>
      <div className={styles.heroRow}>
        {heroList.map((heroName) => {
          const heroData = heroDataMap[heroName]
          return (
            <button className={styles.heroButton} onClick={() => onSelectHero(heroName)}>
              <HeroDetailed heroData={heroData} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
