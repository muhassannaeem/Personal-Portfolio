"use client"

import { ProjectCard } from "@/components/project-card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  githubUrl: string
  deployedUrl: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects")
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data: Project[] = await res.json()
        setProjects(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

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

  if (loading) return <div className="text-center py-20">Loading projects...</div>
  if (error) return <div className="text-center py-20 text-destructive">Error: {error}</div>

  return (
    <section className="py-16 md:py-24">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}
      >
        Explore a selection of my recent work, showcasing my skills in web development, mobile applications, and UI/UX
        design. Each project represents a unique challenge and a commitment to delivering high-quality solutions.
      </motion.p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  )
}
