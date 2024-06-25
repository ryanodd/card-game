import styles from "./GameBackground.module.css"

// Other ideas:
// - https://codepen.io/yuanchuan/pen/wZJqNK
// - https://codepen.io/sarazond/pen/LYGbwj

export const GameBackground = () => {
  return <div className={`${styles.gameBackground} absolute-fill -z-10`}></div>
}
