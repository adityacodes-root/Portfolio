"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement
      const isClickable = 
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest("[role='button']") !== null ||
        target.closest("input") !== null ||
        target.closest("textarea") !== null ||
        target.closest("select") !== null ||
        target.closest("[contenteditable='true']") !== null ||
        target.closest("[tabindex]:not([tabindex='-1'])") !== null

      setIsPointer(isClickable)
    }

    // Only add mousemove listener if we're on a device with a mouse
    const hasMouse = window.matchMedia("(pointer: fine)").matches
    if (hasMouse) {
      window.addEventListener("mousemove", updateMousePosition)
    }

    return () => {
      if (hasMouse) {
        window.removeEventListener("mousemove", updateMousePosition)
      }
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-primary" />
      </motion.div>

      {/* Trailing effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.2,
        }}
      >
        <div className="w-4 h-4 rounded-full border-2 border-primary/30" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 25,
          mass: 0.3,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-primary/10" />
      </motion.div>
    </>
  )
} 