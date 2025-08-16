"use client"

import * as React from "react"
import { 
  Sun, 
  Moon, 
  Droplet, 
  Sparkles, 
  CloudSun, 
  Trees, 
  Waves, 
  Star,
  Check 
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "blue-gray", label: "Blue Gray", icon: Droplet },
  { value: "deep-dark", label: "Deep Dark", icon: Sparkles },
  { value: "sunset", label: "Sunset", icon: CloudSun },
  { value: "forest", label: "Rainforest", icon: Trees },
  { value: "ocean", label: "Ocean", icon: Waves },
  { value: "midnight", label: "Midnight", icon: Star },
] as const

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  // Ensure we only render after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Find the current theme or default to the first theme
  const currentTheme = themes.find((t) => t.value === theme) || themes[0]
  const Icon = currentTheme.icon

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === theme || isAnimating) return

    setIsAnimating(true)

    // Close dropdown immediately
    setOpen(false)

    // Let overlay show before theme flips
    window.dispatchEvent(new Event('theme:aboutToChange'))

    // Change theme immediately
    setTheme(newTheme)

    // Reset animation state after the color fade duration (1.5s) + small buffer
    setTimeout(() => {
      setIsAnimating(false)
    }, 1600)
  }

  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="group relative overflow-hidden"
          aria-label="Toggle theme"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Icon className="h-5 w-5 transition-colors duration-300 group-hover:scale-110" />
          </div>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-full blur-sm"
            animate={{
              scale: isAnimating ? 1.5 : 0,
              opacity: isAnimating ? 1 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px]">
        {themes.map((themeOption) => {
          const ThemeIcon = themeOption.icon
          const isActive = theme === themeOption.value
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => handleThemeChange(themeOption.value)}
              className={cn(
                "flex items-center gap-2 cursor-pointer relative",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <ThemeIcon className="h-4 w-4" />
              </motion.div>
              <span>{themeOption.label}</span>
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Check className="h-4 w-4 ml-auto text-primary" />
                </motion.div>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
