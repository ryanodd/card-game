import { Keyword, keywordDescriptions } from "@/src/game/cards/CardData"
import styles from "./KeywordInfoBox.module.css"

export type KeywordInfoBoxProps = {
  keyword: Keyword
}

export const KeywordInfoBox = ({ keyword }: KeywordInfoBoxProps) => {
  return (
    <div className={styles.keywordInfoBox}>
      <h4 className={styles.keywordInfoBoxTitle}>{keyword}</h4>
      <p className={styles.keywordInfoBoxDescription}>{keywordDescriptions[keyword]}</p>
    </div>
  )
}

export type KeywordInfoBoxColumnProps = {
  keywords: Keyword[]
}

export const KeywordInfoBoxColumn = ({ keywords }: KeywordInfoBoxColumnProps) => {
  return (
    <div className={styles.keywordsColumn}>
      {keywords?.map((keyword, i) => (
        <KeywordInfoBox key={i} keyword={keyword} />
      ))}
    </div>
  )
}
