"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { useAudioFeedback } from "./audio-feedback"
import { forwardRef } from "react"

interface AnimatedButtonProps extends ButtonProps {
  withAudio?: boolean
  animationType?: "scale" | "bounce" | "pulse" | "shake"
  successFeedback?: boolean
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, withAudio = false, animationType = "scale", successFeedback = false, onClick, ...props }, ref) => {
    const { playAudio } = useAudioFeedback()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (withAudio) {
        playAudio("click")
      }

      if (successFeedback) {
        setTimeout(() => playAudio("success"), 100)
      }

      onClick?.(e)
    }

    const animations = {
      scale: {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      },
      bounce: {
        whileHover: { y: -2 },
        whileTap: { y: 0 },
      },
      pulse: {
        whileHover: { scale: [1, 1.05, 1] },
        whileTap: { scale: 0.95 },
      },
      shake: {
        whileHover: { x: [-1, 1, -1, 1, 0] },
        whileTap: { scale: 0.95 },
      },
    }

    return (
      <motion.div {...animations[animationType]} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
        <Button ref={ref} onClick={handleClick} {...props}>
          {children}
        </Button>
      </motion.div>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"
