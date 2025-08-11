"use client"

import { DotBackground } from "@/components/dot-background"
import { ProjectCard } from "@/components/project-card"
import fs from "fs/promises"
import path from "path"
import { motion } from "framer-motion"

interface Project {
  id: string
  title: string
  description: string
  image: string
  githubUrl: string
  deployedUrl: string
}

async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), "data", "projects.json")
  const jsonData = await fs.readFile(filePath, "utf-8")
  const projects: Project[] = JSON.parse(jsonData)
  return projects
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <DotBackground className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="py-16 md:py-24">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Explore a selection of my recent work, showcasing my skills in web development, mobile applications, and
            UI/UX design. Each project represents a unique challenge and a commitment to delivering high-quality
            solutions.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </section>
      </main>
    </DotBackground>
  )
}
