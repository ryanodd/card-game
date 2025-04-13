import * as Dialog from "@radix-ui/react-dialog"
import styles from "../designSystem/Dialog.module.css"
import { useGameStore } from "../../hooks/useGameStore"
import { ReactNode, useEffect, useState } from "react"
import { Button } from "../designSystem/Button"
import { Close } from "../designSystem/Icon"

export type DefaultDialogProps = Dialog.DialogProps & {
  title: ReactNode
  trigger: ReactNode
  content: ReactNode
}

export const DefaultDialog = ({ trigger, content, title, ...props }: DefaultDialogProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content
          className={styles.dialogContent}
          onPointerDownOutside={(event) => {
            event?.preventDefault()
          }}
          data-size="md"
        >
          <Dialog.Close asChild>
            <Button className={`${styles.dialogCloseButton}`} data-variant="tertiary" data-icon-only>
              <Close />
            </Button>
          </Dialog.Close>
          <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
          {content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
