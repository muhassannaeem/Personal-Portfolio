"use client"

import Link from "next/link"
import { Menu, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Toggle scrolled state at 40px as specified
      setIsScrolled(currentScrollY > 40)
    }

    // Check initial scroll position
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = isScrolled ? 90 : 70 // Adjust based on navbar height
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? 'pt-3 px-4' : 'pt-0 px-0'
      }`}
    >
      <div 
        className={`transition-all duration-300 ease-out ${
          isScrolled 
            ? 'max-w-[75%] lg:max-w-[70%] mx-auto rounded-[20px] lg:rounded-[24px] bg-background/90 backdrop-blur-md border-2 border-primary/30 shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.3)] dark:border-primary/25 supports-[backdrop-filter]:bg-background/85'
            : 'w-full bg-background/95 backdrop-blur-sm border-b border-border supports-[backdrop-filter]:bg-background/80'
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
            className="flex items-center space-x-2 focus-visible:outline-2 focus-visible:outline-primary rounded-md" 
            onClick={() => scrollToSection("home")}
          >
            <span className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-base' : 'text-lg'
            }`}>Your Name</span>
          </Link>

          {/* Desktop Navigation - Always Centered */}
          <nav className={`hidden md:flex items-center justify-center transition-all duration-300 ${
            isScrolled 
              ? 'flex-1 space-x-6 mx-8' 
              : 'flex-1 space-x-4 lg:space-x-6'
          }`}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`font-semibold transition-all duration-300 text-foreground/90 hover:text-primary hover:scale-105 focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:scale-105 rounded-md relative group ${
                    isScrolled ? 'text-base px-3 py-2' : 'text-base px-2 py-1'
                  }`}
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-200 origin-center"></span>
                </button>
              </motion.div>
            ))}
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
                    ? 'rounded-l-2xl border-l-2 border-primary/30 shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.3)] bg-background/95 backdrop-blur-md' 
                    : 'bg-background'
                }`}
              >
                <nav className="grid gap-4 text-base font-semibold pt-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-foreground/90 hover:text-primary hover:bg-primary/5 focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-primary text-left transition-all duration-200 py-3 px-3 rounded-lg border-b border-border/20 hover:border-primary/30"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.2 }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  <Link
                    href="/cv.pdf"
                    download="Your_Name_CV.pdf"
                    className="hover:text-primary focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-primary flex items-center gap-2 py-2 px-2 rounded-md transition-colors duration-200 mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Download className="h-4 w-4" /> Download CV
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
