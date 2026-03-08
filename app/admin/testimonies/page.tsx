"use client"

import { useState } from "react"
import { MessageSquareQuote, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"
import { Input, Textarea, ImagePreview, SaveBar, SectionHeader, AdminCard } from "@/components/admin/field"
import type { Testimony } from "@/lib/data/site-data"

const emptyTestimony: Omit<Testimony, "id"> = {
  name: "",
  role: "",
  quote: "",
  image: "",
  verse: "",
}

export default function TestimoniesAdminPage() {
  const { data, updateTestimony, addTestimony, deleteTestimony } = useSiteData()
  const [testimonies, setTestimonies] = useState<Testimony[]>([...data.testimonies])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [newForm, setNewForm] = useState<Omit<Testimony, "id">>({ ...emptyTestimony })
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  // Sync local state when context changes
  const syncFromContext = () => {
    setTestimonies([...data.testimonies])
  }

  const updateLocal = (id: string, field: keyof Testimony, value: string) => {
    setSaved((prev) => ({ ...prev, [id]: false }))
    setTestimonies((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    )
  }

  const handleSave = (id: string) => {
    const t = testimonies.find((t) => t.id === id)
    if (t) {
      updateTestimony(id, t)
      setSaved((prev) => ({ ...prev, [id]: true }))
    }
  }

  const handleDelete = (id: string) => {
    deleteTestimony(id)
    setTestimonies((prev) => prev.filter((t) => t.id !== id))
    setConfirmDelete(null)
    if (expanded === id) setExpanded(null)
  }

  const handleAdd = () => {
    if (!newForm.name.trim() || !newForm.quote.trim()) return
    addTestimony(newForm)
    setTestimonies([...data.testimonies, { ...newForm, id: `t${Date.now()}` }])
    setNewForm({ ...emptyTestimony })
    setAdding(false)
    // Re-sync after add
    setTimeout(syncFromContext, 50)
  }

  return (
    <div>
      <SectionHeader
        title="Testimonies"
        description="Add, edit, or remove community testimonies. Changes are saved per card."
        icon={<MessageSquareQuote className="w-4 h-4 text-[#06B6D4]" />}
      />

      <div className="space-y-4">
        {/* Existing testimonies */}
        {data.testimonies.map((testimony, index) => {
          const local = testimonies.find((t) => t.id === testimony.id) ?? testimony
          const isExpanded = expanded === testimony.id
          const isSaved = saved[testimony.id]

          return (
            <AdminCard key={testimony.id}>
              {/* Header */}
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-[#27272A] shrink-0 cursor-grab" />
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : testimony.id)}
                  className="flex-1 flex items-center gap-3 text-left min-w-0"
                >
                  <img
                    src={local.image}
                    alt={local.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/[0.1] shrink-0"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white truncate">
                      {local.name || <span className="text-[#3F3F46]">Unnamed</span>}
                    </p>
                    <p className="text-xs text-[#3F3F46] truncate">{local.role}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] font-bold text-[#3F3F46] bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded-full">
                      #{index + 1}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      value={local.name}
                      onChange={(e) => updateLocal(testimony.id, "name", e.target.value)}
                      placeholder="Marcus Adeyemi"
                      required
                    />
                    <Input
                      label="Role"
                      value={local.role}
                      onChange={(e) => updateLocal(testimony.id, "role", e.target.value)}
                      placeholder="Youth Pastor, Lagos"
                    />
                  </div>

                  <Textarea
                    label="Quote"
                    value={local.quote}
                    onChange={(e) => updateLocal(testimony.id, "quote", e.target.value)}
                    rows={3}
                    placeholder="The Vlog transformed how I..."
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Scripture Verse"
                      value={local.verse}
                      onChange={(e) => updateLocal(testimony.id, "verse", e.target.value)}
                      placeholder="Proverbs 27:17"
                    />
                    <Input
                      label="Photo URL"
                      value={local.image}
                      onChange={(e) => updateLocal(testimony.id, "image", e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  {local.image && (
                    <div className="flex items-center gap-3">
                      <img
                        src={local.image}
                        alt={local.name}
                        className="w-14 h-14 rounded-full object-cover border border-white/[0.1]"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                      <p className="text-xs text-[#3F3F46]">Photo preview</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    {confirmDelete === testimony.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-400">Delete this testimony?</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(testimony.id)}
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
                        onClick={() => setConfirmDelete(testimony.id)}
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
                        onClick={() => handleSave(testimony.id)}
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

        {/* Add new testimony */}
        {adding ? (
          <AdminCard>
            <h3 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
              New Testimony
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={newForm.name}
                  onChange={(e) => setNewForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Full Name"
                  required
                />
                <Input
                  label="Role"
                  value={newForm.role}
                  onChange={(e) => setNewForm((p) => ({ ...p, role: e.target.value }))}
                  placeholder="Youth Pastor, Lagos"
                />
              </div>

              <Textarea
                label="Quote"
                value={newForm.quote}
                onChange={(e) => setNewForm((p) => ({ ...p, quote: e.target.value }))}
                rows={3}
                placeholder="Their testimony..."
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Scripture Verse"
                  value={newForm.verse}
                  onChange={(e) => setNewForm((p) => ({ ...p, verse: e.target.value }))}
                  placeholder="John 3:16"
                />
                <Input
                  label="Photo URL"
                  value={newForm.image}
                  onChange={(e) => setNewForm((p) => ({ ...p, image: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {newForm.image && (
                <div className="flex items-center gap-3">
                  <img
                    src={newForm.image}
                    alt="Preview"
                    className="w-14 h-14 rounded-full object-cover border border-white/[0.1]"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                  <p className="text-xs text-[#3F3F46]">Photo preview</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAdding(false)
                    setNewForm({ ...emptyTestimony })
                  }}
                  className="px-4 py-2.5 text-sm text-[#71717A] border border-white/[0.08] rounded-xl hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!newForm.name.trim() || !newForm.quote.trim()}
                  className="px-5 py-2.5 text-sm font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] disabled:opacity-40 transition-all duration-200"
                >
                  Add Testimony
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
            Add New Testimony
          </button>
        )}
      </div>
    </div>
  )
}
