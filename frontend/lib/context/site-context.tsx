"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { defaultSiteData, SiteData } from "@/lib/data/site-data"
import { fetchSiteData } from "@/lib/api/cms"

// ─────────────────────────────────────────────
//  Context Types
// ─────────────────────────────────────────────

interface SiteContextValue {
  data: SiteData
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const remoteData = await fetchSiteData()
        setData(deepMerge(defaultSiteData, remoteData))
      } catch (e) {
        console.warn("Failed to load site data from CMS, using defaults:", e)
        setError("Could not load CMS data. Using defaults.")
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  const refetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const remoteData = await fetchSiteData()
      setData(deepMerge(defaultSiteData, remoteData))
    } catch (e) {
      console.warn("Failed to refresh site data from CMS:", e)
      setError("Failed to refresh CMS data")
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <SiteContext.Provider
      value={{
        data,
        isLoading,
        error,
        refetch,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

// ─────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────

export function useSiteData() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider")
  return ctx
}

// ─────────────────────────────────────────────
//  Utility: deep merge (defaults ← stored)
// ─────────────────────────────────────────────

function deepMerge<T>(defaults: T, overrides: Partial<T>): T {
  if (typeof defaults !== "object" || defaults === null) return (overrides ?? defaults) as T
  if (Array.isArray(defaults)) return (overrides ?? defaults) as T
  const result = { ...defaults } as Record<string, unknown>
  for (const key in overrides) {
    const defVal = (defaults as Record<string, unknown>)[key]
    const overVal = (overrides as Record<string, unknown>)[key]
    if (
      overVal !== undefined &&
      typeof defVal === "object" &&
      defVal !== null &&
      !Array.isArray(defVal)
    ) {
      result[key] = deepMerge(defVal, overVal as Partial<typeof defVal>)
    } else if (overVal !== undefined) {
      result[key] = overVal
    }
  }
  return result as T
}
