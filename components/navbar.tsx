"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Download } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"

// Navigation items constant
const NAV_ITEMS = [
  { name: "Home", id: "home" },
  { name: "Services", id: "services" },
  { name: "Projects", id: "projects" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
] as const

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Determine current theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "light"

  // Handle scroll events for both morph and active section tracking
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setIsScrolled(currentScrollY > 40)

    // Track active section based on scroll position
    const sections = NAV_ITEMS.map(item => ({
      id: item.id,
      element: document.getElementById(item.id)
    })).filter(s => s.element !== null)

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      if ((section.element as HTMLElement).offsetTop <= currentScrollY + 100) {
        setActiveSection(section.id)
        break
      }
    }
  }, [])

  // Smooth scroll to section
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = isScrolled ? 90 : 70
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }, [isScrolled])

  // Setup scroll listener
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? 'pt-3 px-4' : 'pt-0 px-0'
      }`}
    >
      <div 
        className={`transition-all duration-300 ease-out ${
          isScrolled 
            ? 'max-w-[75%] lg:max-w-[70%] mx-auto rounded-xl bg-background/85 backdrop-blur-xl border border-primary/20 shadow-lg dark:shadow-2xl shadow-black/10 dark:shadow-black/30 supports-[backdrop-filter]:bg-background/80'
            : 'w-full bg-background/70 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60'
        }`}
      >
        <div className={`flex items-center transition-all duration-250 ease-out ${
          isScrolled 
            ? 'h-11 px-4 sm:px-6 justify-between' 
            : 'h-14 px-4 md:px-6 container mx-auto'
        }`}>
          
          {/* Logo */}
          <Link 
            href="#home" 
            className="flex items-center focus-visible:outline-2 focus-visible:outline-primary rounded-md mt-4" 
            onClick={() => scrollToSection("home")}
          >
            <Image 
              src={currentTheme === "dark" ? "/logo2.png" : "/logo.png"} 
              alt="Logo" 
              width={isScrolled ? 112 : 120}
              height={isScrolled ? 112 : 120}
              className="transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation - Always Centered */}
          <nav className={`hidden md:flex items-center justify-center transition-all duration-300 ${
            isScrolled 
              ? 'flex-1 space-x-1 mx-8' 
              : 'flex-1 space-x-1 lg:space-x-2'
          }`}>
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id
              return (
                <motion.div
                  key={item.name}
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * index, duration: 0.4, ease: "easeOut" }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`font-medium transition-all duration-200 relative group rounded-md px-3 py-2 ${
                      isActive
                        ? 'text-primary'
                        : 'text-foreground/75 hover:text-foreground'
                    }`}
                  >
                    {item.name}
                    <span 
                      className={`absolute inset-x-0 bottom-1 h-0.5 bg-gradient-to-r from-primary to-primary rounded-full transition-all duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75'
                      } origin-center`}
                    />
                  </button>
                </motion.div>
              )
            })}
          </nav>

          {/* Right side actions */}
          <div className={`flex items-center transition-all duration-300 ${
            isScrolled ? 'gap-2' : 'gap-2 ml-auto'
          }`}>
            <Link href="/cv.pdf" download="Your_Name_CV.pdf">
              <Button 
                variant="ghost" 
                size="sm"
                className={`hidden sm:flex transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary ${
                  isScrolled ? 'h-8 px-3' : 'h-8 px-3'
                }`}
              >
                <Download className="h-4 w-4" />
                <span className="ml-1.5 text-xs">CV</span>
                <span className="sr-only">Download CV</span>
              </Button>
            </Link>
            
            <ThemeToggle />
            
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className={`w-64 transition-all duration-300 ${
                  isScrolled 
                    ? 'rounded-l-xl border-l border-primary/20 shadow-xl dark:shadow-2xl bg-background/85 backdrop-blur-xl' 
                    : 'bg-background/85 backdrop-blur-md border-l border-primary/15'
                }`}
              >
                <nav className="grid gap-2 text-base font-medium pt-8">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = activeSection === item.id
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left transition-all duration-200 py-3 px-4 rounded-lg relative group ${
                          isActive
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground/80 hover:text-foreground hover:bg-primary/5'
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.04 * index, duration: 0.3 }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.name}
                        <span 
                          className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full transition-all duration-200 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      </motion.button>
                    )
                  })}
                  <div className="border-t border-primary/10 mt-4 pt-4">
                    <Link
                      href="/cv.pdf"
                      download="Your_Name_CV.pdf"
                      className="flex items-center gap-2 py-3 px-4 rounded-lg text-foreground/80 hover:text-foreground hover:bg-primary/5 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Download className="h-4 w-4" /> Download CV
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
