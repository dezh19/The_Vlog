"use client"

import React from "react"

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: "" }
  }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : String(error)
    return { hasError: true, message }
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center bg-[#09090B] px-6 text-center">
            <div className="max-w-md">
              <p className="text-lg font-semibold text-white">Something went wrong.</p>
              <p className="mt-2 text-sm text-zinc-400">
                The page could not be loaded. Please refresh to try again.
              </p>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
