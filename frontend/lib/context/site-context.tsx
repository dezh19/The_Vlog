"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { defaultSiteData, SiteData, ContentFeature, Testimony, Event } from "@/lib/data/site-data"
import { fetchSiteData, saveSiteData } from "@/lib/api/cms"

// ─────────────────────────────────────────────
//  Context Types
// ─────────────────────────────────────────────

interface SiteContextValue {
  data: SiteData
  isLoading: boolean
  error: string | null
  updateHero: (hero: SiteData["hero"]) => Promise<void>
  updateContentFeature: (id: string, feature: ContentFeature) => Promise<void>
  updateAllContentFeatures: (features: ContentFeature[]) => Promise<void>
  addTestimony: (testimony: Omit<Testimony, "id">) => Promise<void>
  updateTestimony: (id: string, testimony: Testimony) => Promise<void>
  deleteTestimony: (id: string) => Promise<void>
  reorderTestimonies: (testimonies: Testimony[]) => Promise<void>
  addEvent: (event: Omit<Event, "id">) => Promise<void>
  updateEvent: (id: string, event: Event) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  reorderEvents: (events: Event[]) => Promise<void>
  updateBookings: (bookings: SiteData["bookings"]) => Promise<void>
  updateAbout: (about: SiteData["about"]) => Promise<void>
  updateFooter: (footer: SiteData["footer"]) => Promise<void>
  resetToDefaults: () => void
  refetch: () => Promise<void>
  lastSaved: Date | null
}

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const dataRef = useRef(data)

  useEffect(() => {
    dataRef.current = data
  }, [data])

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const remoteData = await fetchSiteData()
        setData(deepMerge(defaultSiteData, remoteData))
        setLastSaved(new Date())
      } catch (e) {
        console.warn("Failed to load site data from CMS, using defaults:", e)
        setError("Could not load CMS data. Using defaults.")
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  const persist = useCallback(async (newData: SiteData) => {
    setError(null)
    try {
      const saved = await saveSiteData(newData)
      setData(saved)
      setLastSaved(new Date())
    } catch (e) {
      console.warn("Failed to save site data to CMS:", e)
      setError("Failed to save changes to CMS")
      throw e
    }
  }, [])

  const updateData = useCallback(
    async (updater: (prev: SiteData) => SiteData) => {
      const next = updater(dataRef.current)
      await persist(next)
    },
    [persist]
  )

  const refetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const remoteData = await fetchSiteData()
      setData(deepMerge(defaultSiteData, remoteData))
      setLastSaved(new Date())
    } catch (e) {
      console.warn("Failed to refresh site data from CMS:", e)
      setError("Failed to refresh CMS data")
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ── Hero ──
  const updateHero = useCallback(
    (hero: SiteData["hero"]) => updateData((d) => ({ ...d, hero })),
    [updateData]
  )

  // ── Content Features ──
  const updateContentFeature = useCallback(
    (id: string, feature: ContentFeature) =>
      updateData((d) => ({
        ...d,
        contentFeatures: d.contentFeatures.map((f) => (f.id === id ? feature : f)),
      })),
    [updateData]
  )

  const updateAllContentFeatures = useCallback(
    (features: ContentFeature[]) => updateData((d) => ({ ...d, contentFeatures: features })),
    [updateData]
  )

  // ── Testimonies ──
  const addTestimony = useCallback(
    (testimony: Omit<Testimony, "id">) =>
      updateData((d) => ({
        ...d,
        testimonies: [
          ...d.testimonies,
          { ...testimony, id: `t${Date.now()}` },
        ],
      })),
    [updateData]
  )

  const updateTestimony = useCallback(
    (id: string, testimony: Testimony) =>
      updateData((d) => ({
        ...d,
        testimonies: d.testimonies.map((t) => (t.id === id ? testimony : t)),
      })),
    [updateData]
  )

  const deleteTestimony = useCallback(
    (id: string) =>
      updateData((d) => ({
        ...d,
        testimonies: d.testimonies.filter((t) => t.id !== id),
      })),
    [updateData]
  )

  const reorderTestimonies = useCallback(
    (testimonies: Testimony[]) => updateData((d) => ({ ...d, testimonies })),
    [updateData]
  )

  // ── Events ──
  const addEvent = useCallback(
    (event: Omit<Event, "id">) =>
      updateData((d) => ({
        ...d,
        events: [...d.events, { ...event, id: `e${Date.now()}` }],
      })),
    [updateData]
  )

  const updateEvent = useCallback(
    (id: string, event: Event) =>
      updateData((d) => ({
        ...d,
        events: d.events.map((e) => (e.id === id ? event : e)),
      })),
    [updateData]
  )

  const deleteEvent = useCallback(
    (id: string) =>
      updateData((d) => ({
        ...d,
        events: d.events.filter((e) => e.id !== id),
      })),
    [updateData]
  )

  const reorderEvents = useCallback(
    (events: Event[]) => updateData((d) => ({ ...d, events })),
    [updateData]
  )

  // ── Bookings ──
  const updateBookings = useCallback(
    (bookings: SiteData["bookings"]) => updateData((d) => ({ ...d, bookings })),
    [updateData]
  )

  // ── About ──
  const updateAbout = useCallback(
    (about: SiteData["about"]) => updateData((d) => ({ ...d, about })),
    [updateData]
  )

  // ── Footer ──
  const updateFooter = useCallback(
    (footer: SiteData["footer"]) => updateData((d) => ({ ...d, footer })),
    [updateData]
  )

  // ── Reset ──
  const resetToDefaults = useCallback(() => {
    setData(defaultSiteData)
    setError(null)
    setLastSaved(null)
  }, [])

  return (
    <SiteContext.Provider
      value={{
        data,
        isLoading,
        error,
        updateHero,
        updateContentFeature,
        updateAllContentFeatures,
        addTestimony,
        updateTestimony,
        deleteTestimony,
        reorderTestimonies,
        addEvent,
        updateEvent,
        deleteEvent,
        reorderEvents,
        updateBookings,
        updateAbout,
        updateFooter,
        resetToDefaults,
        refetch,
        lastSaved,
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
