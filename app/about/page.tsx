"use client"

import { DotBackground } from "@/components/dot-background"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Code, Award } from "lucide-react"

export default function AboutPage() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  }

  const timelineData = [
    {
      icon: GraduationCap,
      title: "Graduated with Honors",
      year: "20XX",
      description: "Completed my Bachelor's degree in Computer Science, specializing in Software Engineering.",
    },
    {
      icon: Briefcase,
      title: "First Software Engineering Role",
      year: "20XX - 20YY",
      description: "Joined [Company Name] as a Junior Developer, contributing to various web projects.",
    },
    {
      icon: Code,
      title: "Deep Dive into Mobile Development",
      year: "20YY - 20ZZ",
      description: "Expanded my expertise into mobile app development, focusing on React Native and Kotlin.",
    },
    {
      icon: Award,
      title: "Lead Developer at [Current Company]",
      year: "20ZZ - Present",
      description:
        "Currently leading a team in developing scalable full-stack applications and mentoring junior engineers.",
    },
  ]

  return (
    <DotBackground className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="py-16 md:py-24 max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Hello! I&apos;m a passionate Software Engineer with a strong foundation in building robust and scalable
            applications. My journey in tech began with a fascination for how software can solve real-world problems and
            create impactful experiences. I thrive on transforming complex ideas into intuitive and efficient digital
            solutions.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            With expertise spanning <span className="font-semibold text-foreground">Web Development</span> (React,
            Next.js, Node.js, Express.js), <span className="font-semibold text-foreground">Mobile App Development</span>{" "}
            (React Native, Kotlin), and <span className="font-semibold text-foreground">UI/UX Design</span>, I enjoy
            crafting clean, efficient, and user-friendly solutions. My approach emphasizes collaboration, continuous
            learning, and a commitment to delivering high-quality products that exceed expectations.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            I am constantly learning and exploring new technologies to stay at the forefront of innovation. My goal is
            to contribute to projects that make a difference and to continuously grow as a developer and a
            problem-solver. When I'm not coding, you can find me exploring new tech trends, contributing to open-source,
            or enjoying a good book.
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-20 mb-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            My Journey
          </motion.h2>
          <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-border before:top-0">
            {timelineData.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  className="flex items-center w-full mb-12 last:mb-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={timelineItemVariants}
                >
                  <div className={`w-1/2 pr-8 ${index % 2 === 0 ? "text-right" : "text-left order-2 pl-8"}`}>
                    <h3 className="text-xl font-semibold text-primary">{item.year}</h3>
                    <p className="text-lg font-medium mb-2">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center border-4 border-background">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className={`w-1/2 pl-8 ${index % 2 === 0 ? "order-2 pl-8" : "text-right pr-8"}`}></div>
                </motion.div>
              )
            })}
          </div>
        </section>
      </main>
    </DotBackground>
  )
}
