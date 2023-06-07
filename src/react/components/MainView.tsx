import { ReactNode } from "react"

export type MainViewProps = {
  children: ReactNode
}

// Purpose is to fill the viewport
export const MainView = ({ children }: MainViewProps) => {
  return <main className="w-full h-full relative overflow-hidden">{children}</main>
}
