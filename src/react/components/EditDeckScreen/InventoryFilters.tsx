import { useCallback, useEffect } from "react"
import { Button } from "../designSystem/Button"
import styles from "./Inventory.module.css"
import { useInventoryBrowserStore } from "../../hooks/useInventoryBrowserStore"
import { Air, Circle, Earth, Fire, Water } from "../designSystem/Icon"
import { EnergyType } from "@/src/game/duel/EnergyData"
import { Rarity } from "@/src/game/cards/CardData"
import { CardRarityIndicator } from "../Card/CardRarityIndicator"
import { useGameStore } from "../../hooks/useGameStore"

export type InventoryFiltersProps = {}

export const InventoryFilters = ({}: InventoryFiltersProps) => {
  const { game } = useGameStore()
  const { filters, setFilters } = useInventoryBrowserStore()

  const allEnergyTypesIncluded =
    filters.energyType["neutral"] &&
    filters.energyType["fire"] &&
    filters.energyType["water"] &&
    filters.energyType["earth"] &&
    filters.energyType["air"]

  const noEnergyTypesIncluded =
    !filters.energyType["neutral"] &&
    !filters.energyType["fire"] &&
    !filters.energyType["water"] &&
    !filters.energyType["earth"] &&
    !filters.energyType["air"]

  const allRaritiesIncluded =
    filters.rarity["base"] &&
    filters.rarity["common"] &&
    filters.rarity["uncommon"] &&
    filters.rarity["rare"] &&
    filters.rarity["epic"] &&
    filters.rarity["legendary"] &&
    filters.rarity["mythic"]

  const noRaritiesIncluded =
    !filters.rarity["base"] &&
    !filters.rarity["common"] &&
    !filters.rarity["uncommon"] &&
    !filters.rarity["rare"] &&
    !filters.rarity["epic"] &&
    !filters.rarity["legendary"] &&
    !filters.rarity["mythic"]

  const allCompletionsIncluded = filters.completion["complete"] && filters.completion["incomplete"]

  useEffect(() => {
    if (noEnergyTypesIncluded) {
      setFilters({
        ...filters,
        energyType: {
          neutral: true,
          fire: true,
          water: true,
          earth: true,
          air: true,
        },
      })
    }
  }, [noEnergyTypesIncluded, filters, setFilters])

  useEffect(() => {
    if (noRaritiesIncluded) {
      setFilters({
        ...filters,
        rarity: {
          base: true,
          common: true,
          uncommon: true,
          rare: true,
          epic: true,
          legendary: true,
          mythic: true,
        },
      })
    }
  }, [noRaritiesIncluded, filters, setFilters])

  const onOwnedClick = useCallback(() => {
    setFilters({
      ...filters,
      ownership: {
        unowned: false,
      },
    })
  }, [filters, setFilters])
  const onAllOwnershipClick = useCallback(() => {
    setFilters({
      ...filters,
      ownership: {
        unowned: true,
      },
    })
  }, [filters, setFilters])

  const onAllEnergyTypesClick = useCallback(() => {
    setFilters({
      ...filters,
      energyType: {
        neutral: true,
        fire: true,
        water: true,
        earth: true,
        air: true,
      },
    })
  }, [filters, setFilters])
  const onEnergyTypeClick = useCallback(
    (energyType: EnergyType) => {
      if (allEnergyTypesIncluded) {
        setFilters({
          ...filters,
          energyType: {
            neutral: false,
            fire: false,
            water: false,
            earth: false,
            air: false,
            [energyType]: true,
          },
        })
      } else if (noEnergyTypesIncluded) {
        setFilters({
          ...filters,
          energyType: {
            neutral: true,
            fire: true,
            water: true,
            earth: true,
            air: true,
          },
        })
      } else {
        setFilters({
          ...filters,
          energyType: {
            ...filters.energyType,
            [energyType]: !filters.energyType[energyType],
          },
        })
      }
    },
    [filters, setFilters, allEnergyTypesIncluded, noEnergyTypesIncluded]
  )

  const onAllRaritiesClick = useCallback(() => {
    setFilters({
      ...filters,
      rarity: {
        base: true,
        common: true,
        uncommon: true,
        rare: true,
        epic: true,
        legendary: true,
        mythic: true,
      },
    })
  }, [filters, setFilters])

  const onRarityClick = useCallback(
    (rarity: Rarity) => {
      console.log(filters.rarity)
      console.log(noRaritiesIncluded)
      if (allRaritiesIncluded) {
        setFilters({
          ...filters,
          rarity: {
            base: false,
            common: false,
            uncommon: false,
            rare: false,
            epic: false,
            legendary: false,
            mythic: false,
            [rarity]: true,
          },
        })
      } else {
        setFilters({
          ...filters,
          rarity: {
            ...filters.rarity,
            [rarity]: !filters.rarity[rarity],
          },
        })
      }
    },
    [filters, setFilters, allRaritiesIncluded, noRaritiesIncluded]
  )

  const onAllCompletionClick = useCallback(() => {
    setFilters({
      ...filters,
      completion: {
        complete: true,
        incomplete: true,
      },
    })
  }, [filters, setFilters])
  const onCompleteClick = useCallback(() => {
    setFilters({
      ...filters,
      completion: {
        complete: true,
        incomplete: false,
      },
    })
  }, [filters, setFilters])
  const onIncompleteClick = useCallback(() => {
    setFilters({
      ...filters,
      completion: {
        complete: false,
        incomplete: true,
      },
    })
  }, [filters, setFilters])

  return (
    <div className={styles.inventoryFiltersContainer}>
      <div className={styles.inventoryFiltersSection}>
        <Button
          data-size="small"
          onClick={onOwnedClick}
          data-variant={!filters.ownership.unowned ? "primary" : "tertiary"}
        >
          Owned
        </Button>
        <Button
          data-size="small"
          onClick={onAllOwnershipClick}
          data-variant={filters.ownership.unowned ? "primary" : "tertiary"}
        >
          All
        </Button>
      </div>
      <div className={styles.inventoryFiltersSection}>
        <Button
          data-size="small"
          onClick={onAllEnergyTypesClick}
          data-variant={allEnergyTypesIncluded ? "primary" : "tertiary"}
        >
          All
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onEnergyTypeClick("fire")
          }}
          data-variant={!allEnergyTypesIncluded && filters.energyType.fire ? "primary" : "tertiary"}
        >
          <Fire />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onEnergyTypeClick("water")
          }}
          data-variant={!allEnergyTypesIncluded && filters.energyType.water ? "primary" : "tertiary"}
        >
          <Water />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onEnergyTypeClick("earth")
          }}
          data-variant={!allEnergyTypesIncluded && filters.energyType.earth ? "primary" : "tertiary"}
        >
          <Earth />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onEnergyTypeClick("air")
          }}
          data-variant={!allEnergyTypesIncluded && filters.energyType.air ? "primary" : "tertiary"}
        >
          <Air />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onEnergyTypeClick("neutral")
          }}
          data-variant={!allEnergyTypesIncluded && filters.energyType.neutral ? "primary" : "tertiary"}
        >
          <Circle size="sm" />
        </Button>
      </div>

      <div className={styles.inventoryFiltersSection}>
        <Button
          data-size="small"
          onClick={onAllRaritiesClick}
          data-variant={allRaritiesIncluded ? "primary" : "tertiary"}
        >
          All
        </Button>
        <Button
          data-size="small"
          onClick={() => {
            onRarityClick("base")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.base ? "primary" : "tertiary"}
        >
          Base
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onRarityClick("common")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.common ? "primary" : "tertiary"}
        >
          <CardRarityIndicator rarity="common" />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onRarityClick("uncommon")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.uncommon ? "primary" : "tertiary"}
        >
          <CardRarityIndicator rarity="uncommon" />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onRarityClick("rare")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.rare ? "primary" : "tertiary"}
        >
          <CardRarityIndicator rarity="rare" />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onRarityClick("epic")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.epic ? "primary" : "tertiary"}
        >
          <CardRarityIndicator rarity="epic" />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onRarityClick("legendary")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.legendary ? "primary" : "tertiary"}
        >
          <CardRarityIndicator rarity="legendary" />
        </Button>
        <Button
          data-size="small"
          data-icon-only
          onClick={() => {
            onRarityClick("mythic")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.mythic ? "primary" : "tertiary"}
        >
          <CardRarityIndicator rarity="mythic" />
        </Button>
      </div>

      {game.settings.godMode && (
        <div className={styles.inventoryFiltersSection}>
          <Button
            data-size="small"
            onClick={onAllCompletionClick}
            data-variant={allCompletionsIncluded ? "primary" : "tertiary"}
          >
            All
          </Button>
          <Button
            data-size="small"
            onClick={onCompleteClick}
            data-variant={!allCompletionsIncluded && filters.completion.complete ? "primary" : "tertiary"}
          >
            Complete
          </Button>
          <Button
            data-size="small"
            onClick={onIncompleteClick}
            data-variant={!allCompletionsIncluded && filters.completion.incomplete ? "primary" : "tertiary"}
          >
            Incomplete
          </Button>
        </div>
      )}
    </div>
  )
}
