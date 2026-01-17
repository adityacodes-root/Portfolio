"use client"

import type React from "react"
import { Cloud, Menu, Github, Linkedin, Home, User, Briefcase, Code, FolderOpen, MessageSquare, Star, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "#hero", label: "Home", icon: <Home className="h-4 w-4" /> },
  { href: "#about", label: "About", icon: <User className="h-4 w-4" /> },
  { href: "#experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { href: "#skills", label: "Skills", icon: <Code className="h-4 w-4" /> },
  { href: "#projects", label: "Projects", icon: <FolderOpen className="h-4 w-4" /> },
  { href: "#testimonials", label: "Testimonials", icon: <Star className="h-4 w-4" /> },
  { href: "#contact", label: "Contact", icon: <MessageSquare className="h-4 w-4" /> },
]

export function Header() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "hero"
      const scrollPosition = window.scrollY + window.innerHeight / 3

      navLinks.forEach((link) => {
        const element = document.getElementById(link.href.substring(1))
        if (element) {
          const elementTop = element.offsetTop
          const elementBottom = elementTop + element.offsetHeight
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = link.href.substring(1)
          }
        }
      })

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSection = navLinks[navLinks.length - 1].href.substring(1)
      }
      if (window.scrollY < 100) {
        currentSection = "hero"
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      setTimeout(() => {
        const element = document.getElementById(href.substring(1))
        if (element) {
          // Get the element's position relative to the viewport
          const rect = element.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          // Responsive offset: smaller for desktop, larger for mobile
          const offset = window.innerWidth >= 768 ? 30 : 50
          const targetPosition = scrollTop + rect.top - offset
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
          setIsSheetOpen(false)
        }
      }, 100) // Small delay to ensure DOM is ready
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, "#hero")} 
          className="group mr-4 sm:mr-6 flex items-center space-x-2"
        >
          <div className="relative">
            <Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[2px] group-hover:bg-primary/20 transition-all duration-300" />
          </div>
          <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-foreground/90 group-hover:to-foreground transition-all duration-300">Aditya</span>
        </a>
        <nav className="hidden gap-4 sm:gap-6 text-sm xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={cn(
                "group relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-card/50",
                activeSection === link.href.substring(1) 
                  ? "text-primary bg-primary/10 shadow-sm pointer-events-auto" 
                  : "text-muted-foreground hover:text-foreground pointer-events-auto"
              )}
              onClick={(e) => { e.preventDefault(); handleLinkClick(e, link.href); }}
            >
              {link.label}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="desktopActiveIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg -z-10 pointer-events-none"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                />
              )}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2 min-w-0 flex-shrink flex-nowrap">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <a href="https://github.com/adityacodes-root" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <a href="https://www.linkedin.com/in/aditya-dubey-438a11301/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10" aria-label="Resume">
            <a href="/AdityaDubey_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="h-5 w-5" />
            </a>
          </Button>
          <div className="relative flex items-center gap-2">
            <span className="text-[10px] font-pixel text-primary bg-background/95 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-primary/20 shadow-sm whitespace-nowrap">
              try! <span className="inline-block ml-0.5">→</span>
            </span>
            <ThemeToggle />
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="group flex xl:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] p-0 border-l bg-background/95 backdrop-blur-sm [&>button]:hidden"
              aria-label="Navigation menu"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Use this menu to navigate through different sections of the website
                </SheetDescription>
              </SheetHeader>
              
              <div className="flex flex-col h-full">
                {/* Top Section with Social and Theme */}
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 border border-border/50">
                      <a href="https://github.com/adityacodes-root" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 border border-border/50">
                      <a href="https://www.linkedin.com/in/adityacodes-root" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8" aria-label="View Resume">
                      <a href="/AdityaDubey_Resume.pdf" target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4" />
                      </a>
                    </Button>
                    <div className="h-8 w-8 border border-border/50 rounded-md flex items-center justify-center hover:bg-primary/10">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-2" role="navigation" aria-label="Main navigation">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200",
                        activeSection === link.href.substring(1)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                      )}
                      aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                    >
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                        activeSection === link.href.substring(1)
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      )}>
                        {link.icon}
                      </div>
                      <span className="font-medium text-xs">{link.label}</span>
                    </motion.a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
