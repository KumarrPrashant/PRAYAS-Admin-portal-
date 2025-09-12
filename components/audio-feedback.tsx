"use client"

import { useEffect, useRef } from "react"

interface AudioFeedbackProps {
  type: "success" | "error" | "notification" | "click" | "loading"
  play?: boolean
  onEnded?: () => void
}

export function AudioFeedback({ type, play = false, onEnded }: AudioFeedbackProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  // Generate audio using Web Audio API for different feedback types
  useEffect(() => {
    if (!play || !audioRef.current) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Configure audio based on type
    switch (type) {
      case "success":
        // Pleasant ascending tone
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
        oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
        oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.type = "sine"
        break

      case "error":
        // Low warning tone
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime) // A3
        oscillator.frequency.exponentialRampToValueAtTime(196, audioContext.currentTime + 0.2) // G3
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
        oscillator.type = "square"
        break

      case "notification":
        // Gentle notification chime
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        oscillator.type = "sine"
        break

      case "click":
        // Subtle click sound
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)
        oscillator.type = "square"
        break

      case "loading":
        // Soft ambient tone
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.03, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
        oscillator.type = "sine"
        break
    }

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + (type === "loading" ? 1 : type === "error" ? 0.4 : 0.3))

    oscillator.onended = () => {
      audioContext.close()
      onEnded?.()
    }

    return () => {
      try {
        oscillator.stop()
        audioContext.close()
      } catch (e) {
        // Audio context might already be closed
      }
    }
  }, [play, type, onEnded])

  return <audio ref={audioRef} style={{ display: "none" }} />
}

// Hook for easy audio feedback usage
export function useAudioFeedback() {
  const playAudio = (type: AudioFeedbackProps["type"]) => {
    // Create a temporary audio feedback component
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
      case "success":
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.1)
        oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.type = "sine"
        break

      case "error":
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(196, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
        oscillator.type = "square"
        break

      case "notification":
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        oscillator.type = "sine"
        break

      case "click":
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)
        oscillator.type = "square"
        break
    }

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + (type === "error" ? 0.4 : 0.3))

    oscillator.onended = () => {
      audioContext.close()
    }
  }

  return { playAudio }
}
