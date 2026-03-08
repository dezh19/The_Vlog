"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { defaultSiteData, SiteData, ContentFeature, Testimony, Event } from "@/lib/data/site-data"

// ─────────────────────────────────────────────
//  Context Types
// ─────────────────────────────────────────────

interface SiteContextValue {
  data: SiteData
  updateHero: (hero: SiteData["hero"]) => void
  updateContentFeature: (id: string, feature: ContentFeature) => void
  updateAllContentFeatures: (features: ContentFeature[]) => void
  addTestimony: (testimony: Omit<Testimony, "id">) => void
  updateTestimony: (id: string, testimony: Testimony) => void
  deleteTestimony: (id: string) => void
  reorderTestimonies: (testimonies: Testimony[]) => void
  addEvent: (event: Omit<Event, "id">) => void
  updateEvent: (id: string, event: Event) => void
  deleteEvent: (id: string) => void
  reorderEvents: (events: Event[]) => void
  updateBookings: (bookings: SiteData["bookings"]) => void
  updateAbout: (about: SiteData["about"]) => void
  updateFooter: (footer: SiteData["footer"]) => void
  resetToDefaults: () => void
  lastSaved: Date | null
}

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────

const STORAGE_KEY = "thevlog_site_data"

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as SiteData
        // Deep merge with defaults to handle new fields added later
        setData(deepMerge(defaultSiteData, parsed))
        setLastSaved(new Date())
      }
    } catch (e) {
      console.warn("Failed to load site data from localStorage:", e)
    }
  }, [])

  // Persist to localStorage whenever data changes (after hydration)
  const persist = useCallback((newData: SiteData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
      setLastSaved(new Date())
    } catch (e) {
      console.warn("Failed to save site data to localStorage:", e)
    }
  }, [])

  const updateData = useCallback(
    (updater: (prev: SiteData) => SiteData) => {
      setData((prev) => {
        const next = updater(prev)
        persist(next)
        return next
      })
    },
    [persist]
  )

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
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setLastSaved(null)
  }, [])

  return (
    <SiteContext.Provider
      value={{
        data,
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
