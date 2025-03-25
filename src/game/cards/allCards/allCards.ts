import { CardData } from "../CardData"
import { CardName } from "../CardName"
import { baseCards } from "./base"
import { commonCards } from "./common"
import { epicCards } from "./epic"
import { legendaryCards } from "./legendary"
import { mythicCards } from "./mythic"
import { rareCards } from "./rare"
import { uncommonCards } from "./uncommon"

const cards: CardData[] = []

cards.push(...baseCards)
cards.push(...commonCards)
cards.push(...uncommonCards)
cards.push(...rareCards)
cards.push(...epicCards)
cards.push(...legendaryCards)
cards.push(...mythicCards)

// Used https://deepai.org/ for image generation
// Used https://www.iloveimg.com/ for image resizing

// Ideas
// - water/earth: When this creature takes damage, restore it to full health (Mythic?)
// - fire: cards (in target row?) fight until they can't any more
// - fire attack: 2 mana, 3 damage to something
// - wind: Target creature in an inactive slot swaps places with the active slot
// - keyword - mourn: when a friendly creature dies in this row, do something

// - blue: draw cards
// - green: lil guys
// - green: deathrattle
// - red: attack buff

// Are 0-attack minions possible?? No...
// - earth: 0/1 monument, gives all creatures +2 health
// - air: 0/2 egg hatches into monster

export const cardDataMap: Record<CardName, CardData> = cards.reduce((cardsByName, card) => {
  cardsByName[card.name] = card
  return cardsByName
}, {} as Record<string, CardData>)
