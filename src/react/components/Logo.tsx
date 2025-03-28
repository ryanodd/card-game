import Image from "next/image"
import Background from "/public/images/logo.jpg"
import styles from "./Logo.module.css"

export const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Image
        width={640}
        height={345}
        className={styles.logoImage}
        src={Background}
        alt="Background"
        placeholder="blur"
      />
    </div>
  )
}
