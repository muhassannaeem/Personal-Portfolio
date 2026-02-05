"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { buttonVariants } from "@/components/ui/button"

interface GlowButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children: React.ReactNode
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ variant = "default", size = "default", className, ...props }, ref) => {
    const glowClass = variant === "outline" ? "btn-glow-outline" : "btn-glow-default"

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={cn(glowClass, className)}
          {...props}
        />
      </motion.div>
    )
  }
)

GlowButton.displayName = "GlowButton"
