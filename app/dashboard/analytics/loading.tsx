"use client"

import { EnhancedLoadingSpinner } from "@/components/enhanced-loading-spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <EnhancedLoadingSpinner size="lg" variant="patriotic" withAudio={true} message="Loading Analytics Dashboard..." />
    </div>
  )
}




