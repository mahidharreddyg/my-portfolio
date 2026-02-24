import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Plus_Jakarta_Sans } from "next/font/google"
import localFont from "next/font/local"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`min-h-screen bg-background font-sans antialiased overflow-x-hidden ${jakarta.className} ${malinton.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}