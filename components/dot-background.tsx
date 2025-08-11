import type React from "react"
import { cn } from "@/lib/utils"

interface DotBackgroundProps {
  children: React.ReactNode
  className?: string
  id?: string // Added id prop for sections
}

export function DotBackground({ children, className, id }: DotBackgroundProps) {
  return (
    <section
      id={id} // Apply id to the section
      className={cn(
        "relative h-full w-full bg-background",
        "bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-200/50 via-transparent to-transparent dark:from-gray-800/50",
        "[background-size:1.5rem_1.5rem]",
        className,
      )}
    >
      {children}
    </section>
  )
}
