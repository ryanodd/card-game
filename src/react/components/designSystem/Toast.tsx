import * as RadixToast from "@radix-ui/react-toast"
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"

import styles from "./Toast.module.css"
import { Close } from "./Icon"
import { Button } from "./Button"

export type ToastProviderProps = RadixToast.ToastProviderProps

export const ToastProvider = ({ ...props }: ToastProviderProps) => {
  return <RadixToast.Provider {...props} />
}

export type ToastViewportProps = RadixToast.ToastViewportProps

export const ToastViewport = forwardRef<HTMLOListElement, ToastViewportProps>(({ ...props }, ref) => {
  return <RadixToast.Viewport className={styles.toastViewport} ref={ref} {...props} />
})

ToastViewport.displayName = "ToastViewport"

export type ToastProps = RadixToast.ToastProps & {
  toastTitle: ReactNode
  toastDescription?: ReactNode
  toastAction?: ReactNode
}

export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  ({ toastTitle, toastDescription, toastAction, ...props }, ref) => {
    return (
      <RadixToast.Root className={styles.toast} ref={ref} {...props}>
        <RadixToast.Title className={styles.toastTitle}>{toastTitle}</RadixToast.Title>
        {toastDescription && (
          <RadixToast.Description className={styles.toastDescription} asChild>
            {toastDescription}
          </RadixToast.Description>
        )}
        {toastAction && (
          <RadixToast.Action className={styles.toastAction} asChild altText="Toast action">
            {toastAction}
          </RadixToast.Action>
        )}
        <RadixToast.Close asChild>
          <Button data-variant="tertiary" data-icon-only>
            <Close />
          </Button>
        </RadixToast.Close>
      </RadixToast.Root>
    )
  }
)

Toast.displayName = "Toast"
