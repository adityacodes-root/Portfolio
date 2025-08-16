"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export default function ThemeFade() {
  const { theme } = useTheme()
  const prevTheme = useRef<string | undefined>(theme)
  const [visible, setVisible] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<number | null>(null)
  const doc = typeof document !== 'undefined' ? document.documentElement : null

  useEffect(() => {
    if (prevTheme.current && theme !== prevTheme.current) {
      // Mount overlay
      setVisible(true)

      // Ensure DOM painted
      requestAnimationFrame(() => {
        if (overlayRef.current) {
          // Force the overlay to keep its transition
          overlayRef.current.style.setProperty('transition', 'opacity 1500ms ease-out', 'important')
          overlayRef.current.style.opacity = '1'
        }

        // Disable transitions on theme-sensitive components to avoid repaint cascading
        doc.classList.add('theme-transition-disabled')

        // Fade out after short delay so user sees initial overlay
        timerRef.current = window.setTimeout(() => {
          if (overlayRef.current) overlayRef.current.style.opacity = '0'
        }, 80)

        // Cleanup: hide overlay after full fade
        timerRef.current = window.setTimeout(() => {
          setVisible(false)
          // Re-enable theme transitions
          doc.classList.remove('theme-transition-disabled')
        }, 1600)
      })
    }
    prevTheme.current = theme

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [theme])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="theme-fade pointer-events-none fixed inset-0 z-[9999]"
      style={{
        backgroundColor: 'rgba(0,0,0,0.03)',
        opacity: 0,
        willChange: 'opacity'
      }}
    />
  )
}
