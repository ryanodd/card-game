import styles from "./Card.module.css"

export const CardBackTexture = () => {
  return (
    <div
      className={`${styles.card_size} ${styles.card_border} shrink-0 bg-gradient-to-tr from-stone-800 via-stone-600 to-stone-500`}
    ></div>
  )
}
