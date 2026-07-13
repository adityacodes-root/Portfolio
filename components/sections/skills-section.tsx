"use client"

import { SectionWrapper } from "../section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Code,
  Database,
  Cloud,
  TerminalIcon,
  GitMerge,
  Activity,
  Boxes,
  Server,
  BarChart2,
} from "lucide-react"
import type { JSX } from "react"

interface Skill {
  name: string
  icon: JSX.Element
}

interface SkillCategory {
  title: string
  icon: JSX.Element
  skills: Skill[]
}

const skillsData: SkillCategory[] = [
  {
    title: "Cloud & Platform Engineering",
    icon: <Cloud className="h-6 w-6" />,
    skills: [
      { name: "AWS", icon: <Cloud size={20} /> },
      { name: "Kubernetes", icon: <Boxes size={20} /> },
      { name: "Docker", icon: <Boxes size={20} /> },
      { name: "Linux (RHEL, Fedora)", icon: <TerminalIcon size={20} /> },
    ],
  },
  {
    title: "DevOps & Observability",
    icon: <Activity className="h-6 w-6" />,
    skills: [
      { name: "CI/CD", icon: <GitMerge size={20} /> },
      { name: "GitHub Actions", icon: <GitMerge size={20} /> },
      { name: "Prometheus", icon: <Activity size={20} /> },
      { name: "Grafana", icon: <BarChart2 size={20} /> },
      { name: "Loki", icon: <BarChart2 size={20} /> },
    ],
  },
  {
    title: "Backend Development",
    icon: <Server className="h-6 w-6" />,
    skills: [
      { name: "Python", icon: <Code size={20} /> },
      { name: "FastAPI", icon: <Server size={20} /> },
      { name: "REST APIs", icon: <Server size={20} /> },
      { name: "SQL", icon: <Database size={20} /> },
      { name: "PostgreSQL", icon: <Database size={20} /> },
      { name: "MongoDB", icon: <Database size={20} /> },
    ],
  },
  {
    title: "Programming & Automation",
    icon: <Code className="h-6 w-6" />,
    skills: [
      { name: "Python", icon: <Code size={20} /> },
      { name: "TypeScript", icon: <Code size={20} /> },
      { name: "Bash", icon: <TerminalIcon size={20} /> },
      { name: "Git", icon: <GitMerge size={20} /> },
    ],
  },
]

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Technical Skills
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A glimpse into my toolbox of technologies and skills.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {skillsData.map((category) => (
          <Card key={category.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <span className="p-2 rounded-md bg-primary/10 text-primary">
                {category.icon}
              </span>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary">{skill.icon}</span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
