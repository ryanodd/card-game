import { CardData } from "../CardData"

export const legendaryCards: CardData[] = []

legendaryCards.push({
  name: "Sol Guardian",
  imageSrcSmall: "/card-art/96x96/solGuardian.png",
  imageSrcLarge: "/card-art/512x512/solGuardian.png",
  imageCenterYPercent: 49,
  rarity: "legendary",
  complete: false,
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
  // text: "After attacking, deal 2 damage to your opponent's back monster in this row.",
})

legendaryCards.push({
  name: "Celestial Riftkeeper",
  imageSrcSmall: "/card-art/96x96/celestialRiftkeeper.png",
  imageSrcLarge: "/card-art/512x512/celestialRiftkeeper.png",
  imageCenterYPercent: 43,
  rarity: "legendary",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 7,
  health: 7,
  cost: {
    neutral: 5,
    fire: 0,
    water: 0,
    earth: 0,
    air: 2,
  },
  // text: "After attacking, deal 2 damage to your opponent's back monster in this row.",
})

legendaryCards.push({
  name: "Owldus The Arcane",
  imageSrcSmall: "/card-art/96x96/owldusTheArcane.png",
  imageSrcLarge: "/card-art/512x512/owldusTheArcane.png",
  imageCenterYPercent: 50,
  rarity: "legendary",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 4,
  health: 4,
  cost: {
    neutral: 4,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  // text: "After attacking, deal 2 damage to your opponent's back monster in this row.",
})

legendaryCards.push({
  name: "Mega Demigod",
  imageSrcSmall: "/card-art/96x96/megaDemigod.png",
  imageSrcLarge: "/card-art/512x512/megaDemigod.png",
  imageCenterYPercent: 50,
  rarity: "legendary",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 10,
  health: 10,
  cost: {
    neutral: 3,
    fire: 1,
    water: 1,
    earth: 1,
    air: 1,
  },
  text: [],
})

////////////////////////////////////

legendaryCards.push({
  name: "Spirit Giant",
  imageSrcSmall: "/card-art/96x96/spiritGiant.png",
  imageSrcLarge: "/card-art/512x512/spiritGiant.png",
  imageCenterYPercent: 51,
  rarity: "legendary",
  complete: false,
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
  // text: "When played: if there is a friendly creature in front of Spirit Giant, gain +3/+3.",
})

legendaryCards.push({
  name: "Ilstrom, Tidal Inferno",
  imageSrcSmall: "/card-art/96x96/ilstromTidalInferno.png",
  imageSrcLarge: "/card-art/512x512/ilstromTidalInferno.png",
  imageCenterYPercent: 50,
  rarity: "legendary",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 5,
  health: 5,
  cost: {
    neutral: 3,
    fire: 1,
    water: 1,
    earth: 0,
    air: 0,
  },
  // text: "When Ilstrom, Tidal Inferno enters the battlefield, deal 2 damage to the opponent. Support: if you have 3 or more creatures in play, 50% chance for opponent to discard a random card.",
})
