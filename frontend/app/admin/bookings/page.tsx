"use client"

import { useState } from "react"
import { BookMarked, Plus, Trash2 } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"
import { Input, Textarea, ImagePreview, SaveBar, SectionHeader, AdminCard, TagInput } from "@/components/admin/field"
import type { SiteData, BookingType } from "@/lib/data/site-data"

export default function BookingsAdminPage() {
  const { data, updateBookings } = useSiteData()
  const [form, setForm] = useState<SiteData["bookings"]>({
    ...data.bookings,
    types: data.bookings.types.map((t) => ({ ...t })),
    highlights: [...data.bookings.highlights],
  })
  const [saved, setSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const setField = <K extends keyof SiteData["bookings"]>(
    key: K,
    value: SiteData["bookings"][K]
  ) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const updateType = (id: string, field: keyof BookingType, value: string) => {
    setSaved(false)
    setForm((prev) => ({
      ...prev,
      types: prev.types.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    }))
  }

  const addType = () => {
    setSaved(false)
    setForm((prev) => ({
      ...prev,
      types: [
        ...prev.types,
        { id: `b${Date.now()}`, title: "New Booking Type", description: "" },
      ],
    }))
  }

  const deleteType = (id: string) => {
    setSaved(false)
    setForm((prev) => ({
      ...prev,
      types: prev.types.filter((t) => t.id !== id),
    }))
    setConfirmDelete(null)
  }

  const handleSave = () => {
    updateBookings(form)
    setSaved(true)
  }

  const handleReset = () => {
    setForm({
      ...data.bookings,
      types: data.bookings.types.map((t) => ({ ...t })),
      highlights: [...data.bookings.highlights],
    })
    setSaved(false)
  }

  return (
    <div>
      <SectionHeader
        title="Bookings"
        description="Manage booking types, highlights checklist, scripture quote, and the section image."
        icon={<BookMarked className="w-4 h-4 text-[#06B6D4]" />}
      />

      <div className="space-y-5">
        {/* Booking Types */}
        <AdminCard>
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.06]">
            <h2 className="text-sm font-bold text-white">Booking Types</h2>
            <button
              type="button"
              onClick={addType}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#06B6D4] border border-[#06B6D4]/25 rounded-lg hover:bg-[#06B6D4]/[0.07] transition-all duration-200"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Type
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.types.map((type) => (
              <div
                key={type.id}
                className="flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest">
                    Booking Type
                  </p>
                  {confirmDelete === type.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => deleteType(type.id)}
                        className="text-[10px] font-semibold text-red-400 hover:text-red-300 transition-colors"
                      >
                        Confirm
                      </button>
                      <span className="text-[#27272A]">·</span>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(null)}
                        className="text-[10px] text-[#52525B] hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(type.id)}
                      className="text-[#27272A] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <Input
                  label="Title"
                  value={type.title}
                  onChange={(e) => updateType(type.id, "title", e.target.value)}
                  placeholder="Speaking Engagements"
                />
                <Textarea
                  label="Description"
                  value={type.description}
                  onChange={(e) => updateType(type.id, "description", e.target.value)}
                  rows={3}
                  placeholder="Invite TAG Christian Media team to speak..."
                />
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Highlights Checklist */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Highlights Checklist
          </h2>
          <TagInput
            label="Checklist Items"
            hint="Type each highlight and press Enter or click Add"
            values={form.highlights}
            onChange={(values) => setField("highlights", values)}
            placeholder="Available for local and international bookings"
          />
        </AdminCard>

        {/* Scripture */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Scripture Quote
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Textarea
              label="Scripture Text"
              value={form.scripture.text}
              onChange={(e) =>
                setField("scripture", { ...form.scripture, text: e.target.value })
              }
              rows={2}
              placeholder="Preach the word; be ready in season and out of season..."
            />
            <Input
              label="Scripture Reference"
              value={form.scripture.reference}
              onChange={(e) =>
                setField("scripture", { ...form.scripture, reference: e.target.value })
              }
              placeholder="2 Timothy 4:2"
            />
          </div>
        </AdminCard>

        {/* Section Image */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Section Image
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Image URL"
              value={form.image}
              onChange={(e) => setField("image", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              hint="Recommended: 21:9 wide ratio"
            />
            <Input
              label="Image Alt Text"
              value={form.imageAlt}
              onChange={(e) => setField("imageAlt", e.target.value)}
              placeholder="Christian speaker addressing a congregation..."
            />
            <Input
              label="Image Caption"
              value={form.imageCaption}
              onChange={(e) => setField("imageCaption", e.target.value)}
              placeholder="Trusted by churches and ministries across 30+ nations"
            />
            <ImagePreview src={form.image} alt={form.imageAlt} label="Image Preview" />
          </div>
        </AdminCard>

        <SaveBar onSave={handleSave} onReset={handleReset} saved={saved} />
      </div>
    </div>
  )
}
