import { CardBackTexture } from "../Card/CardBackTexture"

export const DeckPile = () => {
  return (
    <button className="relative bg-stone-800 border-r-stone-800 border-r-2 border-b-stone-800 border-b-8 rounded-lg">
      <CardBackTexture />
    </button>
  )
}
