"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { SectionWrapper } from "../section-wrapper"
import Image from "next/image"
import { motion } from "framer-motion"
import { ProjectModal } from "../project-modal"
import { cn } from "@/lib/utils"

export const projectsData = [
  {
    title: "Multi Cloud Web Application",
    shortDescription: "A production-ready two-tier web application demonstrating modern DevOps practices across AWS and GCP. Built with Python FastAPI, Next.js, and fully automated CI/CD pipelines.",
    longDescription: "This project showcases a complete cloud-native application deployed to both AWS and GCP, with infrastructure as code, automated testing, and comprehensive monitoring. The application features a FastAPI backend and Next.js frontend, demonstrating my ability to work with modern cloud platforms and DevOps tooling.",
    challenges: "Debugging failed deployments, tweaking configs, and seeing real failures.",
    learnings: "The best part was pushing code and watching it automatically build, test, push, and deploy to production with zero manual steps. Seeing the pipeline run successfully after fixing broken deployments made everything click. Building this was way made me learn than reading 10 articles about DevOps. Debugging failed deployments, tweaking configs, and seeing real failures, fixes, and success teaches you what documentation cannot.",
    stack: ["AWS", "GCP", "Terraform", "GitHub Actions", "Docker", "NextJS", "Python", "FastAPI", "Uvicorn", "Pytest", "Jist"],
    image: "/images/MultiCloud.png",
    screenshots: [
      "/images/MultiCloud.png",
      "/images/MultiCloud2.png",
      "/images/MultiCloud3.png",
      "/images/MultiCloud4.png",
      "/images/MultiCloud5.png",
    ],
    githubUrl: "https://github.com/adityacodes-root/DevOps-Project",
    slug: "MultiCloud"
  },
  {
    title: "Interstice",
    shortDescription: "An interactive knowledge exploration engine that builds dynamic visual graphs to map relationships across technology, science, history, and philosophy.",
    longDescription: "Interstice is a web application designed to explore the spaces between ideas. Starting from any concept, the tool uses the Wikipedia API and LLMs (Groq API) to generate thematic clusters, adjacent subjects, and pathways. It features custom WebGL dither shader backgrounds, customizable exploration lenses (Default, Contrarian, Technical, Historical, Business, Philosophical), connection pathfinding between arbitrary concepts, interactive drag-and-drop workspace nodes, and responsive zooming/panning. The frontend uses Zustand for smooth client-state management, and the build is optimized using multi-stage Docker configurations.",
    challenges: "Developing a performant and responsive graph canvas using React Flow that handles real-time node expansions. Optimizing prompt designs for Groq models to ensure high-quality contextual connections while implementing reliable error handling and state persistence.",
    learnings: "Mastered building highly interactive canvas-based applications using React Flow and WebGL shader integrations. Gained deeper expertise with Zustand for high-performance state synchronization and multi-stage Docker builds for standalone Next.js deployments.",
    stack: ["NextJS", "React Flow", "Three.js", "Zustand", "Groq API", "Tailwind CSS", "Docker", "TypeScript"],
    image: "/images/interstice.png",
    screenshots: [
      "/images/interstice1.png",
      "/images/interstice2.png",
      "/images/interstice3.png",
      "/images/interstice4.png",
      "/images/interstice5.png",
    ],
    githubUrl: "https://github.com/adityacodes-root/Interstice",
    slug: "Interstice"
  },
  {
    title: "Draw My Repo",
    shortDescription: "An AI-powered visualization tool that generates Mermaid architecture diagrams for GitHub repositories using Gemini API.",
    longDescription: "Draw My Repo is built to help developers visualize the architecture of GitHub repositories effortlessly. By simply providing a repository link, the tool clones the codebase, analyzes its structure and configuration files, and leverages the Gemini API to generate an interactive Mermaid diagram along with a concise explanation. It features various visualization modes, local caching with SQLite, and clickable diagram components that link directly to the source files on GitHub.",
    challenges: "Developing a robust repository analysis engine that handles diverse project structures and accurately maps dependencies into Mermaid syntax. Calibrating the AI prompts to provide meaningful architecture summaries while maintaining local caching to improve performance and reduce API costs.",
    learnings: "Gained experience in prompt engineering, repository cloning management, and Mermaid diagram generation. Learned how to create interactive and clickable visualizations and implement efficient caching using SQLite.",
    stack: ["Python", "FastAPI", "Gemini API", "Mermaid.js", "SQLite", "Docker", "JavaScript"],
    image: "/images/drawmyrepo.png",
    screenshots: [
      "/images/drawmyrepo.png",
      "/images/drawmyrepo1.png",
      "/images/drawmyrepo2.png",
      "/images/drawmyrepo3.png",
      "/images/drawmyrepo4.png",
    ],
    githubUrl: "https://github.com/adityacodes-root/DrawMyRepo",
    slug: "DrawMyRepo"
  },
  {
    title: "OculusAI",
    shortDescription: "A web platform that uses AI to analyze vision health, featuring deep learning models for retinal disease detection and color blindness testing. Built with Flask, Next.js, and TensorFlow/Keras.",
    longDescription: "OculusAI is an advanced AI-powered platform for eye disease detection and color blindness analysis. Users can upload retinal images for instant diagnosis or take an interactive Ishihara color vision test. The system leverages deep learning models for real-time inference, provides professional PDF reports, and supports both desktop and mobile devices. Multiple user interfaces are available, including a Next.js web app, Streamlit dashboard, and REST API. Designed for clinicians, researchers, and individuals, OculusAI streamlines image analysis, reporting, and patient evaluation with a scalable, modular architecture.",
    challenges: "Key challenges included building robust image validation to filter out non-retinal images, optimizing AI models for real-time CPU inference, and designing a mobile-friendly, responsive UI. Integrating multiple disease types and color blindness categories, and ensuring clear, user-friendly error handling, also required careful engineering.",
    learnings: "Developing OculusAI improved my skills in deep learning model deployment, full-stack development, and responsive UI design. I gained experience in medical image analysis, building multi-interface systems, and creating secure, scalable web applications for healthcare use cases.",
    stack: ["NextJS", "Python (Flask, Streamlit)", "TensorFlow/Keras", "Tailwind", "shadcn/ui", "jsPDF"],
    image: "/images/oculusai_ss1.png",
    screenshots: [
      "/images/oculusai_ss1.png",
      "/images/oculusai_ss2.png",
      "/images/oculusai_ss3.png",
      "/images/oculusai_ss4.png",
      "/images/oculusai_ss5.png",

    ],
    githubUrl: "https://github.com/adityacodes-root/OculusAI",
    liveUrl: "https://main.d9byo4q7538fc.amplifyapp.com",
    slug: "OculusAI"
  },
  {

    title: "EchoDB",
    shortDescription: "A full-stack application that enables users to interact with PostgreSQL databases using natural language. Built with FastAPI and OpenAI's GPT-4o, it translates user prompts into SQL and returns results securely.",
    longDescription: "EchoDB is an AI-powered tool that simplifies database interaction by allowing users to input natural language queries, which are translated into SQL using OpenAI's GPT-4o model. It includes an approval layer for SQL execution, CRUD support, and a minimal frontend. The system is designed for developers and analysts to query PostgreSQL or MySQL databases without writing SQL manually. Built with scalability, security, and modularity in mind, EchoDB bridges the gap between natural language and database management.",
    challenges: "Integrating AI-generated SQL securely posed the biggest challenge, especially handling edge cases and preventing malicious queries. Another challenge was ensuring compatibility between multiple SQL dialects and dynamically interpreting natural language prompts into precise SQL statements.",
    learnings: "This project improved my skills in API development with FastAPI, prompt engineering for GPT models, database querying logic, and creating secure execution environments. I also gained deeper insights into backend design, AI integration, and full-stack architecture.",
    stack: ["NextJS", "PostgreSQL", "OpenAI GPT-4o", "Framer Motion", "Tailwind", "Recharts"],
    image: "/images/echodb.png",
    screenshots: [
      "/images/echodbss1.png",
      "/images/echodbss2.png",
      "/images/echodbss3.png"
    ],
    githubUrl: "https://github.com/adityacodes-root/EchoDB-Natural-Language-to-Query",
    slug: "EchoDB-Natural-Language-to-Query"
  },
  {
    title: "TaskPrism",
    shortDescription: "A visual task/resource allocation tool that uses graph coloring algorithms to optimize scheduling. Built with Streamlit and NetworkX, it enables interactive dependency mapping, priority setting, and Gantt chart visualization.",
    longDescription: "TaskPrism is a project management utility that leverages graph coloring to allocate tasks to resources efficiently. Users can define task dependencies, durations, deadlines, and priorities through an intuitive Streamlit UI. The system visualizes dependencies using graphs, generates execution timelines with Gantt charts, and ensures minimal resource conflicts. It helps project managers streamline task scheduling and optimize workload distribution with real-time visual feedback. Built using Python, NetworkX, and Plotly, TaskPrism bridges the gap between theoretical graph algorithms and practical project planning.",
    challenges: "Designing a dynamic system to handle arbitrary task dependencies while minimizing resource conflicts was a significant challenge. Integrating visual elements like interactive graphs and Gantt charts while maintaining performance and user control over graph density and parameters was also non-trivial.",
    learnings: "This project strengthened my understanding of graph theory, especially coloring and dependency resolution algorithms. I gained experience in interactive data visualization using Streamlit and Plotly, along with designing user-driven, responsive scheduling tools.",
    stack: ["Python", "Streamlit", "NetworkX", "Plotly", "Pandas", "Matplotlib", "NumPy"],
    image: "/images/taskprism.png",
    screenshots: [
      "/images/taskprismss1.png",
      "/images/taskprismss2.png",
      "/images/taskprismss3.png"
    ],
    githubUrl: "https://github.com/adityacodes-root/TaskPrism",
    liveUrl: "https://taskprism.streamlit.app/",
    slug: "TaskPrism-Resource-Allocation-via-Graph-Coloring"
  },
  {
    title: "Gas-Detection-and-Alert-System",
    shortDescription: "An Arduino-based gas monitoring and alert system that detects LPG, CO, and smoke levels in the environment. It uses an MQ2 sensor, I2C LCD, and RTC module to log gas leaks with real-time alerts.",
    longDescription: "This embedded system project monitors the environment for gas leaks using an MQ2 sensor and Arduino Nano. When gas levels exceed a threshold, it triggers an alert via buzzer and optionally activates an exhaust fan. The I2C LCD displays real-time gas and temperature readings, and an RTC module provides timestamped logging of leak events. Designed for safety in homes, industries, and labs, the project combines sensor integration, real-time monitoring, and event-based alerts into a portable, affordable solution.",
    challenges: "Calibrating the MQ2 sensor to accurately detect various gases and reduce false positives was a challenge. Integrating multiple components like the RTC module and LCD without timing conflicts or I2C communication errors also required careful handling.",
    learnings: "This project enhanced my skills in embedded systems design, sensor interfacing, I2C communication, and real-time data display. I also learned how to work with time-based event logging and built a deeper understanding of hardware-software integration.",
    stack: ["Arduino Nano", "MQ2 Sensor", "I2C LCD", "RTC DS3231", "C++ (Arduino)", "Breadboard", "Buzzer"],
    image: "/images/gasdetector.jpg",
    screenshots: [
      "/images/gasdetectorss1.jpg"
    ],
    githubUrl: "https://github.com/adityacodes-root/Gas-Detection-and-Alert-System",
    slug: "Gas-Detection-and-Alert-System"
  },
  {
    title: "Digital-Signature-Maker",
    shortDescription: "A browser-based tool that allows users to draw, customize, and download digital signatures using HTML5 Canvas. Features include pen color selection, background customization, undo, eraser, and image export.",
    longDescription: "Digital Signature Maker is a lightweight web app that lets users create custom digital signatures with ease. Built using HTML5 Canvas, Tailwind CSS, and JavaScript, it provides tools for adjusting pen color, line width, and canvas background. Users can erase, undo actions, clear the canvas, and download their signature as a PNG image. The app is designed for professionals needing quick, customizable, and reusable signature creation in a browser environment without any installations.",
    challenges: "Managing canvas state for undo functionality and syncing UI controls like color pickers and sliders with drawing behavior was initially challenging. Ensuring clean downloads of transparent signatures and proper eraser logic also required fine-tuning.",
    learnings: "This project deepened my understanding of the HTML5 Canvas API, state management in client-side applications, and responsive design using Tailwind CSS. I also learned techniques for implementing drawing tools and file export features in vanilla JavaScript.",
    stack: ["HTML5 Canvas", "Tailwind CSS", "JavaScript"],
    image: "/images/sm.png",
    screenshots: [
      "/images/sm.png",
      "/images/smss1.png"

    ],
    githubUrl: "https://github.com/adityacodes-root/digital-signature-maker",
    liveUrl: "https://adityacodes-root.github.io/digital-signature-maker/",
    slug: "Digital-Signature-Maker"
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 5)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {

      requestAnimationFrame(() => checkScroll())
      scrollContainer.addEventListener('scroll', checkScroll, { passive: true })
      window.addEventListener('resize', checkScroll)
      return () => {
        scrollContainer.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    // (first card element) + gap
    const firstCard = container.querySelector(':scope > div') as HTMLElement | null
    const cardWidth = firstCard ? firstCard.offsetWidth : 320
    const gap = 24 // matches gap-6 (1.5rem = 24px)
    const scrollAmount = cardWidth + gap

    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })


  }

  return (
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center px-4 sm:px-6"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of my recent work, demonstrating my expertise in full-stack development.
        </p>
      </motion.div>

      <div className="relative mt-8 sm:mt-12 px-10 sm:px-14">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-20",
            "w-8 h-8 sm:w-10 sm:h-10",
            "rounded-full flex items-center justify-center",
            "bg-background/90 backdrop-blur-md",
            "border border-border/60",
            "text-foreground/70 hover:text-primary hover:border-primary/50",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300 ease-out",
            "hover:scale-110 active:scale-95",
            showLeftArrow
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 pointer-events-none"
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-20",
            "w-8 h-8 sm:w-10 sm:h-10",
            "rounded-full flex items-center justify-center",
            "bg-background/90 backdrop-blur-md",
            "border border-border/60",
            "text-foreground/70 hover:text-primary hover:border-primary/50",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300 ease-out",
            "hover:scale-110 active:scale-95",
            showRightArrow
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Left gradient fade */}
        <div
          className={cn(
            "absolute left-10 sm:left-14 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none",
            "bg-gradient-to-r from-background to-transparent",
            "transition-opacity duration-300",
            showLeftArrow ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Right gradient fade */}
        <div
          className={cn(
            "absolute right-10 sm:right-14 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none",
            "bg-gradient-to-l from-background to-transparent",
            "transition-opacity duration-300",
            showRightArrow ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="relative flex gap-4 sm:gap-6 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex-none w-[280px] sm:w-[320px] snap-start"
            >
              <Card
                className="group h-full hover:shadow-lg transition-all duration-300 border-primary/10 bg-card/50 backdrop-blur-sm cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, 320px"
                    priority={index < 2}
                  />
                </div>
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                    {project.shortDescription}
                  </p>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.stack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.stack.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm" asChild onClick={(e) => e.stopPropagation()}>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" className="flex-1 text-xs sm:text-sm" asChild onClick={(e) => e.stopPropagation()}>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Live Link
                          </a>
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      View More Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionWrapper>
  )
}
