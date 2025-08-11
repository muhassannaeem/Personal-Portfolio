"use client"

import { motion } from "framer-motion"
import { Code, Smartphone, Palette, Database, Server, GitBranch } from "lucide-react"

const skills = [
  {
    name: "Web Development",
    icon: Code,
    description: "React, Next.js, Express.js, Node.js",
  },
  {
    name: "Mobile App Development",
    icon: Smartphone,
    description: "React Native, Kotlin",
  },
  {
    name: "UI/UX Design",
    icon: Palette,
    description: "Figma, Adobe XD, User-Centric Design",
  },
  {
    name: "Databases",
    icon: Database,
    description: "MongoDB, MySQL",
  },
  {
    name: "Backend Development",
    icon: Server,
    description: "Node.js, Express.js",
  },
  {
    name: "Version Control",
    icon: GitBranch,
    description: "Git, GitHub",
  },
]

export function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <section className="py-16 md:py-24">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Expertise
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={index}
              className="bg-card border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
