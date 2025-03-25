import { CardData } from "../CardData"

export const rareCards: CardData[] = []

// Slowly scales
rareCards.push({
  name: "Pmochi",
  imageSrcSmall: "/card-art/96x96/pmochi.png",
  imageSrcLarge: "/card-art/512x512/pmochi.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 4,
  health: 5,
  cost: {
    neutral: 5,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [],
})

rareCards.push({
  name: "Fire Blob",
  imageSrcSmall: "/card-art/96x96/fireBlob.png",
  imageSrcLarge: "/card-art/512x512/fireBlob.png",
  imageCenterYPercent: 52,
  rarity: "rare",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [],
})

rareCards.push({
  name: "Diabolical Cultist",
  imageSrcSmall: "/card-art/96x96/diabolicalCultist.png",
  imageSrcLarge: "/card-art/512x512/diabolicalCultist.png",
  imageCenterYPercent: 47,
  rarity: "rare",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [],
})

rareCards.push({
  name: "Treegre",
  imageSrcSmall: "/card-art/96x96/treegre.png",
  imageSrcLarge: "/card-art/512x512/treegre.png",
  imageCenterYPercent: 45,
  rarity: "rare",
  complete: true,
  energyType: "earth",
  cardType: "creature",
  attack: 5,
  health: 5,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 2,
    air: 0,
  },
  text: [],
})

rareCards.push({
  name: "Venus Fang",
  imageSrcSmall: "/card-art/96x96/venusFang.png",
  imageSrcLarge: "/card-art/512x512/venusFang.png",
  imageCenterYPercent: 40,
  rarity: "rare",
  complete: true,
  energyType: "earth",
  cardType: "creature",
  attack: 3,
  health: 4,
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
        { plainText: "Before attacking, if the enemy monster has " },
        { icon: "heart" },
        { boldText: "2" },

        { plainText: " or less, destroy it." },
      ],
    },
  ],
})

rareCards.push({
  name: "Phoenix Dasher",
  imageSrcSmall: "/card-art/96x96/phoenixDasher.png",
  imageSrcLarge: "/card-art/512x512/phoenixDasher.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: true,
  energyType: "multi",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [],
})

////////////////////////////////////

rareCards.push({
  name: "Ember Foxling",
  imageSrcSmall: "/card-art/96x96/emberFoxling.png",
  imageSrcLarge: "/card-art/512x512/emberFoxling.png",
  imageCenterYPercent: 70,
  rarity: "rare",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 2,
  health: 1,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "After attacking, deal " },
        { icon: "damage" },
        { boldText: "1" },
        { plainText: " to the enemy Hero." },
      ],
    },
  ],
})

rareCards.push({
  name: "Vengeful Flamewing",
  imageSrcSmall: "/card-art/96x96/vengefulFlamewing.png",
  imageSrcLarge: "/card-art/512x512/vengefulFlamewing.png",
  imageCenterYPercent: 45,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 2,
  health: 4,
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
  // text: "When Vengeful flamewing attacks, if it isn't at maximum health, do +3 damage.",
})

// When attacking this creature, your opponent has a 25% chance to miss.
rareCards.push({
  name: "Fairy Buckfly",
  imageSrcSmall: "/card-art/96x96/fairyBuckfly.png",
  imageSrcLarge: "/card-art/512x512/fairyBuckfly.png",
  imageCenterYPercent: 18,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 2,
  health: 4,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 1,
  },
})

rareCards.push({
  name: "Eerie Vision",
  imageSrcSmall: "/card-art/96x96/eerieVision.png",
  imageSrcLarge: "/card-art/512x512/eerieVision.png",
  imageCenterYPercent: 20,
  rarity: "rare",
  complete: false,
  energyType: "air",
  cardType: "spell",
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [
    {
      variant: "default",
      textList: [{ keyword: "Scry" }, { boldText: " 3" }, { plainText: ". Draw a card." }],
    },
    {
      variant: "default",
      textList: [{ plainText: "Your hero takes " }, { icon: "damage" }, { boldText: "3" }, { plainText: "." }],
    },
  ],
})

rareCards.push({
  name: "Startle",
  imageSrcSmall: "/card-art/96x96/startle.png",
  imageSrcLarge: "/card-art/512x512/startle.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "spell",
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
  // text: "Return the front creature in target row to its owner's hand.",
})

