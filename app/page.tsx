"use client"

import { NoSSRWrapper } from "@/src/react/components/NoSSRWrapper"
import { Game } from "@/src/react/screens/Game"

export default function Home() {
  return (
    <NoSSRWrapper>
      <Game />
    </NoSSRWrapper>
    // TODO since SSR is off for the actual game, put some flashy SSR-able content here
  )
}
