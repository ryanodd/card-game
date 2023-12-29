import { ReactNode } from "react"

export type MainViewProps = {
  children: ReactNode
}

// Purpose is to fill the viewport
export const MainView = ({ children }: MainViewProps) => {
  return <main className="w-screen h-screen relative overflow-hidden">{children}</main>
}
