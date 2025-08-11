"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/yourusername", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com/yourusername", icon: Twitter },
    { name: "Email", href: "mailto:your.email@example.com", icon: Mail },
  ]

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
    <motion.footer
      className="border-t bg-card py-8 md:py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.p className="text-lg font-semibold mb-4" variants={itemVariants}>
          Your Name
        </motion.p>
        <motion.p className="text-muted-foreground max-w-md mx-auto mb-8" variants={itemVariants}>
          Passionate Software Engineer building innovative web and mobile solutions with a focus on user experience.
        </motion.p>
        <motion.div className="flex justify-center space-x-6 mb-8" variants={containerVariants}>
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.div key={link.name} variants={itemVariants} whileHover={{ scale: 1.2, color: "var(--primary)" }}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-7 w-7" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
        <motion.p className="text-sm text-muted-foreground" variants={itemVariants}>
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  )
}
