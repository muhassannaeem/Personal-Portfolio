"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

export function ContactForm() {
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here,
    // e.g., send data to an API route or an email service.
    alert("Form submitted! (This is a demo, no actual submission occurred.)")
  }

  return (
    <motion.form
      className="grid gap-6 bg-card border rounded-lg p-8 shadow-lg max-w-xl mx-auto"
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onSubmit={handleSubmit}
    >
      <motion.div variants={itemVariants}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your Name" required />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="your@email.com" required />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Regarding a project..." required />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Your message..." rows={5} required />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </motion.div>
    </motion.form>
  )
}
