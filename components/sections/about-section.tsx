"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, School, Code, Cloud, Cpu, Award } from "lucide-react"
import Image from "next/image"
import { SectionWrapper } from "../section-wrapper"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"

const education = [
  {
    institution: "D Y Patil International University",
    degree: "B.Tech in Computer Science",
    duration: "2023 – 2027 (Expected)",
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    institution: "Mansukhbhai Kothari National School",
    degree: "10th & 12th (PCM Stream)",
    duration: "2020 – 2023",
    icon: <School className="h-6 w-6" />,
  },
]

const interests = [
  { name: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
  { name: "Web Development", icon: <Code className="h-4 w-4" /> },
  { name: "System Design", icon: <Cpu className="h-4 w-4" /> },
]

const certificates = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Issued March 2024",
    logo: "/logos/aws.svg",
    link: "https://www.credly.com/badges/your-badge-id",
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "Issued February 2024",
    logo: "/logos/azure.svg",
    link: "https://www.credly.com/badges/your-badge-id",
  },
  // Add more certificates as needed
]

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="max-w-5xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="text-center px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">CS undergrad, cloud enthusiast, and code explorer.</p>
          {false && (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="mt-6 group relative overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Award className="h-4 w-4" />
                    View Certificates
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[600px] max-h-[90vh] flex flex-col p-0 sm:p-0">
                <DialogHeader className="p-4 sm:p-6 pb-0 sm:pb-0">
                  <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Certifications
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-2">
                    View my professional certifications and achievements
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 sm:gap-4 p-4 sm:p-6 overflow-y-auto">
                  {certificates.map((cert, index) => (
                    <motion.a
                      key={cert.title}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 border-primary/10 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4">
                          <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={cert.logo}
                              alt={`${cert.issuer} logo`}
                              fill
                              className="object-contain p-1.5 sm:p-2"
                              sizes="(max-width: 640px) 40px, 48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
                            <CardTitle className="text-sm sm:text-base font-semibold group-hover:text-primary transition-colors truncate">
                              {cert.title}
                            </CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{cert.issuer}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">{cert.date}</p>
                          </div>
                          <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M7 7h10v10" />
                              <path d="M7 17 17 7" />
                            </svg>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.a>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl" />
              <Image
                src="/images/me.jpg"
                alt="Aditya"
                width={200}
                height={200}
                className="relative rounded-full object-cover border-4 border-primary/10 hover:border-primary/20 transition-colors duration-300"
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    {interest.icon}
                    {interest.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
              <p className="text-lg leading-relaxed">
                Hey! I'm Aditya, a Computer Science student who's passionate about solving real-world problems through efficient and thoughtful code. I love working on clean UIs, scalable systems, and exploring how tech can make life easier.
              </p>
              <p className="text-lg leading-relaxed">
                I'm constantly sharpening my skills across full-stack development, cloud infrastructure, and automation. I believe learning never stops, and I'm always up for a good challenge, a new stack, or an interesting bug to squash.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">{item.institution}</CardTitle>
                        <p className="text-sm text-muted-foreground">{item.degree}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.duration}</p>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
