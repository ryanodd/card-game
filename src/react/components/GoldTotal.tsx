import { Coins } from "./designSystem/Icon"

export type GoldTotalProps = {
  value: number
}

export const GoldTotal = ({ value }: GoldTotalProps) => {
  return (
    <div className="">
      <span className=" flex items-center text-3xl text-stone-50 text-outline">
        <Coins size="lg" /> {value}
      </span>
    </div>
  )
}
