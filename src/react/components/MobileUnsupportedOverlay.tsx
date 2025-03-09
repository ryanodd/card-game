import { NoMobile } from "./designSystem/Icon"
import styles from "./MobileUnsupportedOverlay.module.css"

export const MobileUnsupportedOverlay = () => {
  return (
    <div className={styles.mobileUnsupportedOverlay}>
      <NoMobile size="4xl" />
      <h1 className={styles.mobileUnsupportedText}>This screen size is unsupported. Please play on a computer.</h1>
    </div>
  )
}
