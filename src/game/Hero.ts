export type HeroData = {
  id: string
  name: string
  stats: {
    health: number
    speed: number // Determines who goes first
  }
  imageSrc: string
}

export const hero1: HeroData = {
  id: "hero1",
  name: "Protagonist Name lol",
  stats: {
    health: 25,
    speed: 50,
  },
  imageSrc: "/card-art/hero4.png",
}

export const hero2: HeroData = {
  id: "hero2",
  name: "Antagonist Name lol",
  stats: {
    health: 25,
    speed: 49,
  },
  imageSrc: "/card-art/hero3.png",
}

export const heroDataMap: Record<string, HeroData> = {
  hero1,
  hero2,
}
