import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react"
import styles from "./Button.module.css"

type Props = {
  children?: ReactNode
  "data-size"?: "small" | "large"
  "data-variant"?: "primary" | "secondary" | "destructive" | "tertiary"
  "data-loading"?: boolean
  "data-icon-only"?: boolean
  notificationDotText?: string
}

export type ButtonProps = ComponentPropsWithoutRef<"button"> & Props

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, notificationDotText, children, ...restProps }, ref) => {
    return (
      <button ref={ref} {...restProps} className={`${styles.button} ${className ?? ""}`}>
        {children}
        {notificationDotText && <span className={styles.buttonNotificationDot}>{notificationDotText}</span>}
      </button>
    )
  }
)

Button.displayName = "Button"
