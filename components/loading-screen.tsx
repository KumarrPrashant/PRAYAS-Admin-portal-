"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Show loading for 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-500 via-white to-green-600"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-white to-green-600 opacity-90" />

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="mx-auto mb-8 h-24 w-24 rounded-full border-4 border-navy-800 bg-white flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="h-16 w-16 rounded-full border-2 border-navy-800 relative"
              >
                {/* Ashoka Chakra spokes */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-0.5 w-6 bg-navy-800 top-1/2 left-1/2 origin-left"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-serif text-4xl font-bold text-navy-800 mb-4"
            >
              PRAYAS
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-sans text-lg text-navy-700 mb-6"
            >
              Problem Reporting and Action for Your Area's Security
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
              className="mx-auto h-1 w-48 bg-navy-800 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  delay: 1.5,
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="h-full w-1/3 bg-gradient-to-r from-orange-500 to-green-600"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="font-sans text-sm text-navy-600 mt-4"
            >
              Connecting Citizens to Government
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
