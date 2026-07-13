"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code, Cpu, Cloud, ArrowRight } from "lucide-react"

export function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Mouse parallax motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for interpolation (stiffness: 60, damping: 20 makes it glide gracefully)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  // 1. Background layer parallax (Glow): moves very slowly
  const bgParallaxX = useTransform(springX, (x) => x * 0.03)
  const bgParallaxY = useTransform(springY, (y) => y * 0.03)

  // 2. Midground layer parallax (Clouds): move at different speeds, some in opposite direction
  const cloud1X = useTransform(springX, (x) => x * 0.08)
  const cloud1Y = useTransform(springY, (y) => y * 0.08)

  const cloud2X = useTransform(springX, (x) => x * -0.06)
  const cloud2Y = useTransform(springY, (y) => y * -0.06)

  const cloud3X = useTransform(springX, (x) => x * 0.1)
  const cloud3Y = useTransform(springY, (y) => y * -0.08)

  const cloud4X = useTransform(springX, (x) => x * -0.05)
  const cloud4Y = useTransform(springY, (y) => y * 0.07)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <section 
      id="hero" 
      className="relative h-[100vh] w-full overflow-hidden" 
      onMouseMove={(e) => { 
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - (rect.left + rect.width / 2))
        mouseY.set(e.clientY - (rect.top + rect.height / 2))
      }} 
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y,
          opacity,
          scale,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/50" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"
          style={{ x: bgParallaxX, y: bgParallaxY }}
        />
        
        {/* Parallax Clouds */}
        <motion.div style={{ x: cloud1X, y: cloud1Y }} className="absolute top-[10%] left-[10%] h-32 w-32 text-primary/10 pointer-events-none">
          <Cloud className="h-full w-full animate-float" />
        </motion.div>
        <motion.div style={{ x: cloud2X, y: cloud2Y }} className="absolute top-[20%] right-[15%] h-48 w-48 text-primary/5 pointer-events-none">
          <Cloud className="h-full w-full animate-float [animation-delay:-2s]" />
        </motion.div>
        <motion.div style={{ x: cloud3X, y: cloud3Y }} className="absolute bottom-[10%] left-[20%] h-24 w-24 text-primary/10 pointer-events-none">
          <Cloud className="h-full w-full animate-float [animation-delay:-4s]" />
        </motion.div>
        <motion.div style={{ x: cloud4X, y: cloud4Y }} className="absolute bottom-[20%] right-[5%] h-36 w-36 text-primary/5 pointer-events-none">
          <Cloud className="h-full w-full animate-float [animation-delay:-1s]" />
        </motion.div>
      </motion.div>

      {/* Content (Static for readability and stable interactions) */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <motion.div 
            className="rounded-full border bg-card/50 backdrop-blur-sm p-3"
            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--card))" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Code className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.div 
            className="rounded-full border bg-card/50 backdrop-blur-sm p-3"
            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--card))" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Cpu className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.div 
            className="rounded-full border bg-card/50 backdrop-blur-sm p-3"
            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--card))" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Cloud className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80"
        >
          Aditya
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground/90 leading-relaxed"
        >
          A cloud-savvy software developer crafting elegant, high-performance digital experiences from the ground up.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Button 
            size="lg" 
            className="group relative overflow-hidden"
            onClick={() => scrollToSection("projects")}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
            </span>
            <motion.div
              className="absolute inset-0 bg-primary/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="group relative overflow-hidden"
            onClick={() => scrollToSection("contact")}
          >
            <span className="relative z-10">
              Contact Me
            </span>
            <motion.div
              className="absolute inset-0 bg-secondary/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
