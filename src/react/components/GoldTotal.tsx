export type GoldTotalProps = {
  value: number
}

export const GoldTotal = ({ value }: GoldTotalProps) => {
  return (
    <div className=" ">
      <span className="text-xl text-outline">Gold: {value}</span>
    </div>
  )
}
