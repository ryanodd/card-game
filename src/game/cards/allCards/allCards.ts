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

// - earth: 0/1 monument, gives all creatures +2 health
// - air: 0/2 egg hatches into monster

/**
 *
 * Keywords:
 * - Charge, trample, shield
 *
 * Conditions:
 * - when front monser attacks (backup)
 * - when damaging hero
 * - when killing monster
 * - when attacked
 * - when dying
 * - when playing a card
 * - When played. (if condition)
 * - In front
 * - In back
 *
 * Effects:
 * - draw cards (scry)
 * - Damage!!
 * - Destroy things (of low energy cost)
 * - gain attack
 * - Burn, Stun, Poison
 * - Heal
 * - gain shield
 *
 * Stupid effects:
 * - swap monster places
 * - swap attack & health
 * - spawn little creature (I don't think this is a good thing, the way things don't fricking die)
 * - discard cards
 *
 * Specific Ideas:
 * bunny can attack from second in line
 * Legendary/Mythic 1-cost spell: Reveal opponent's hand, maybe do extra stuff
 * The name 'Makasaur'
 */

export const cardDataMap: Record<CardName, CardData> = cards.reduce((cardsByName, card) => {
  cardsByName[card.name] = card
  return cardsByName
}, {} as Record<string, CardData>)
