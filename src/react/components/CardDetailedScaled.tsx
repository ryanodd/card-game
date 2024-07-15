import { ReactNode, useRef, useState } from "react"

export type CardDetailedScaledProps = {
  scale: number
  children: ReactNode
}

// TODO I guess this could apply to more than just CardDetailed... Make this generic
export const CardDetailedScaled = ({ scale, children }: CardDetailedScaledProps) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  return (
    <div style={{ position: "relative", width, height }}>
      <div
        ref={(ref) => {
          setWidth(ref ? ref.clientWidth * scale : 0)
          setHeight(ref ? ref.clientHeight * scale : 0)
        }}
        style={{
          position: "absolute",
          transform: `scale(${scale.toString()}) translate(-${50 / scale}%, -${50 / scale}%)`,
          top: "50%",
          left: "50%",
        }}
      >
        {children}
      </div>
    </div>
  )
}
