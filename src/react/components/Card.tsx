import { cardDataMap } from "@/src/game/Cards"
import { CardState } from "@/src/game/DuelData"
import styles from "./Card.module.css"
import Image from "next/image"

export type CardProps = {
  cardState: CardState
}

export const Card = ({ cardState }: CardProps) => {
  const cardData = cardDataMap[cardState.number]
  return (
    <div className={`${styles.card_size} ${styles.card_border} bg-slate-300 relative p-1`}>
      <div className={`${styles.image_border} relative`}>
        <Image src={cardData.imageSrc} alt={cardData.name} width={512} height={512} />
      </div>
      <div className="w-5 h-6 rounded-tr-md bg-red-500 absolute bottom-0 left-0 flex justify-center align-center">
        <h2 className="">{cardData.attack}</h2>
      </div>
      <div className="w-5 h-6 rounded-tl-md bg-sky-400 absolute bottom-0 right-0 flex justify-center align-center">
        <h2 className="">{cardData.health}</h2>
      </div>
    </div>
  )
}
