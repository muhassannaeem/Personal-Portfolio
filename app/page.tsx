"use client"

import { DotBackground } from "@/components/dot-background"
import { HeroSection } from "@/components/sections/hero-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <DotBackground id="home" className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center">
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
          <HeroSection />
          <SkillsSection />
        </main>
      </DotBackground>

      <DotBackground id="services" className="min-h-screen flex flex-col justify-center">
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
          <ServicesSection />
        </main>
      </DotBackground>

      <DotBackground id="projects" className="min-h-screen flex flex-col justify-center">
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
          <ProjectsSection />
        </main>
      </DotBackground>

      <DotBackground id="about" className="min-h-screen flex flex-col justify-center">
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
          <AboutSection />
        </main>
      </DotBackground>

      <DotBackground id="contact" className="min-h-screen flex flex-col justify-center">
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
          <ContactSection />
        </main>
      </DotBackground>
    </div>
  )
}
