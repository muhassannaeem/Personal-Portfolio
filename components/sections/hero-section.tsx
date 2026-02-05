"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GlowButton } from "@/components/glow-button"
import Image from "next/image"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 text-center md:text-left">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="md:w-1/2">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
            variants={itemVariants}
          >
            Hi, I&apos;m <span className="text-primary">Hassan</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-muted-foreground mb-8" variants={itemVariants}>
            A passionate Software Engineer specializing in{" "}
            <span className="font-semibold text-foreground">Web Development</span>,{" "}
            <span className="font-semibold text-foreground">Mobile Apps</span>, and{" "}
            <span className="font-semibold text-foreground">UI/UX Design</span>.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            variants={itemVariants}
          >
            <Link href="#projects">
              <GlowButton size="lg" className="w-full sm:w-auto">
                View Projects
              </GlowButton>
            </Link>
            <Link href="#contact">
              <GlowButton size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Get in Touch
              </GlowButton>
            </Link>
          </motion.div>
        </div>
        <motion.div className="md:w-1/2 flex justify-center md:justify-end" variants={imageVariants}>
          <div className="relative w-[400px] h-[400px] rounded-full border-4 border-primary shadow-lg overflow-hidden">
            <Image
              src="/Hassan.png"
              alt="Hassan"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 300px, 400px"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
