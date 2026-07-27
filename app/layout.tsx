import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Preloader from "@/components/Preloader"
import SmoothScroll from "@/components/SmoothScroll"
import {
  Plus_Jakarta_Sans, JetBrains_Mono, Space_Grotesk, DM_Sans, Syne, Outfit, Caveat,
  Noto_Sans_Telugu, Noto_Sans_Tamil, Noto_Sans_Kannada, Noto_Sans_Devanagari,
} from "next/font/google"
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

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

const malinton = localFont({
  src: "./fonts/Malinton Font/MalintontrialversionExtbd-5y9Wj.otf",
  variable: "--font-malinton",
  display: "swap",
})

// Real Unicode font files for the preloader's multi-language greeting —
// relying on whatever system fallback happens to be installed silently
// drops scripts that aren't covered (this was why "not all languages"
// were actually showing up).
const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["700"],
  variable: "--font-noto-telugu",
  display: "swap",
})
const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["700"],
  variable: "--font-noto-tamil",
  display: "swap",
})
const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["700"],
  variable: "--font-noto-kannada",
  display: "swap",
})
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["700"],
  variable: "--font-noto-devanagari",
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
      <body className={`relative min-h-screen bg-background font-sans antialiased ${jakarta.variable} ${malinton.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${syne.variable} ${outfit.variable} ${caveat.variable} ${notoTelugu.variable} ${notoTamil.variable} ${notoKannada.variable} ${notoDevanagari.variable} selection:bg-blue-500/30 w-full`}>
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