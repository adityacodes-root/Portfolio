"use client"

import dynamic from "next/dynamic"

const CustomCursor = dynamic(() => import("@/components/custom-cursor").then(mod => mod.CustomCursor), {
  ssr: false
})

export function CursorWrapper() {
  return <CustomCursor />
} 