import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"

const PROJECTS_FILE = join(process.cwd(), "data", "projects.json")
const ADMIN_KEY = process.env.ADMIN_KEY || "abc123"

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

// Verify admin key from query params
function verifyAdminKey(request: NextRequest): boolean {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")
  return key === ADMIN_KEY
}

// PUT /api/admin/projects/[id] - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdminKey(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, description, image, githubUrl, deployedUrl, type, techStack } = body

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }

    // Validate URLs if provided
    if (githubUrl && !isValidUrl(githubUrl)) {
      return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 })
    }
    if (deployedUrl && !isValidUrl(deployedUrl)) {
      return NextResponse.json({ error: "Invalid deployed URL" }, { status: 400 })
    }

    const data = await readFile(PROJECTS_FILE, "utf-8")
    const projects: Project[] = JSON.parse(data || "[]")

    const projectIndex = projects.findIndex((p) => p.id === id)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projects[projectIndex] = {
      id,
      title,
      description,
      image,
      githubUrl,
      deployedUrl,
      type,
      techStack,
    }

    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2))
    return NextResponse.json(projects[projectIndex])
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE /api/admin/projects/[id] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdminKey(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const data = await readFile(PROJECTS_FILE, "utf-8")
    const projects: Project[] = JSON.parse(data || "[]")

    const projectIndex = projects.findIndex((p) => p.id === id)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projects.splice(projectIndex, 1)
    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

// Helper function to validate URLs
function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString)
    return true
  } catch {
    return false
  }
}
