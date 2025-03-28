import Image from "next/image"
import styles from "./GameBackground.module.css"
import Background from "/public/backgrounds/background3.jpg"

// Other ideas:
// - https://codepen.io/yuanchuan/pen/wZJqNK
// - https://codepen.io/sarazond/pen/LYGbwj

export const GameBackground = () => {
  return (
    <div className={`${styles.gameBackground} -z-10`}>
      <Image
        width={1920}
        height={1034}
        className={styles.gameBackgroundImage}
        src={Background}
        alt="Background"
        placeholder="blur"
      />
      <div className={`${styles.gameBackgroundfilterLayer} `} />
    </div>
  )
}
