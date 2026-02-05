"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, LinkIcon } from "lucide-react"
import { GlowButton } from "@/components/glow-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  githubUrl: string
  deployedUrl: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
    hover: { scale: 1.03, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" },
  }

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
      <Card className="h-full flex flex-col">
        <CardHeader className="p-0">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="rounded-t-lg object-cover w-full h-48"
          />
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-1">
          <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
          <CardDescription className="text-muted-foreground mb-4 flex-1">{project.description}</CardDescription>
          <div className="flex gap-2 mt-auto">
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <GlowButton variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-2" /> GitHub
                </GlowButton>
              </Link>
            )}
            {project.deployedUrl && (
              <Link href={project.deployedUrl} target="_blank" rel="noopener noreferrer">
                <GlowButton size="sm">
                  <LinkIcon className="h-4 w-4 mr-2" /> Live Demo
                </GlowButton>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
