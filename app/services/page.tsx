"use client"

import { DotBackground } from "@/components/dot-background";
import { ServiceCard } from "@/components/service-card";
import { Code, Smartphone, Palette } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description:
        "Building responsive, high-performance web applications using modern frameworks like React and Next.js, with robust backend solutions using Node.js and Express.js. I focus on clean code, scalability, and optimal user experience.",
      icon: Code,
    },
    {
      title: "Mobile App Development",
      description:
        "Crafting intuitive and feature-rich mobile applications for iOS and Android platforms using React Native for cross-platform efficiency and native Kotlin for platform-specific excellence. Delivering seamless performance and engaging interfaces.",
      icon: Smartphone,
    },
    {
      title: "UI/UX Design",
      description:
        "Designing user-centric interfaces and experiences that are not only visually appealing but also highly functional and easy to navigate. My process involves user research, wireframing, prototyping, and iterative design to ensure optimal usability.",
      icon: Palette,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <DotBackground className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="py-16 md:py-24">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            I offer a comprehensive range of services to bring your digital
            ideas to life, focusing on innovation, performance, and user
            satisfaction.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </motion.div>

          <motion.div
            className="mt-20 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Me?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a blend of technical expertise and a keen eye for design, I
              deliver solutions that are not only robust and scalable but also
              delightful to use. I prioritize clear communication, agile
              methodologies, and a commitment to exceeding client expectations.
              Let's build something amazing together!
            </p>
          </motion.div>
        </section>
      </main>
    </DotBackground>
  );
}
