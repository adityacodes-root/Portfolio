"use client"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

interface Project {
  title: string
  shortDescription: string
  longDescription: string
  challenges: string
  learnings: string
  stack: string[]
  image: string
  screenshots?: string[]
  githubUrl?: string
  liveUrl?: string
  slug: string
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const router = useRouter()

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (project) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="container max-w-5xl mx-auto h-full overflow-y-auto px-0 sm:px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex items-center gap-4 p-3 sm:p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-accent/50 -ml-2 sm:ml-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold truncate">{project.title}</h1>
            </div>
          </div>

          <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
            <div className="relative h-48 sm:h-64 md:h-96 w-full rounded-lg overflow-hidden border">
              <Image
                src={project.screenshots?.[0] || project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 80vw"
                priority
              />
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs sm:text-sm">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground space-y-3 sm:space-y-4">
              <h2 className="text-foreground font-semibold text-base sm:text-lg">About the Project</h2>
              <p className="text-sm sm:text-base">{project.longDescription}</p>

              <h2 className="text-foreground font-semibold text-base sm:text-lg">Challenges</h2>
              <p className="text-sm sm:text-base">{project.challenges}</p>

              <h2 className="text-foreground font-semibold text-base sm:text-lg">Learnings</h2>
              <p className="text-sm sm:text-base">{project.learnings}</p>
            </div>

            {project.screenshots && project.screenshots.length > 1 && (
              <div>
                <h2 className="text-foreground font-semibold text-base sm:text-lg mb-3 sm:mb-4">More Screenshots</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {project.screenshots.slice(1).map((ss, idx) => (
                    <div key={idx} className="relative h-40 sm:h-48 md:h-64 w-full rounded border overflow-hidden">
                      <Image
                        src={ss || "/placeholder.svg"}
                        alt={`${project.title} screenshot ${idx + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 45vw, 40vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 border-t">
              {project.githubUrl && (
                <Button variant="outline" className="w-full sm:w-auto text-sm sm:text-base" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button className="w-full sm:w-auto text-sm sm:text-base" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Link
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 