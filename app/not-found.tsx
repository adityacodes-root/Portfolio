"use client"

import { Button } from "@/components/ui/button"
import { Cloud } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-center gap-2">
          <Cloud className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">404</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Page Not Found</h2>
          <p className="text-lg text-muted-foreground">
            Looks like this page has floated away into the cloud.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#contact">
              Contact Me
            </Link>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          <p>If you believe this is a mistake, please let me know.</p>
        </motion.div>
      </motion.div>
    </div>
  )
} 