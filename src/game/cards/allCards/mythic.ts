import { CardData } from "../CardData"

export const mythicCards: CardData[] = []

mythicCards.push({
  name: "Nyreth, Light Eater",
  imageSrcSmall: "/card-art/96x96/nyrethLightEater.png",
  imageSrcLarge: "/card-art/512x512/nyrethLightEater.png",
  imageCenterYPercent: 60,
  rarity: "mythic",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 7,
  health: 7,
  cost: {
    neutral: 5,
    fire: 1,
    water: 0,
    earth: 0,
    air: 1,
  },
})

mythicCards.push({
  name: "Hydrus, Seaborn Titan",
  imageSrcSmall: "/card-art/96x96/hydrusSeabornTitan.png",
  imageSrcLarge: "/card-art/512x512/hydrusSeabornTitan.png",
  imageCenterYPercent: 20,
  rarity: "mythic",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 6,
  health: 6,
  cost: {
    neutral: 3,
    fire: 0,
    water: 2,
    earth: 0,
    air: 0,
  },
  // text: "When played: draw 2 cards. When Hydrus, Seaborn Titan attacks, heal your hero equal to the number of cards in your hand.",
})

mythicCards.push({
  name: "Saurongar The Smotherer",
  imageSrcSmall: "/card-art/96x96/saurongarTheSmotherer.png",
  imageSrcLarge: "/card-art/512x512/saurongarTheSmotherer.png",
  imageCenterYPercent: 45,
  rarity: "mythic",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 5,
  health: 4,
  cost: {
    neutral: 2,
    fire: 2,
    water: 0,
    earth: 0,
    air: 0,
  },
  // text: "Trample. Before Saurongar the Smotherer attacks, add burn 1 to each enemy creature in this row.",
})

mythicCards.push({
  name: "Inferno Demon",
  imageSrcSmall: "/card-art/96x96/infernoDemon.png",
  imageSrcLarge: "/card-art/512x512/infernoDemon.png",
  imageCenterYPercent: 42,
  rarity: "mythic",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 10,
  health: 10,
  cost: {
    neutral: 6,
    fire: 2,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: [],
})
