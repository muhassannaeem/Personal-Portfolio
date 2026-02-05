"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Trash2 } from "lucide-react"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { AdminProjectPreview } from "./project-preview"
import { useToast } from "@/components/ui/use-toast"

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

interface ProjectListProps {
  projects: Project[]
  adminKey: string
  onEditClick: (project: Project) => void
  onProjectDeleted: () => void
}

export function ProjectList({
  projects,
  adminKey,
  onEditClick,
  onProjectDeleted,
}: ProjectListProps) {
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openDeleteDialog = (project: Project) => {
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedProject) return

    setIsDeleting(true)
    try {
      const response = await fetch(
        `/api/admin/projects/${selectedProject.id}?key=${adminKey}`,
        { method: "DELETE" }
      )

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      toast({
        title: "Success",
        description: `Project "${selectedProject.title}" deleted successfully`,
      })

      setDeleteDialogOpen(false)
      setSelectedProject(null)
      onProjectDeleted()
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete project",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>No projects yet. Add one to get started!</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Projects ({projects.length})</CardTitle>
          <CardDescription>Manage your portfolio projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {projects.map((project) => (
              <div key={project.id} className="relative">
                <AdminProjectPreview project={project} />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditClick(project)}
                    className="bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => openDeleteDialog(project)}
                    className="bg-destructive/80 backdrop-blur-sm hover:bg-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProject && (
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          projectName={selectedProject.title}
          onConfirm={handleDeleteConfirm}
          isLoading={isDeleting}
        />
      )}
    </>
  )
}
