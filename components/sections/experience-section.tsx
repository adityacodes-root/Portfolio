"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Calendar, MapPin, ArrowRight, Zap, Target, TrendingUp } from "lucide-react"
import { SectionWrapper } from "../section-wrapper"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const experiences = [
  {
    id: "jio",
    role: "Software Engineer Intern",
    company: "Jio Platforms Ltd.",
    duration: "May 2025 – August 2025",
    location: "Mumbai, India",
    type: "Internship",
    description: [
      "Developed and optimized an NL2SQL engine converting natural-language queries into SQL across 70+ MariaDB tables, achieving 97% accuracy on benchmark queries.",
      "Engineered an SMS deduplication utility processing 50k+ records in under 5 seconds with 98% accuracy, leveraging Kibana analytics for reporting and validation.",
      "Contributed to a high-volume SMS classification pipeline detecting OTP/transactional/promotional mislabeling across millions of daily messages; curated training datasets in Kibana to improve detection accuracy.",
      "Contributed to development of multiple automation test cases (Robot Framework) integrated into Azure DevOps CI/CD pipelines for regression validation."
    ],
    logo: "/logos/jio.png",
    logoAlt: "Jio Logo",
    metrics: [
      { label: "Accuracy", value: "97%", icon: <Target className="h-3 w-3" /> },
      { label: "Records Processed", value: "50k+", icon: <TrendingUp className="h-3 w-3" /> },
      { label: "Daily Messages", value: "Millions", icon: <Zap className="h-3 w-3" /> }
    ]
  },
  {
    id: "bssk",
    role: "Web Developer Intern",
    company: "Bharatiya Samaj Seva Kendra (NGO)",
    duration: "Mar – May 2024",
    location: "Pune, India",
    type: "Internship",
    description: [
      "Designed and developed a responsive website that increased NGO's online presence, improving accessibility for beneficiaries",
      "Implemented an efficient document management system, reducing data retrieval time by 60% and improving offline access",
      "Created an intuitive admin dashboard for staff, streamlining content updates and donor management processes",
      "Optimized website performance, achieving a 90+ Lighthouse score and ensuring smooth access on low-bandwidth connections"
    ],
    logo: "/logos/bssk.jpg",
    logoAlt: "BSSK Logo",
    metrics: [
      { label: "Lighthouse Score", value: "90+", icon: <Target className="h-3 w-3" /> },
      { label: "Performance Gain", value: "60%", icon: <TrendingUp className="h-3 w-3" /> },
      { label: "Accessibility", value: "100%", icon: <Zap className="h-3 w-3" /> }
    ]
  }
]

export function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(experiences[0])
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left - go to next experience
      const currentIndex = experiences.findIndex(exp => exp.id === activeExperience.id)
      const nextIndex = (currentIndex + 1) % experiences.length
      setActiveExperience(experiences[nextIndex])
    } else if (isRightSwipe) {
      // Swipe right - go to previous experience
      const currentIndex = experiences.findIndex(exp => exp.id === activeExperience.id)
      const prevIndex = currentIndex === 0 ? experiences.length - 1 : currentIndex - 1
      setActiveExperience(experiences[prevIndex])
    }
  }

  return (
    <SectionWrapper id="experience">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            My professional journey in software development and engineering.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="flex gap-1 p-1 rounded-xl border bg-card/50 backdrop-blur-sm">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => {
                  // Prevent rapid repeated clicks
                  setTimeout(() => setActiveExperience(exp), 50)
                }}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none ${
                  activeExperience.id === exp.id
                    ? 'bg-primary text-primary-foreground shadow-lg pointer-events-none'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/80'
                }`}
              >
                <div className={`relative h-6 w-6 rounded-lg border p-1 transition-all duration-300 ${
                  activeExperience.id === exp.id 
                    ? 'bg-primary-foreground/20 border-primary-foreground/30' 
                    : 'bg-background/50 border-border'
                }`}>
                  <Image
                    src={exp.logo}
                    alt={exp.logoAlt}
                    fill
                    sizes="24px"
                    className="object-contain"
                  />
                </div>
                <span className="hidden sm:inline font-medium">{exp.company}</span>
                {activeExperience.id === exp.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-lg -z-10 pointer-events-none"
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Experience Content - Swipeable on mobile */}
        <div
          ref={contentRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="touch-pan-y"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExperience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <div className="relative h-16 w-16 rounded-xl border bg-background/50 p-3">
                        <Image
                          src={activeExperience.logo}
                          alt={activeExperience.logoAlt}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Role Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {activeExperience.type}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {activeExperience.duration}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {activeExperience.location}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-semibold tracking-tight mb-1">
                        {activeExperience.role}
                      </CardTitle>
                      <p className="text-base font-medium text-muted-foreground">
                        {activeExperience.company}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Metrics */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Metrics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeExperience.metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                          className="flex items-center gap-2 p-3 rounded-lg border bg-card/30 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                            {metric.icon}
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-foreground">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Achievements</h4>
                    <ul className="space-y-3">
                      {activeExperience.description.map((item, i) => (
                        <li 
                          key={i} 
                          className="text-sm text-muted-foreground leading-relaxed flex items-start gap-3"
                        >
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Swipe Indicator for Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 sm:hidden"
        >
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border bg-card/50 backdrop-blur-sm">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Let's connect</span>
          </div>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Open to discussing technology, sharing knowledge, and building meaningful connections in the tech community.
          </p>
          <Button 
            onClick={() => {
              setTimeout(() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  // Get the element's position relative to the viewport
                  const rect = contactSection.getBoundingClientRect()
                  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                  // Responsive offset: smaller for desktop, larger for mobile
                  const offset = window.innerWidth >= 768 ? 30 : 50
                  const targetPosition = scrollTop + rect.top - offset
                  
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                  })
                }
              }, 100) // Small delay to ensure DOM is ready
            }}
            className="inline-flex items-center gap-2"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
