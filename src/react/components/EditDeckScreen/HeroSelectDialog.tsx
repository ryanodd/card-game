import * as Dialog from "@radix-ui/react-dialog"
import styles from "./HeroSelect.module.css"

import { ReactNode, useEffect, useState } from "react"
import { Button } from "../designSystem/Button"
import { Close } from "../designSystem/Icon"

export type HeroSelectDialogProps = Dialog.DialogProps & {
  trigger: ReactNode
  content: ReactNode
}

export const HeroSelectDialog = ({ trigger, content, ...props }: HeroSelectDialogProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.heroDialogOverlay}`} />

        <Dialog.Content className={styles.heroDialogContent}>
          <div className={styles.heroDialogTitleRow}>
            <div></div>
            <Dialog.Title className={styles.heroDialogTitle}>Select Hero</Dialog.Title>
            <Dialog.Close asChild>
              <Button className={`${styles.heroDialogCloseButton}`} data-variant="tertiary" data-icon-only>
                <Close />
              </Button>
            </Dialog.Close>
          </div>
          {content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
