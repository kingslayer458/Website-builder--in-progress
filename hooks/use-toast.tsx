"use client"

import { useCallback } from "react"

interface ToastOptions {
  title: string
  description: string
  type?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
}

export function useToast() {
  const toast = useCallback(({ title, description, type = "default", duration = 3000 }: ToastOptions) => {
    if (typeof window !== "undefined") {
      console.log(`Toast: ${title} - ${description} (${type})`)
      // In a real implementation, this would show a toast notification
      // For now, we'll just log to the console
    }
  }, [])

  return { toast }
}
