"use client"

import { useState } from "react"
import { CalendarDays, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"
import { Input, Textarea, Select, ImagePreview, SectionHeader, AdminCard } from "@/components/admin/field"
import type { Event } from "@/lib/data/site-data"

const emptyEvent: Omit<Event, "id"> = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  image: "",
  imageAlt: "",
  badge: "",
  badgeColor: "white",
  spots: "",
}

const badgeColorOptions = [
  { value: "white", label: "White" },
  { value: "cyan", label: "Cyan (Featured)" },
]

export default function EventsAdminPage() {
  const { data, updateEvent, addEvent, deleteEvent } = useSiteData()
  const [localEvents, setLocalEvents] = useState<Event[]>([...data.events])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [newForm, setNewForm] = useState<Omit<Event, "id">>({ ...emptyEvent })
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const updateLocal = <K extends keyof Event>(id: string, key: K, value: Event[K]) => {
    setSaved((prev) => ({ ...prev, [id]: false }))
    setLocalEvents((prev) => prev.map((e) => (e.id === id ? { ...e, [key]: value } : e)))
  }

  const handleSave = (id: string) => {
    const ev = localEvents.find((e) => e.id === id)
    if (ev) {
      updateEvent(id, ev)
      setSaved((prev) => ({ ...prev, [id]: true }))
    }
  }

  const handleDelete = (id: string) => {
    deleteEvent(id)
    setLocalEvents((prev) => prev.filter((e) => e.id !== id))
    setConfirmDelete(null)
    if (expanded === id) setExpanded(null)
  }

  const handleAdd = () => {
    if (!newForm.title.trim()) return
    const newId = `e${Date.now()}`
    const newEv: Event = { ...newForm, id: newId }
    addEvent(newForm)
    setLocalEvents((prev) => [...prev, newEv])
    setNewForm({ ...emptyEvent })
    setAdding(false)
    setExpanded(newId)
  }

  return (
    <div>
      <SectionHeader
        title="Events"
        description="Create and manage upcoming gatherings, conferences, and community events."
        icon={<CalendarDays className="w-4 h-4 text-[#06B6D4]" />}
      />

      <div className="space-y-4">
        {/* Existing events */}
        {data.events.map((event, index) => {
          const local = localEvents.find((e) => e.id === event.id) ?? event
          const isExpanded = expanded === event.id
          const isSaved = saved[event.id]

          return (
            <AdminCard key={event.id}>
              {/* Header */}
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-[#27272A] shrink-0 cursor-grab" />
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : event.id)}
                  className="flex-1 flex items-center gap-3 text-left min-w-0"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/[0.07] shrink-0 bg-white/[0.02]">
                    {local.image && (
                      <img
                        src={local.image}
                        alt={local.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white truncate">
                      {local.title || <span className="text-[#3F3F46]">Untitled Event</span>}
                    </p>
                    <p className="text-xs text-[#3F3F46] truncate">
                      {local.date} · {local.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        local.badgeColor === "cyan"
                          ? "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/25"
                          : "text-white bg-white/10 border-white/15"
                      }`}
                    >
                      {local.badge || "Badge"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#52525B]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#52525B]" />
                    )}
                  </div>
                </button>
              </div>

              {/* Expanded form */}
              {isExpanded && (
                <div className="mt-5 pt-5 border-t border-white/[0.06] grid grid-cols-1 gap-4">
                  <Input
                    label="Event Title"
                    value={local.title}
                    onChange={(e) => updateLocal(event.id, "title", e.target.value)}
                    placeholder="Faith Forward Conference 2025"
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Date"
                      value={local.date}
                      onChange={(e) => updateLocal(event.id, "date", e.target.value)}
                      placeholder="March 15–17, 2025"
                    />
                    <Input
                      label="Time"
                      value={local.time}
                      onChange={(e) => updateLocal(event.id, "time", e.target.value)}
                      placeholder="9:00 AM – 6:00 PM"
                    />
                    <Input
                      label="Location"
                      value={local.location}
                      onChange={(e) => updateLocal(event.id, "location", e.target.value)}
                      placeholder="Atlanta, Georgia"
                    />
                  </div>

                  <Textarea
                    label="Description"
                    value={local.description}
                    onChange={(e) => updateLocal(event.id, "description", e.target.value)}
                    rows={3}
                    placeholder="A three-day gathering for believers..."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Badge Label"
                      value={local.badge}
                      onChange={(e) => updateLocal(event.id, "badge", e.target.value)}
                      placeholder="Featured"
                    />
                    <Select
                      label="Badge Color"
                      value={local.badgeColor}
                      onChange={(e) =>
                        updateLocal(event.id, "badgeColor", e.target.value as "cyan" | "white")
                      }
                      options={badgeColorOptions}
                    />
                    <Input
                      label="Spots / Availability"
                      value={local.spots}
                      onChange={(e) => updateLocal(event.id, "spots", e.target.value)}
                      placeholder="Limited Seats"
                    />
                  </div>

                  <Input
                    label="Image URL"
                    value={local.image}
                    onChange={(e) => updateLocal(event.id, "image", e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    hint="Recommended: 16:9 ratio"
                  />

                  <Input
                    label="Image Alt Text"
                    value={local.imageAlt}
                    onChange={(e) => updateLocal(event.id, "imageAlt", e.target.value)}
                    placeholder="Large conference audience..."
                  />

                  <ImagePreview src={local.image} alt={local.imageAlt} label="Image Preview" />

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    {confirmDelete === event.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-400">Delete this event?</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(event.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors"
                        >
                          Yes, Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1.5 text-xs text-[#52525B] border border-white/[0.08] rounded-lg hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(event.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#52525B] border border-white/[0.08] rounded-lg hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      {isSaved && (
                        <span className="text-xs text-[#06B6D4] font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                          Saved
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSave(event.id)}
                        className="px-4 py-2 text-sm font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] transition-all duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </AdminCard>
          )
        })}

        {/* Add new event */}
        {adding ? (
          <AdminCard>
            <h3 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
              New Event
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Event Title"
                value={newForm.title}
                onChange={(e) => setNewForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Faith Forward Conference 2025"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Date"
                  value={newForm.date}
                  onChange={(e) => setNewForm((p) => ({ ...p, date: e.target.value }))}
                  placeholder="March 15–17, 2025"
                />
                <Input
                  label="Time"
                  value={newForm.time}
                  onChange={(e) => setNewForm((p) => ({ ...p, time: e.target.value }))}
                  placeholder="9:00 AM – 6:00 PM"
                />
                <Input
                  label="Location"
                  value={newForm.location}
                  onChange={(e) => setNewForm((p) => ({ ...p, location: e.target.value }))}
                  placeholder="Atlanta, Georgia"
                />
              </div>

              <Textarea
                label="Description"
                value={newForm.description}
                onChange={(e) => setNewForm((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                placeholder="Event description..."
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Badge Label"
                  value={newForm.badge}
                  onChange={(e) => setNewForm((p) => ({ ...p, badge: e.target.value }))}
                  placeholder="Featured"
                />
                <Select
                  label="Badge Color"
                  value={newForm.badgeColor}
                  onChange={(e) =>
                    setNewForm((p) => ({
                      ...p,
                      badgeColor: e.target.value as "cyan" | "white",
                    }))
                  }
                  options={badgeColorOptions}
                />
                <Input
                  label="Spots / Availability"
                  value={newForm.spots}
                  onChange={(e) => setNewForm((p) => ({ ...p, spots: e.target.value }))}
                  placeholder="Limited Seats"
                />
              </div>

              <Input
                label="Image URL"
                value={newForm.image}
                onChange={(e) => setNewForm((p) => ({ ...p, image: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                hint="Recommended: 16:9 ratio"
              />

              <Input
                label="Image Alt Text"
                value={newForm.imageAlt}
                onChange={(e) => setNewForm((p) => ({ ...p, imageAlt: e.target.value }))}
                placeholder="Description of the image..."
              />

              {newForm.image && (
                <ImagePreview src={newForm.image} alt={newForm.imageAlt} label="Image Preview" />
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAdding(false)
                    setNewForm({ ...emptyEvent })
                  }}
                  className="px-4 py-2.5 text-sm text-[#71717A] border border-white/[0.08] rounded-xl hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!newForm.title.trim()}
                  className="px-5 py-2.5 text-sm font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] disabled:opacity-40 transition-all duration-200"
                >
                  Add Event
                </button>
              </div>
            </div>
          </AdminCard>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-dashed border-white/[0.1] text-sm text-[#52525B] hover:text-[#06B6D4] hover:border-[#06B6D4]/30 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add New Event
          </button>
        )}
      </div>
    </div>
  )
}
