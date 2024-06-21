export type HeroData = {
  id: string
  name: string
  imageSrc: string
}

export const hero1: HeroData = {
  id: "hero1",
  name: "Protagonist Name lol",
  imageSrc: "/card-art/hero4.png",
}

export const hero2: HeroData = {
  id: "hero2",
  name: "Antagonist Name lol",
  imageSrc: "/card-art/hero3.png",
}

export const heroDataMap: Record<string, HeroData> = {
  hero1,
  hero2,
}
