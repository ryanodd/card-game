import { ReactNode } from "react"
import { MobileUnsupportedOverlay } from "./MobileUnsupportedOverlay"

export type MainViewProps = {
  children: ReactNode
}

// Purpose is to fill the viewport
export const MainView = ({ children }: MainViewProps) => {
  return (
    <main className="w-screen h-screen relative overflow-hidden">
      {children}
      <MobileUnsupportedOverlay />
    </main>
  )
}
