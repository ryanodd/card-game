import { useState } from "react"
import { Button } from "../designSystem/Button"
import styles from "./EditableDeckTitle.module.css"
import { Check, Close, Pencil } from "../designSystem/Icon"

export type EditableDeckTitleProps = {
  title: string
  onRename: (newTitle: string) => void
}

export const EditableDeckTitle = ({ title, onRename }: EditableDeckTitleProps) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState<string>(title)

  const onSaveClick = () => {
    onRename(value)
    setEditing(false)
  }

  if (editing) {
    return (
      <form className={styles.deckTitleContainer} onSubmit={onSaveClick}>
        <input
          className={styles.deckTitleInput}
          value={value}
          onInput={(event) => {
            setValue(event.currentTarget.value)
          }}
        />
        <Button data-variant="tertiary" data-icon-only onClick={onSaveClick}>
          <Check />
        </Button>
        <Button
          data-variant="tertiary"
          data-icon-only
          onClick={() => {
            setValue(title)
            setEditing(false)
          }}
        >
          <Close />
        </Button>
      </form>
    )
  }

  return (
    <div className={styles.deckTitleContainer}>
      <h2 className={styles.deckTitle}>{title}</h2>
      <Button
        className={styles.editDeckButton}
        data-variant="tertiary"
        data-icon-only
        onClick={() => {
          setEditing(true)
        }}
      >
        <Pencil />
      </Button>
    </div>
  )
}
