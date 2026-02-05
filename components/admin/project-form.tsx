"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

interface AdminProjectFormProps {
  adminKey: string
  mode: "add" | "edit"
  project?: Project
  onSuccess: () => void
  onCancel: () => void
}

const PROJECT_TYPES = ["Website", "UI/UX", "Mobile App", "Other"]

export function AdminProjectForm({
  adminKey,
  mode,
  project,
  onSuccess,
  onCancel,
}: AdminProjectFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    githubUrl: "",
    deployedUrl: "",
    type: "",
    techStack: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  useEffect(() => {
    if (mode === "edit" && project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        image: project.image || "",
        githubUrl: project.githubUrl || "",
        deployedUrl: project.deployedUrl || "",
        type: project.type || "",
        techStack: project.techStack || "",
      })
    }
  }, [mode, project])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = "Invalid GitHub URL"
    }
    if (formData.deployedUrl && !isValidUrl(formData.deployedUrl)) {
      newErrors.deployedUrl = "Invalid deployed URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setSubmitMessage({
        type: "error",
        message: "Please fix the errors above",
      })
      return
    }

    setIsLoading(true)
    setSubmitMessage(null)

    try {
      const url = mode === "add" 
        ? `/api/admin/projects?key=${adminKey}`
        : `/api/admin/projects/${project?.id}?key=${adminKey}`

      const method = mode === "add" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `Failed to ${mode} project`)
      }

      setSubmitMessage({
        type: "success",
        message: `Project ${mode === "add" ? "added" : "updated"} successfully!`,
      })

      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "add" ? "Add New Project" : "Edit Project"}</CardTitle>
        <CardDescription>
          {mode === "add"
            ? "Fill in the project details to add it to your portfolio"
            : "Update the project details"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitMessage && (
            <Alert
              className={
                submitMessage.type === "success"
                  ? "border-green-500 bg-green-500/5"
                  : "border-destructive"
              }
            >
              {submitMessage.type === "success" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription className={
                submitMessage.type === "success" ? "text-green-700 dark:text-green-400" : ""
              }>
                {submitMessage.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Project name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Project description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Project Type</Label>
            <Select value={formData.type} onValueChange={(value) =>
              setFormData({ ...formData, type: value })
            }>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              placeholder="e.g. React, Next.js, TailwindCSS"
              value={formData.techStack}
              onChange={(e) =>
                setFormData({ ...formData, techStack: e.target.value })
              }
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
            {formData.image && (
              <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden bg-muted">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ""
                  }}
                />
              </div>
            )}
          </div>

          {/* GitHub URL */}
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              placeholder="https://github.com/..."
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
              className={errors.githubUrl ? "border-destructive" : ""}
            />
            {errors.githubUrl && (
              <p className="text-sm text-destructive">{errors.githubUrl}</p>
            )}
          </div>

          {/* Deployed URL */}
          <div className="space-y-2">
            <Label htmlFor="deployedUrl">Deployed URL (Live Demo)</Label>
            <Input
              id="deployedUrl"
              placeholder="https://yourproject.com"
              value={formData.deployedUrl}
              onChange={(e) =>
                setFormData({ ...formData, deployedUrl: e.target.value })
              }
              className={errors.deployedUrl ? "border-destructive" : ""}
            />
            {errors.deployedUrl && (
              <p className="text-sm text-destructive">{errors.deployedUrl}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading
                ? "Saving..."
                : mode === "add"
                  ? "Add Project"
                  : "Update Project"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
