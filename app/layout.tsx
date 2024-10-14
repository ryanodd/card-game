import "./globals.css"
import { Noto_Sans } from "next/font/google"

const volkhorn = Noto_Sans({ subsets: ["latin"], variable: "--font-volkhorn" })

export const metadata = {
  title: "Card Game",
  description: "by Ryan Odd",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={volkhorn.className}>{children}</body>
    </html>
  )
}
