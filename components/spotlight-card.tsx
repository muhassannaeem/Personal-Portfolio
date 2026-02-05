"use client"

import React, { useRef, useCallback, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className = "" }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const finalRef = ref || containerRef
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Check if device is mobile
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
    }, [isMobile])

    const handleMouseEnter = useCallback(() => {
      if (!isMobile) {
        setIsHovering(true)
      }
    }, [isMobile])

    const handleMouseLeave = useCallback(() => {
      setIsHovering(false)
    }, [])

    return (
      <motion.div
        ref={containerRef}
        className={`spotlight-card relative ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          "--spotlight-x": `${mousePosition.x}px`,
          "--spotlight-y": `${mousePosition.y}px`,
          "--spotlight-opacity": isHovering ? 1 : 0,
        } as React.CSSProperties & { "--spotlight-x": string; "--spotlight-y": string; "--spotlight-opacity": number }}
        whileHover={!isMobile ? { scale: 1.02, y: -4 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    )
  }
)

SpotlightCard.displayName = "SpotlightCard"
