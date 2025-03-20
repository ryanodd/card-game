import { CardData } from "./CardData"
import { CardName } from "./CardName"

let cards: CardData[] = []

cards.push({
  name: "Golden Friend",
  imageSrcSmall: "/card-art/96x96/goldenFriend.png",
  imageSrcLarge: "/card-art/512x512/goldenFriend.png",
  imageCenterYPercent: 55,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

// Support: the opposing active creature has a 20% chance of getting poisoned
cards.push({
  name: "Bed of Snakes",
  imageSrcSmall: "/card-art/96x96/bedOfSnakes.png",
  imageSrcLarge: "/card-art/512x512/bedOfSnakes.png",
  imageCenterYPercent: 75,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 1,
  health: 3,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: "When Bed of Snakes attacks, 50% chance to poison a random enemy creature in this row.",
})

cards.push({
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
  text: "Whenever this creature attacks, deal 1 damage to the opposing player.",
})

cards.push({
  name: "Winged Bull",
  imageSrcSmall: "/card-art/96x96/wingedBull.png",
  imageSrcLarge: "/card-art/512x512/wingedBull.png",
  imageCenterYPercent: 24,
  rarity: "common",
  complete: false,
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
  text: "When played: if Winged Bull is in the front of the row, 50% chance to gain +2 attack.",
})

cards.push({
  name: "Greenwing Caller",
  imageSrcSmall: "/card-art/96x96/greenwingCaller.png",
  imageSrcLarge: "/card-art/512x512/greenwingCaller.png",
  imageCenterYPercent: 40,
  rarity: "common",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 3,
  health: 5,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
})

cards.push({
  name: "Elder Saurus",
  imageSrcSmall: "/card-art/96x96/elderSaurus.png",
  imageSrcLarge: "/card-art/512x512/elderSaurus.png",
  imageCenterYPercent: 45,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 5,
  health: 5,
  cost: {
    neutral: 5,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
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
  text: "When Vengeful flamewing attacks, if it isn't at maximum health, do +3 damage.",
})

cards.push({
  name: "Sludge Amphibian",
  imageSrcSmall: "/card-art/96x96/sludgeAmphibian.png",
  imageSrcLarge: "/card-art/512x512/sludgeAmphibian.png",
  imageCenterYPercent: 30,
  rarity: "common",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 3,
  health: 4,
  cost: {
    neutral: 3,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Merfin Yodeler",
  imageSrcSmall: "/card-art/96x96/merfinYodeler.png",
  imageSrcLarge: "/card-art/512x512/merfinYodeler.png",
  imageCenterYPercent: 20,
  rarity: "uncommon",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 3,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  text: "Support: If this creature is in the top row, the attacking creature of the top row gets +1 attack and +1 health.",
  keywords: ["support"],
})

cards.push({
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
  text: "When played: if there is a friendly creature in front of Spirit Giant, gain +3/+3.",
})

// When attacking this creature, your opponent has a 25% chance to miss.
cards.push({
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

cards.push({
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

// If this creature is in an inactive slot, the creature in the active slot gets +2 attack
cards.push({
  name: "Komodo Teacher",
  imageSrcSmall: "/card-art/96x96/komodoTeacher.png",
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
  text: "Support: 40% chance to give a random friendly creature in this row +1/+1. 40% chance to draw a card.",
})

cards.push({
  name: "Living Hillside",
  imageSrcSmall: "/card-art/96x96/livingHillside.png",
  imageSrcLarge: "/card-art/512x512/livingHillside.png",
  imageCenterYPercent: 20,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 2,
  health: 6,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
})

cards.push({
  name: "Stegowulf",
  imageSrcSmall: "/card-art/96x96/stegowulf.png",
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
  text: "If Stegowulf attacks with no creatures behind, it deals +2 damage.\n\nStegowulf has a 20% chance of evading attacks.",
})

cards.push({
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
  text: "Scry 3. Draw 1. Take 3 damage.",
})

cards.push({
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
  text: "Return the front creature in target row to its owner's hand.",
})

cards.push({
  name: "Sonic Dragon",
  imageSrcSmall: "/card-art/96x96/sonicDragon.png",
  imageSrcLarge: "/card-art/512x512/sonicDragon.png",
  imageCenterYPercent: 30,
  rarity: "uncommon",
  complete: false,
  energyType: "air",
  cardType: "creature",
  attack: 5,
  health: 5,
  cost: {
    neutral: 4,
    fire: 0,
    water: 0,
    earth: 0,
    air: 1,
  },
  text: "Support: 20% chance to stun the front enemy creature in this row.",
  keywords: ["support"],
})

cards.push({
  name: "Cave Swimmer",
  imageSrcSmall: "/card-art/96x96/caveSwimmer.png",
  imageSrcLarge: "/card-art/512x512/caveSwimmer.png",
  imageCenterYPercent: 70,
  rarity: "uncommon",
  complete: true,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  text: "Support: has a 10% chance of drawing a card.",
  keywords: ["support"],
})

cards.push({
  name: "Darkwoods Hyena",
  imageSrcSmall: "/card-art/96x96/darkwoodsHyena.png",
  imageSrcLarge: "/card-art/512x512/darkwoodsHyena.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 2,
  health: 3,
  cost: {
    neutral: 2,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: "Support: has a 50% chance to gain +1 attack.",
  keywords: ["support"],
})

cards.push({
  name: "Monstrous Flamebeast",
  imageSrcSmall: "/card-art/96x96/monstrousFlamebeast.png",
  imageSrcLarge: "/card-art/512x512/monstrousFlamebeast.png",
  imageCenterYPercent: 40,
  rarity: "uncommon",
  complete: true,
  energyType: "fire",
  cardType: "creature",
  attack: 4,
  health: 3,
  cost: {
    neutral: 3,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: "Trample",
  keywords: ["trample"],
})

cards.push({
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
  text: "Put 2 random cards from your graveyard to your hand.",
})

cards.push({
  name: "Canyon Burrower",
  imageSrcSmall: "/card-art/96x96/canyonBurrower.png",
  imageSrcLarge: "/card-art/512x512/canyonBurrower.png",
  imageCenterYPercent: 30,
  rarity: "common",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: "When Canyon Burrower attacks, 30% chance for opposing creature to miss.",
})

cards.push({
  name: "Dragon Cub",
  imageSrcSmall: "/card-art/96x96/dragonCub.png",
  imageSrcLarge: "/card-art/512x512/dragonCub.png",
  imageCenterYPercent: 30,
  rarity: "base",
  complete: true,
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
  text: "Support: 30% chance to burn opposing creature.",
  keywords: ["support"],
})

cards.push({
  name: "Glikki Forager",
  imageSrcSmall: "/card-art/96x96/glikkiTracker.png",
  imageSrcLarge: "/card-art/512x512/glikkiTracker.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: false,
  energyType: "multi",
  cardType: "creature",
  attack: 2,
  health: 3,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 1,
  },
  text: "When Glikki Forager enters the battlefield, scry 1. Support: 25% chance to give +1 heath to every creature you control in this row ",
  keywords: ["support"],
})

cards.push({
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
  text: "When played: draw 2 cards. When Hydrus, Seaborn Titan attacks, heal your hero equal to the number of cards in your hand.",
})

cards.push({
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
  text: "Support: deal 1 damage to a random enemy creature.",
  keywords: ["support"],
})

cards.push({
  name: "Brash Splasher",
  imageSrcSmall: "/card-art/96x96/brashSplasher.png",
  imageSrcLarge: "/card-art/512x512/brashSplasher.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: true,
  energyType: "water",
  cardType: "creature",
  attack: 2,
  health: 1,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  text: "When Brash Splasher attacks, 50% chance to draw a card.",
})
cards.push({
  name: "Joltbird Agent",
  imageSrcSmall: "/card-art/96x96/joltbirdAgent.png",
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
  text: "Support: 20% chance to stun a random enemy creature.",
  keywords: ["support"],
})

cards.push({
  name: "Something Bandit",
  imageSrcSmall: "/card-art/96x96/somethingBandit.png",
  imageSrcLarge: "/card-art/512x512/somethingBandit.png",
  imageCenterYPercent: 50,
  rarity: "common",
  complete: true,
  energyType: "water",
  cardType: "creature",
  attack: 3,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
})
cards.push({
  name: "Zardian Raider",
  imageSrcSmall: "/card-art/96x96/zardianRaider.png",
  imageSrcLarge: "/card-art/512x512/zardianRaider.png",
  imageCenterYPercent: 40,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 3,
  health: 3,
  cost: {
    neutral: 3,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})
cards.push({
  name: "Something Captain",
  imageSrcSmall: "/card-art/96x96/somethingCaptain.png",
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
cards.push({
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
  text: "When Ilstrom, Tidal Inferno enters the battlefield, deal 2 damage to the opponent. Support: if you have 3 or more creatures in play, 50% chance for opponent to discard a random card.",
})
cards.push({
  name: "Helix Stag",
  imageSrcSmall: "/card-art/96x96/helixStag.png",
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
  text: "When Helix Stag enters the battlefield, all friendly creatures gain +1 health.",
})
cards.push({
  name: "Bonehide Mole",
  imageSrcSmall: "/card-art/96x96/bonehideMole.png",
  imageSrcLarge: "/card-art/512x512/bonehideMole.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  keywords: ["shield"],
  text: "Shield",
})
cards.push({
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
  text: "Summon a 1/1 beast in the other lane ",
})
cards.push({
  name: "Huddolin",
  imageSrcSmall: "/card-art/96x96/huddolin.png",
  imageSrcLarge: "/card-art/512x512/huddolin.png",
  imageCenterYPercent: 50,
  rarity: "common",
  complete: false,
  energyType: "earth",
  cardType: "creature",
  attack: 2,
  health: 2,
  cost: {
    neutral: 1,
    fire: 0,
    water: 0,
    earth: 1,
    air: 0,
  },
  text: "When Huddolin enters the battlefield, give +1 health to a random friendly creature.",
})
cards.push({
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
cards.push({
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
  text: "Deal 3 damage to the front enemy in target row.",
})

cards.push({
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
  text: "Trample. Before Saurongar the Smotherer attacks, add burn 1 to each enemy creature in this row.",
})
cards.push({
  name: "Time Collapse",
  imageSrcSmall: "/card-art/96x96/timeCollapse.png",
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
cards.push({
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
  text: "Support: Add +1 burn to a random enemy creature.",
})
cards.push({
  name: "Emerald Makasaur",
  imageSrcSmall: "/card-art/96x96/emeraldMakasaur.png",
  imageSrcLarge: "/card-art/512x512/emeraldMakasaur.png",
  imageCenterYPercent: 60,
  rarity: "base",
  complete: true,
  energyType: "neutral",
  cardType: "creature",
  attack: 4,
  health: 4,
  cost: {
    neutral: 4,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})
cards.push({
  name: "Dazzling Fennec",
  imageSrcSmall: "/card-art/96x96/dazzlingFennec.png",
  imageSrcLarge: "/card-art/512x512/dazzlingFennec.png",
  imageCenterYPercent: 50,
  rarity: "uncommon",
  complete: false,
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
})
cards.push({
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
  text: "Support: 5% chance to deal 3 damage to each enemy creature in this row.",
})
cards.push({
  name: "Red Crab Brawler",
  imageSrcSmall: "/card-art/96x96/redCrabBrawler.png",
  imageSrcLarge: "/card-art/512x512/redCrabBrawler.png",
  imageCenterYPercent: 45,
  rarity: "uncommon",
  complete: false,
  energyType: "water",
  cardType: "creature",
  attack: 3,
  health: 2,
  cost: {
    neutral: 2,
    fire: 0,
    water: 1,
    earth: 0,
    air: 0,
  },
  keywords: ["shield"],
  text: "Shield",
})
cards.push({
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

cards.push({
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
  text: "Before Pike Lancer attacks, deal 2 damage to the opposing creature.",
})

cards.push({
  name: "Hyllophant",
  imageSrcSmall: "/card-art/96x96/hyllophant.png",
  imageSrcLarge: "/card-art/512x512/hyllophant.png",
  imageCenterYPercent: 55,
  rarity: "common",
  complete: false,
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
})

cards.push({
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
  text: "Whenever you play a card, give friendly attacking creature in this row +1 health.",
})

cards.push({
  name: "Moltsteed Racer",
  imageSrcSmall: "/card-art/96x96/moltsteedRacer.png",
  imageSrcLarge: "/card-art/512x512/moltsteedRacer.png",
  imageCenterYPercent: 55,
  rarity: "uncommon",
  complete: false,
  energyType: "fire",
  cardType: "creature",
  attack: 3,
  health: 2,
  cost: {
    neutral: 2,
    fire: 1,
    water: 0,
    earth: 0,
    air: 0,
  },
  text: "Charge",
})

cards.push({
  name: "Volcanic Shellster",
  imageSrcSmall: "/card-art/96x96/volcanicShellster.png",
  imageSrcLarge: "/card-art/512x512/volcanicShellster.png",
  imageCenterYPercent: 65,
  rarity: "uncommon",
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
})

// Used https://www.iloveimg.com/ for image resizing

// Ideas
// - When this creature takes damage, restore it to full health (Mythic?)
// - cards (in target row?) fight until they can't any more
// - fire attack: 2 mana, 3 damage to something
// - wind: Target creature in an inactive slot swaps places with the active slot
// - wind: destroy monument
// - earth: monument, gives all creatures +2 health
// - blue: draw cards
// - green: lil guys
// - green: deathrattle
// - red: attack buff

export const cardDataMap: Record<CardName, CardData> = cards.reduce((cardsByName, card) => {
  cardsByName[card.name] = card
  return cardsByName
}, {} as Record<string, CardData>)
