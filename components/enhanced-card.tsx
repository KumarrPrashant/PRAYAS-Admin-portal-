"use client"

import { motion } from "framer-motion"
import { Card, type CardProps } from "@/components/ui/card"
import { forwardRef } from "react"

interface EnhancedCardProps extends CardProps {
  animationDelay?: number
  hoverEffect?: "lift" | "glow" | "scale" | "tilt"
  entranceAnimation?: "fadeInUp" | "slideInLeft" | "slideInRight" | "zoomIn"
}

export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  (
    { children, animationDelay = 0, hoverEffect = "lift", entranceAnimation = "fadeInUp", className, ...props },
    ref,
  ) => {
    const entranceAnimations = {
      fadeInUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
      },
      slideInLeft: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
      },
      slideInRight: {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
      },
      zoomIn: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
      },
    }

    const hoverAnimations = {
      lift: {
        whileHover: { y: -4, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" },
      },
      glow: {
        whileHover: { boxShadow: "0 0 20px rgba(22, 78, 99, 0.3)" },
      },
      scale: {
        whileHover: { scale: 1.02 },
      },
      tilt: {
        whileHover: { rotateY: 5, rotateX: 5 },
      },
    }

    return (
      <motion.div
        {...entranceAnimations[entranceAnimation]}
        {...hoverAnimations[hoverEffect]}
        transition={{
          duration: 0.5,
          delay: animationDelay,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{ perspective: "1000px" }}
      >
        <Card ref={ref} className={`transition-all duration-300 ${className}`} {...props}>
          {children}
        </Card>
      </motion.div>
    )
  },
)

EnhancedCard.displayName = "EnhancedCard"
