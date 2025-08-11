"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function CVDownload() {
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      className="mt-12 text-center"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link href="/cv.pdf" download="Your_Name_CV.pdf">
        <Button size="lg" variant="outline">
          <Download className="h-5 w-5 mr-2" /> Download CV
        </Button>
      </Link>
    </motion.div>
  )
}
