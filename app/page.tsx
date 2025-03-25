"use client"

import { NoSSRWrapper } from "@/src/react/components/NoSSRWrapper"
import { Game } from "@/src/react/screens/Game"

export default function Home() {
  return (
    // <NoSSRWrapper> does it cause any bugs? Performance problems?
    <Game />
  )
}
