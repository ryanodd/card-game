import { CardData } from "./CardData"
import { CardName } from "./CardName"

let cards: CardData[] = []

cards.push({
  name: "Fire Energy",
  imageSrc: "/card-art/energyFire.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: true,
  energyType: "fire",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Water Energy",
  imageSrc: "/card-art/energyWater.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: true,
  energyType: "water",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Earth Energy",
  imageSrc: "/card-art/energyEarth.png",
  imageCenterYPercent: 53,
  rarity: "base",
  complete: true,
  energyType: "earth",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Air Energy",
  imageSrc: "/card-art/energyAir.png",
  imageCenterYPercent: 50,
  rarity: "base",
  complete: true,
  energyType: "air",
  cardType: "energy",
  cost: {
    neutral: 0,
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
  },
})

cards.push({
  name: "Golden Friend",
  imageSrc: "/card-art/goldenFriend.png",
  imageCenterYPercent: 55,
  rarity: "common",
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
  imageSrc: "/card-art/bedOfSnakes.png",
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
  imageSrc: "/card-art/emberFoxling.png",
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
  imageSrc: "/card-art/wingedBull.png",
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
  imageSrc: "/card-art/greenwingCaller.png",
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
  imageSrc: "/card-art/elderSaurus.png",
  imageCenterYPercent: 45,
  rarity: "common",
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
  imageSrc: "/card-art/vengefulFlamewing.png",
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
  imageSrc: "/card-art/sludgeAmphibian.png",
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
  imageSrc: "/card-art/merfinYodeler.png",
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
  imageSrc: "/card-art/spiritGiant.png",
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
  imageSrc: "/card-art/fairyBuckFly.png",
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
  imageSrc: "/card-art/nyrethLightEater.png",
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
  imageSrc: "/card-art/komodoTeacher.png",
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
  imageSrc: "/card-art/livingHillside.png",
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
  imageSrc: "/card-art/stegowulf.png",
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
  imageSrc: "/card-art/eerieVision.png",
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
  imageSrc: "/card-art/startle.png",
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
  imageSrc: "/card-art/sonicDragon.png",
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
  imageSrc: "/card-art/caveSwimmer.png",
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
  imageSrc: "/card-art/darkwoodsHyena.png",
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
  imageSrc: "/card-art/monstrousFlamebeast.png",
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
  imageSrc: "/card-art/ancestralPresence.png",
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
  imageSrc: "/card-art/canyonBurrower.png",
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
  imageSrc: "/card-art/dragonCub.png",
  imageCenterYPercent: 30,
  rarity: "common",
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
  imageSrc: "/card-art/glikkiTracker.png",
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
  imageSrc: "/card-art/hydrusSeabornTitan.png",
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
  imageSrc: "/card-art/flameSentinel.png",
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
  imageSrc: "/card-art/brashSplasher.png",
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
  imageSrc: "/card-art/joltbirdAgent.png",
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
  imageSrc: "/card-art/somethingBandit.png",
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
  name: "Something Raider",
  imageSrc: "/card-art/somethingRaider.png",
  imageCenterYPercent: 40,
  rarity: "common",
  complete: false,
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
  imageSrc: "/card-art/somethingCaptain.png",
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
  imageSrc: "/card-art/ilstromTidalInferno.png",
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
  imageSrc: "/card-art/helixStag.png",
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
  imageSrc: "/card-art/bonehideMole.png",
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
  imageSrc: "/card-art/neojiaTamer.png",
  imageCenterYPercent: 44,
  rarity: "rare",
  complete: false,
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
})
cards.push({
  name: "Huddolin",
  imageSrc: "/card-art/huddolin.png",
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
  imageSrc: "/card-art/opalDrakeThrasher.png",
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
  imageSrc: "/card-art/smolderingShot.png",
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
  imageSrc: "/card-art/saurongarTheSmotherer.png",
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
  imageSrc: "/card-art/timeCollapse.png",
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
  imageSrc: "/card-art/fairyArsonist.png",
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
  imageSrc: "/card-art/emeraldMakasaur.png",
  imageCenterYPercent: 60,
  rarity: "common",
  complete: false,
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
  imageSrc: "/card-art/dazzlingFennec.png",
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
  imageSrc: "/card-art/astralCaller.png",
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
  imageSrc: "/card-art/redCrabBrawler.png",
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
  imageSrc: "/card-art/sicklehornGrazer.png",
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
  imageSrc: "/card-art/pikeLancer.png",
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
  imageSrc: "/card-art/hyllophant.png",
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
  imageSrc: "/card-art/violetSagebeast.png",
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
