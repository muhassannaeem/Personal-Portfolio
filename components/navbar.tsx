"use client"

import Link from "next/link"
import { Menu, Download } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 60 // Adjust this value based on your fixed header height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false) // Close mobile menu after clicking
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <Link href="#home" className="mr-6 flex items-center space-x-2" onClick={() => scrollToSection("home")}>
          <span className="font-bold text-lg">Your Name</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.05, color: "var(--primary)" }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium transition-colors text-black dark:text-white hover:text-primary dark:hover:text-primary"
              >
                {item.name}
              </button>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center gap-2 ml-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/cv.pdf" download="Your_Name_CV.pdf">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Download className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Download CV</span>
              </Button>
            </Link>
          </motion.div>
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium pt-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="text-black dark:text-white hover:text-primary text-left"
                  >
                    {item.name}
                  </button>
                ))}
                <Link
                  href="/cv.pdf"
                  download="Your_Name_CV.pdf"
                  className="hover:text-primary flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Download className="h-5 w-5" /> Download CV
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