rareCards.push({
  name: "Ancestral Presence",
  imageSrcSmall: "/card-art/96x96/ancestralPresence.png",
  imageSrcLarge: "/card-art/512x512/ancestralPresence.png",
  imageCenterYPercent: 30,
  rarity: "rare",
  complete: true,
  energyType: "air",
  cardType: "spell",
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [
    {
      variant: "default",
      textList: [{ plainText: "Put 2 random cards from your graveyard to your hand." }],
    },
  ],
})

rareCards.push({
  name: "Flame Sentinel",
  imageSrcSmall: "/card-art/96x96/flameSentinel.png",
  imageSrcLarge: "/card-art/512x512/flameSentinel.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 1,
  health: 1,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { keyword: "Backup" },
        { plainText: ": deal" },
        { icon: "damage" },
        { boldText: "1" },
        { plainText: " to a random enemy monster." },
      ],
    },
  ],
  keywords: ["Backup"],
})

rareCards.push({
  name: "Neojia Tamer",
  imageSrcSmall: "/card-art/96x96/neojiaTamer.png",
  imageSrcLarge: "/card-art/512x512/neojiaTamer.png",
  imageCenterYPercent: 46,
  rarity: "rare",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [{ plainText: "When played, Summon a 1/1 beast in the other row." }],
    },
  ],
})
rareCards.push({
  name: "Opaldrake Thrasher",
  imageSrcSmall: "/card-art/96x96/opaldrakeThrasher.png",
  imageSrcLarge: "/card-art/512x512/opaldrakeThrasher.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 5,
  health: 4,
  cost: {
    neutral: 2,
    fire: 1,
    water: 1,
    earth: 0,
    air: 0,
  },
})
rareCards.push({
  name: "Smoldering Shot",
  imageSrcSmall: "/card-art/96x96/smolderingShot.png",
  imageSrcLarge: "/card-art/512x512/smolderingShot.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: false,
  energyType: "fire",
  cardType: "spell",
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "Deal " },
        { icon: "damage" },
        { boldText: "3" },
        { plainText: " to the front enemy monster in target row." },
      ],
    },
  ],
})

rareCards.push({
  name: "Fairy Arsonist",
  imageSrcSmall: "/card-art/96x96/fairyArsonist.png",
  imageSrcLarge: "/card-art/512x512/fairyArsonist.png",
  imageCenterYPercent: 60,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 0,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
  // text: "Support: Add +1 burn to a random enemy creature.",
})

rareCards.push({
  name: "Astral Caller",
  imageSrcSmall: "/card-art/96x96/astralCaller.png",
  imageSrcLarge: "/card-art/512x512/astralCaller.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: [
    {
      variant: "default",
      textList: [
        { keyword: "Backup" },
        { plainText: ": " },
        { icon: "dice" },
        { boldText: "5%" },
        { plainText: " to deal " },
        { icon: "damage" },
        { boldText: "3" },
        { plainText: " to each enemy creature in its row." },
      ],
    },
  ],
})

rareCards.push({
  name: "Sicklehorn Grazer",
  imageSrcSmall: "/card-art/96x96/sicklehornGrazer.png",
  imageSrcLarge: "/card-art/512x512/sicklehornGrazer.png",
  imageCenterYPercent: 50,
  rarity: "rare",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 1,
    fire: 1,
    water: 0,
    earth: 1,
    air: 0,
  },
})

rareCards.push({
  name: "Pike Lancer",
  imageSrcSmall: "/card-art/96x96/pikeLancer.png",
  imageSrcLarge: "/card-art/512x512/pikeLancer.png",
  imageCenterYPercent: 45,
  rarity: "rare",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 4,
  cost: {
    neutral: 2,
    fire: 0,
    water: 2,
    earth: 0,
    air: 0,
  },
  text: [
    {
      variant: "default",
      textList: [
        { plainText: "Before attacking, deals " },
        { icon: "damage" },
        { boldText: "2" },
        { plainText: " to the enemy monster." },
      ],
    },
  ],
})

rareCards.push({
  name: "Violet Sagebeast",
  imageSrcSmall: "/card-art/96x96/violetSagebeast.png",
  imageSrcLarge: "/card-art/512x512/violetSagebeast.png",
  imageCenterYPercent: 38,
  rarity: "rare",
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
        { plainText: "Whenever you play a card, " },
        { icon: "dice" },
        { boldText: "50%" },
        { plainText: " to give front friendly monster in its row " },
        { boldText: "+1" },
        { icon: "heart" },
        { plainText: "." },
      ],
    },
  ],
})
