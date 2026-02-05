"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, LinkIcon } from "lucide-react"
import { GlowButton } from "@/components/glow-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  image?: string
  githubUrl?: string
  deployedUrl?: string
  type?: string
  techStack?: string
}

interface AdminProjectPreviewProps {
  project: Project
}

export function AdminProjectPreview({ project }: AdminProjectPreviewProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="rounded-t-lg object-cover w-full h-48"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-1">
        <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground mb-2">{project.description}</CardDescription>
        {project.type && (
          <p className="text-xs text-muted-foreground mb-2 bg-secondary/50 inline-block px-2 py-1 rounded">
            {project.type}
          </p>
        )}
        {project.techStack && (
          <p className="text-xs text-muted-foreground mb-4">
            <span className="font-semibold">Tech:</span> {project.techStack}
          </p>
        )}
        <div className="flex gap-2 mt-auto flex-wrap">
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
  )
}
