'use client'

import { useEffect } from 'react'

interface NotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function Notification({ message, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 notification">
      <div className="flex items-center">
        <i className="fas fa-check-circle mr-2"></i>
        <span>{message}</span>
      </div>
    </div>
  )
}
