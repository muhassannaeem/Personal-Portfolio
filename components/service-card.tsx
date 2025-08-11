"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  index: number
}

export function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" },
  }

  return (
    <motion.div
      className="bg-card border rounded-lg p-8 shadow-sm flex flex-col items-center text-center"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Icon className="h-16 w-16 text-primary mb-6" />
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}
