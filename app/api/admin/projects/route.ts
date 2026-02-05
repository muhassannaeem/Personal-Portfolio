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

// GET /api/admin/projects - Fetch all projects
export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminKey(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await readFile(PROJECTS_FILE, "utf-8")
    const projects: Project[] = JSON.parse(data || "[]")
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error reading projects:", error)
    return NextResponse.json({ error: "Failed to read projects" }, { status: 500 })
  }
}

// POST /api/admin/projects - Add a new project
export async function POST(request: NextRequest) {
  try {
    if (!verifyAdminKey(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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

    const newProject: Project = {
      id: `project-${Date.now()}`,
      title,
      description,
      image,
      githubUrl,
      deployedUrl,
      type,
      techStack,
    }

    projects.push(newProject)
    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2))

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error adding project:", error)
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 })
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
