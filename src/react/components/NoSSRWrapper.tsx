import dynamic from "next/dynamic"
import { type ReactNode } from "react"

type NoSSRWrapperProps = {
  children: ReactNode
}
const NoSSRWrapperComponent = (props: NoSSRWrapperProps) => {
  return <>{props.children}</>
}

export const NoSSRWrapper = dynamic(() => Promise.resolve(NoSSRWrapperComponent), {
  ssr: false,
})
