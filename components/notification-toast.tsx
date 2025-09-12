"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"
import { useAudioFeedback } from "./audio-feedback"

interface NotificationToastProps {
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
  onClose?: () => void
  withAudio?: boolean
}

export function NotificationToast({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  withAudio = true,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { playAudio } = useAudioFeedback()

  useEffect(() => {
    if (withAudio) {
      const audioType = type === "success" ? "success" : type === "error" ? "error" : "notification"
      playAudio(audioType)
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [type, withAudio, duration, onClose, playAudio])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }

  const iconColors = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  }

  const Icon = icons[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-4 right-4 z-50 max-w-sm w-full ${colors[type]} border rounded-lg shadow-lg p-4`}
        >
          <div className="flex items-start space-x-3">
            <Icon className={`w-5 h-5 mt-0.5 ${iconColors[type]}`} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{title}</p>
              {message && <p className="text-sm opacity-90 mt-1">{message}</p>}
            </div>
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => onClose?.(), 300)
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for easy toast notifications
export function useNotificationToast() {
  const [toasts, setToasts] = useState<Array<NotificationToastProps & { id: string }>>([])

  const showToast = (toast: Omit<NotificationToastProps, "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = {
      ...toast,
      id,
      onClose: () => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      },
    }
    setToasts((prev) => [...prev, newToast])
  }

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <NotificationToast key={toast.id} {...toast} />
      ))}
    </div>
  )

  return { showToast, ToastContainer }
}
