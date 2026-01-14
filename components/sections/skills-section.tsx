"use client"

import { SectionWrapper } from "../section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Code,
  Database,
  Cloud,
  TerminalIcon,
  Palette,
  GitMerge,
  Brain,
  Zap,
  Search,
  Boxes,
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
    title: "Frontend Development",
    icon: <Palette className="h-6 w-6" />,
    skills: [
      { name: "HTML", icon: <Code size={20} /> },
      { name: "Tailwind CSS", icon: <Palette size={20} /> },
      { name: "React", icon: <Zap size={20} /> },
      { name: "Next.js", icon: <Code size={20} /> },
    ],
  },
  {
    title: "Backend Development",
    icon: <Code className="h-6 w-6" />,
    skills: [
      { name: "Node.js", icon: <Code size={20} /> },
      { name: "Express.js", icon: <Code size={20} /> },
      { name: "Python", icon: <Code size={20} /> },
      { name: "MySQL", icon: <Database size={20} /> },
      { name: "PostgreSQL", icon: <Database size={20} /> },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <TerminalIcon className="h-6 w-6" />,
    skills: [
      { name: "Linux", icon: <TerminalIcon size={20} /> },
      { name: "Git", icon: <GitMerge size={20} /> },
      { name: "GitHub", icon: <GitMerge size={20} /> },
      { name: "Docker", icon: <Boxes size={20} /> },
      { name: "Kubernetes", icon: <Boxes size={20} /> },
      { name: "AWS", icon: <Cloud size={20} /> },
      { name: "Azure DevOps", icon: <Cloud size={20} /> },
      { name: "VS Code", icon: <TerminalIcon size={20} /> },
      { name: "RED (Robot Editor)", icon: <Brain size={20} /> },
    ],
  },
  {
    title: "Data & Analytics",
    icon: <Search className="h-6 w-6" />,
    skills: [
      { name: "Elasticsearch", icon: <Search size={20} /> },
      { name: "Kibana", icon: <Search size={20} /> },
      { name: "Kibana Query Language", icon: <Code size={20} /> },
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
