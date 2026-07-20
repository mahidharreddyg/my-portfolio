import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Preloader from "@/components/Preloader"
import SmoothScroll from "@/components/SmoothScroll"
import { Plus_Jakarta_Sans, JetBrains_Mono, Space_Grotesk, DM_Sans, Syne, Outfit } from "next/font/google"
import localFont from "next/font/local"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const malinton = localFont({
  src: "./fonts/Malinton Font/MalintontrialversionExtbd-5y9Wj.otf",
  variable: "--font-malinton",
  display: "swap",
})

export const metadata = {
  title: "Portfolio - Mahidhar",
  description: "Software Developer Portfolio",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="relative" suppressHydrationWarning>
      <body className={`relative min-h-screen bg-background font-sans antialiased ${jakarta.className} ${malinton.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${syne.variable} ${outfit.variable} selection:bg-blue-500/30 w-full`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScroll>
            <Preloader />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}