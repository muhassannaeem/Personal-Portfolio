import { DotBackground } from "@/components/dot-background";
import { ProjectCard } from "@/components/project-card";
import fs from "fs/promises";
import path from "path";
import { ProjectsClient } from "@/components/projects-client";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  deployedUrl: string;
}

async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const projects: Project[] = JSON.parse(jsonData);
  return projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <DotBackground className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <ProjectsClient projects={projects} />
    </DotBackground>
  );
}
