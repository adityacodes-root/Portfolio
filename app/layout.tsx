import type React from "react"
import type { Metadata } from "next"
import Script from "next/script" 
import { Inter, Outfit, Press_Start_2P } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import { Loader } from "@/components/loader"
import { CursorWrapper } from "@/components/cursor-wrapper"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
})

const pressStart2P = Press_Start_2P({ 
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Aditya | Cloud & Software Engineer",
  description: "Portfolio of Aditya, a software engineer specializing in cloud computing, full-stack development, and modern web technologies.",
  keywords: [
    "software engineer",
    "cloud engineer",
    "full-stack developer",
    "web development",
    "cloud computing",
    "AWS",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
    "Jio",
  ],
  authors: [{ name: "Aditya" }],
  creator: "Aditya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityacodes.in",
    title: "Aditya | Cloud & Software Engineer",
    description: "Portfolio of Aditya, a software engineer specializing in cloud computing, full-stack development, and modern web technologies.",
    siteName: "Aditya's Portfolio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg?t=" + Date.now(), type: "image/svg+xml" },
      { url: "/favicon.ico?t=" + Date.now(), type: "image/x-icon" }
    ],
    shortcut: "/icon.svg?t=" + Date.now(),
    apple: "/icon.svg?t=" + Date.now(),
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 0.8,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d19a3d8c-3418-4e07-a759-4d25f6b4ebb9"
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${pressStart2P.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="ocean"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
          themes={[
            "light",
            "dark",
            "blue-gray",
            "deep-dark",
            "sunset",
            "forest",
            "ocean",
            "midnight"
          ]}
        >
          <CursorWrapper />
          <Loader />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" closeButton richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
