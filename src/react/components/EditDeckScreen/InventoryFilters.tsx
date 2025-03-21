import { useCallback, useEffect } from "react"
import { Button } from "../designSystem/Button"
import styles from "./Inventory.module.css"
import { useInventoryBrowserStore } from "../../hooks/useInventoryBrowserStore"
import { Air, Earth, Fire, Water } from "../designSystem/Icon"
import { EnergyType } from "@/src/game/duel/EnergyData"
import { Rarity } from "@/src/game/cards/CardData"

export type InventoryFiltersProps = {}

export const InventoryFilters = ({}: InventoryFiltersProps) => {
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
  }, [noEnergyTypesIncluded])

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
  }, [noRaritiesIncluded])

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
            onEnergyTypeClick("neutral")
          }}
          data-variant={!allEnergyTypesIncluded && filters.energyType.neutral ? "primary" : "tertiary"}
        ></Button>
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
          onClick={() => {
            onRarityClick("common")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.common ? "primary" : "tertiary"}
        >
          Common
        </Button>
        <Button
          data-size="small"
          onClick={() => {
            onRarityClick("uncommon")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.uncommon ? "primary" : "tertiary"}
        >
          Uncommon
        </Button>
        <Button
          data-size="small"
          onClick={() => {
            onRarityClick("rare")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.rare ? "primary" : "tertiary"}
        >
          Rare
        </Button>
        <Button
          data-size="small"
          onClick={() => {
            onRarityClick("epic")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.epic ? "primary" : "tertiary"}
        >
          Epic
        </Button>
        <Button
          data-size="small"
          onClick={() => {
            onRarityClick("legendary")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.legendary ? "primary" : "tertiary"}
        >
          Legendary
        </Button>
        <Button
          data-size="small"
          onClick={() => {
            onRarityClick("mythic")
          }}
          data-variant={!allRaritiesIncluded && filters.rarity.mythic ? "primary" : "tertiary"}
        >
          Mythic
        </Button>
      </div>
    </div>
  )
}
