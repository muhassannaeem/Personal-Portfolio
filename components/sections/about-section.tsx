"use client";

import { motion, Variants } from "framer-motion";

export function AboutSection() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto text-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}
      >
        Hello! I&apos;m a passionate Software Engineer with a strong foundation
        in building robust and scalable applications. My journey in tech began
        with a fascination for how software can solve real-world problems and
        create impactful experiences. I thrive on transforming complex ideas
        into intuitive and efficient digital solutions.
      </motion.p>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.4 }}
      >
        With expertise spanning{" "}
        <span className="font-semibold text-foreground">Web Development</span>{" "}
        (React, Next.js, Node.js, Express.js),{" "}
        <span className="font-semibold text-foreground">
          Mobile App Development
        </span>{" "}
        (React Native, Kotlin), and{" "}
        <span className="font-semibold text-foreground">UI/UX Design</span>, I
        enjoy crafting clean, efficient, and user-friendly solutions. My
        approach emphasizes collaboration, continuous learning, and a commitment
        to delivering high-quality products that exceed expectations.
      </motion.p>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground leading-relaxed"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.6 }}
      >
        I am constantly learning and exploring new technologies to stay at the
        forefront of innovation. My goal is to contribute to projects that make
        a difference and to continuously grow as a developer and a
        problem-solver. When I'm not coding, you can find me exploring new tech
        trends, contributing to open-source, or enjoying a good book.
      </motion.p>
    </section>
  );
}
