import "@/app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kink Society",
  description: "21+ NSFW | Adult Content & Tech",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  )
}
