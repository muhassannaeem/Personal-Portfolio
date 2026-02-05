"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { AdminAuthGuard } from "@/components/admin/auth-guard"
import { ProjectList } from "@/components/admin/project-list"
import { AdminProjectForm } from "@/components/admin/project-form"
import { useFetchProjects } from "@/hooks/use-fetch-projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

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

function AdminDashboardContent() {
  const searchParams = useSearchParams()
  const adminKey = searchParams.get("key") || ""

  const { projects, loading, error, refetch } = useFetchProjects(adminKey)
  const [formMode, setFormMode] = useState<"hidden" | "add" | "edit">("hidden")
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleAddClick = () => {
    setEditingProject(null)
    setFormMode("add")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEditClick = (project: Project) => {
    setEditingProject(project)
    setFormMode("edit")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFormSuccess = () => {
    setFormMode("hidden")
    setEditingProject(null)
    refetch()
  }

  const handleFormCancel = () => {
    setFormMode("hidden")
    setEditingProject(null)
  }

  const handleProjectDeleted = () => {
    refetch()
  }

  if (error && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle>Welcome to the Admin Dashboard</CardTitle>
            <CardDescription>
              This is your secure project management hub. From here, you can add, edit, and delete
              projects that appear on your portfolio. All changes are saved immediately and will be
              reflected on your live site.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Form Section */}
        {formMode !== "hidden" && (
          <>
            <div className="mb-8">
              <AdminProjectForm
                adminKey={adminKey}
                mode={formMode}
                project={editingProject || undefined}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
            <Separator className="my-8" />
          </>
        )}

        {/* Add Project Button */}
        {formMode === "hidden" && (
          <div className="mb-8">
            <Button onClick={handleAddClick} size="lg">
              + Add New Project
            </Button>
          </div>
        )}

        {/* Projects List Section */}
        {loading ? (
          <Card>
            <CardContent className="py-12 flex items-center justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading projects...
              </div>
            </CardContent>
          </Card>
        ) : (
          <ProjectList
            projects={projects}
            adminKey={adminKey}
            onEditClick={handleEditClick}
            onProjectDeleted={handleProjectDeleted}
          />
        )}
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading dashboard...
        </div>
      </div>
    }>
      <AdminAuthGuard>
        <AdminDashboardContent />
      </AdminAuthGuard>
    </Suspense>
  )
}
