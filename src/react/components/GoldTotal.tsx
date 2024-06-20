export type GoldTotalProps = {
  value: number
}

export const GoldTotal = ({ value }: GoldTotalProps) => {
  return (
    <div className="bg-stone-700 bg-opacity-50 rounded-md px-2 py-1">
      <span>Gold: {value}</span>
    </div>
  )
}
