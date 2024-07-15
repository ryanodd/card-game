import * as RadixCheckbox from "@radix-ui/react-checkbox"
import styles from "./Checkbox.module.css"
import { ReactNode } from "react"

export type CheckboxProps = {
  id: string
  labelContent: ReactNode
  checked: boolean
  onClick: (checked: boolean) => void
}

export const Checkbox = ({ id, labelContent, checked, onClick }: CheckboxProps) => {
  return (
    <div className={styles.checkboxRow}>
      <RadixCheckbox.Root
        checked={checked}
        onCheckedChange={(checked) => {
          onClick(checked === true)
        }}
        className={styles.checkboxRoot}
        defaultChecked
        id={id}
      >
        <RadixCheckbox.Indicator className={styles.checkboxIndicator}>
          <div className={styles.checkboxCheckmarkIcon} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className={styles.checkboxLabel} htmlFor={id}>
        {labelContent}
      </label>
    </div>
  )
}
