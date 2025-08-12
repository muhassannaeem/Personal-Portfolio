"use client"

import { DotBackground } from "@/components/dot-background";
import { ContactForm } from "@/components/contact-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const infoItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <DotBackground className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="py-16 md:py-24 max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Have a project in mind, a question, or just want to say hello? I'd
            love to hear from you! Fill out the form below or reach out
            directly.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              className="flex flex-col items-center text-center bg-card border rounded-lg p-6 shadow-sm"
              variants={infoItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Me</h3>
              <p className="text-muted-foreground">your.email@example.com</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center bg-card border rounded-lg p-6 shadow-sm"
              variants={infoItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Me</h3>
              <p className="text-muted-foreground">+1 (123) 456-7890</p>
            </motion.div>
            <motion.div
              className="md:col-span-2 flex flex-col items-center text-center bg-card border rounded-lg p-6 shadow-sm"
              variants={infoItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">Your City, Your Country</p>
            </motion.div>
          </div>

          <ContactForm />
        </section>
      </main>
    </DotBackground>
  );
}
