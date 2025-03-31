import { CardData } from "../CardData"

export const epicCards: CardData[] = []

epicCards.push({
  name: "Flame Demon",
  imageSrcSmall: "/card-art/512x512/flameDemon.png",
  imageSrcLarge: "/card-art/512x512/flameDemon.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 6,
  health: 6,
  cost: {
    neutral: 5,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "When played, " },
        { keyword: "Burn" },
        { plainText: " all enemy monsters in this row." },
      ],
    },
  ],
})

epicCards.push({
  name: "Cataclysm",
  imageSrcSmall: "/card-art/512x512/cataclysm.png",
  imageSrcLarge: "/card-art/512x512/cataclysm.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: true,
  energyType: "fire",
  cardType: "spell",
  cost: {
    neutral: 3,
    fire: 2,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [{ keyword: "Burn" }, { plainText: " a random enemy monster." }],
    },
    {
      variant: "default",
      textList: [
        { plainText: "Deal " },
        { icon: "damage" },
        { boldText: "1" },
        { plainText: " to a random enemy monster, 8 times. " },
      ],
    },
  ],
})

epicCards.push({
  name: "Plasmite",
  imageSrcSmall: "/card-art/512x512/plasmite.png",
  imageSrcLarge: "/card-art/512x512/plasmite.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 3,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [],
})

epicCards.push({
  name: "Manta Sprite",
  imageSrcSmall: "/card-art/512x512/mantaSprite.png",
  imageSrcLarge: "/card-art/512x512/mantaSprite.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
    dualType: {
      quantity: 2,
      primary: "water",
      secondary: "air",
    },
  },
  text: [],
})

epicCards.push({
  name: "Ethereal Nightmother",
  imageSrcSmall: "/card-art/512x512/etherealNightmother.png",
  imageSrcLarge: "/card-art/512x512/etherealNightmother.png",
  imageCenterYPercent: 45,
  rarity: "epic",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [],
})

//////////////////////////////

// If this creature is in an inactive slot, the creature in the active slot gets +2 attack
epicCards.push({
  name: "Komodo Teacher",
  imageSrcSmall: "/card-art/512x512/komodoTeacher.png",
  imageSrcLarge: "/card-art/512x512/komodoTeacher.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  // text: "Support: 40% chance to give a random friendly creature in this row +1/+1. 40% chance to draw a card.",
})

epicCards.push({
  name: "Stegowulf",
  imageSrcSmall: "/card-art/512x512/stegowulf.png",
  imageSrcLarge: "/card-art/512x512/stegowulf.png",
  imageCenterYPercent: 45,
  rarity: "epic",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  // text: "If Stegowulf attacks with no creatures behind, it deals +2 damage.\n\nStegowulf has a 20% chance of evading attacks.",
})

epicCards.push({
  name: "Joltbird Agent",
  imageSrcSmall: "/card-art/512x512/joltbirdAgent.png",
  imageSrcLarge: "/card-art/512x512/joltbirdAgent.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: true,
  energyType: "air",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  // text: "Support: 20% chance to stun a random enemy creature.",
  // keywords: ["support"],
})

epicCards.push({
  name: "Something Captain",
  imageSrcSmall: "/card-art/512x512/somethingCaptain.png",
  imageSrcLarge: "/card-art/512x512/somethingCaptain.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
})

epicCards.push({
  name: "Helix Stag",
  imageSrcSmall: "/card-art/512x512/helixStag.png",
  imageSrcLarge: "/card-art/512x512/helixStag.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "When played, give all friendly monsters " },
        { boldText: "+1" },
        { icon: "heart" },
        { plainText: "." },
      ],
    },
  ],
})

epicCards.push({
  name: "Time Collapse",
  imageSrcSmall: "/card-art/512x512/timeCollapse.png",
  imageSrcLarge: "/card-art/512x512/timeCollapse.png",
  imageCenterYPercent: 50,
  rarity: "epic",
  complete: false,
  energyType: "air",
  cardType: "spell",
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 0,
    air: 2,
  },
})
