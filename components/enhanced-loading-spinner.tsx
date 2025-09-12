"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { AudioFeedback } from "./audio-feedback"

interface EnhancedLoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "patriotic" | "minimal"
  withAudio?: boolean
  message?: string
}

export function EnhancedLoadingSpinner({
  size = "md",
  variant = "default",
  withAudio = false,
  message = "Loading...",
}: EnhancedLoadingSpinnerProps) {
  const [playAudio, setPlayAudio] = useState(false)

  useEffect(() => {
    if (withAudio) {
      setPlayAudio(true)
    }
  }, [withAudio])

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  if (variant === "patriotic") {
    return (
      <div className="flex flex-col items-center space-y-4">
        {withAudio && <AudioFeedback type="loading" play={playAudio} />}

        <motion.div
          className={`${sizeClasses[size]} relative`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border-2 border-orange-500 relative">
            {/* Ashoka Chakra spokes */}
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-navy-800 top-1/2 left-1/2 origin-bottom"
                style={{
                  height: size === "sm" ? "10px" : size === "md" ? "20px" : "35px",
                  transform: `translate(-50%, -100%) rotate(${i * 15}deg)`,
                }}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.p
          className={`${textSizeClasses[size]} font-medium text-primary`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          {message}
        </motion.p>
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div className="flex items-center space-x-3">
        {withAudio && <AudioFeedback type="loading" play={playAudio} />}

        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        <span className={`${textSizeClasses[size]} text-muted-foreground`}>{message}</span>
      </div>
    )
  }

  // Default variant
  return (
    <div className="flex flex-col items-center space-y-3">
      {withAudio && <AudioFeedback type="loading" play={playAudio} />}

      <motion.div
        className={`${sizeClasses[size]} border-4 border-primary/20 border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.p
        className={`${textSizeClasses[size]} font-medium text-primary`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      >
        {message}
      </motion.p>
    </div>
  )
}
