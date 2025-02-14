"use client"

import type React from "react"

interface ErrorFallbackProps {
  error: Error
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-red-500">{error.message}</p>
      </div>
    </div>
  )
}

