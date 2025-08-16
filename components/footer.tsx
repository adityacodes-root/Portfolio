"use client"

import type React from "react"
import { Cloud } from "lucide-react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer className="py-8 md:px-8 border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center space-x-2">
          <Cloud className="h-5 w-5 text-primary" />
          <span className="font-semibold">Aditya</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Aditya. Made with ❤️.
        </p>
      </div>
    </footer>
  )
}
