"use client"

import { useState } from "react"
import { Info, Plus, Trash2 } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"
import { Input, Textarea, ImagePreview, SaveBar, SectionHeader, AdminCard } from "@/components/admin/field"
import type { SiteData, AboutPillar, AboutStat } from "@/lib/data/site-data"

export default function AboutAdminPage() {
  const { data, updateAbout } = useSiteData()
  const [form, setForm] = useState<SiteData["about"]>({
    ...data.about,
    pillars: data.about.pillars.map((p) => ({ ...p })),
    stats: data.about.stats.map((s) => ({ ...s })),
  })
  const [saved, setSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const setField = <K extends keyof SiteData["about"]>(
    key: K,
    value: SiteData["about"][K]
  ) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const updatePillar = (id: string, field: keyof AboutPillar, value: string) => {
    setSaved(false)
    setForm((prev) => ({
      ...prev,
      pillars: prev.pillars.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }))
  }

  const addPillar = () => {
    setSaved(false)
    setForm((prev) => ({
      ...prev,
      pillars: [
        ...prev.pillars,
        { id: `p${Date.now()}`, title: "New Pillar", description: "" },
      ],
    }))
  }

  const deletePillar = (id: string) => {
    setSaved(false)
    setForm((prev) => ({
      ...prev,
      pillars: prev.pillars.filter((p) => p.id !== id),
    }))
    setConfirmDelete(null)
  }

  const updateStat = (index: number, field: keyof AboutStat, value: string) => {
    setSaved(false)
    const stats = [...form.stats]
    stats[index] = { ...stats[index], [field]: value }
    setForm((prev) => ({ ...prev, stats }))
  }

  const handleSave = () => {
    updateAbout(form)
    setSaved(true)
  }

  const handleReset = () => {
    setForm({
      ...data.about,
      pillars: data.about.pillars.map((p) => ({ ...p })),
      stats: data.about.stats.map((s) => ({ ...s })),
    })
    setSaved(false)
  }

  return (
    <div>
      <SectionHeader
        title="About Section"
        description="Edit the ministry story, mission statement, pillars, stats, and images."
        icon={<Info className="w-4 h-4 text-[#06B6D4]" />}
      />

      <div className="space-y-5">
        {/* Mission & Body Text */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Mission & Story
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Textarea
              label="Mission Statement"
              value={form.missionText}
              onChange={(e) => setField("missionText", e.target.value)}
              rows={3}
              placeholder="TAG Christian Media exists to spread the Gospel through digital media..."
              hint="Displayed in the scripture-style pull quote block"
            />
            <Textarea
              label="Ministry Story (Body Text)"
              value={form.bodyText}
              onChange={(e) => setField("bodyText", e.target.value)}
              rows={4}
              placeholder="Founded in 2017, TAG Christian Media began as a simple camera..."
            />
          </div>
        </AdminCard>

        {/* Stats */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Stats Row
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {form.stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest">
                  Stat {i + 1}
                </p>
                <Input
                  label="Value"
                  value={stat.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                  placeholder="7+"
                />
                <Input
                  label="Label"
                  value={stat.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                  placeholder="Years of Ministry"
                />
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Pillars */}
        <AdminCard>
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.06]">
            <h2 className="text-sm font-bold text-white">Ministry Pillars</h2>
            <button
              type="button"
              onClick={addPillar}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#06B6D4] border border-[#06B6D4]/25 rounded-lg hover:bg-[#06B6D4]/[0.07] transition-all duration-200"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Pillar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest">
                    Pillar
                  </p>
                  {confirmDelete === pillar.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => deletePillar(pillar.id)}
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
                      onClick={() => setConfirmDelete(pillar.id)}
                      className="text-[#27272A] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <Input
                  label="Title"
                  value={pillar.title}
                  onChange={(e) => updatePillar(pillar.id, "title", e.target.value)}
                  placeholder="Gospel-Centered"
                />
                <Textarea
                  label="Description"
                  value={pillar.description}
                  onChange={(e) => updatePillar(pillar.id, "description", e.target.value)}
                  rows={2}
                  placeholder="Every piece of content is anchored in..."
                />
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Floating Stat Cards */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Floating Stat Cards (on image)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest">
                Bottom-right card
              </p>
              <Input
                label="Value"
                value={form.floatStatValue}
                onChange={(e) => setField("floatStatValue", e.target.value)}
                placeholder="7+ Years"
              />
              <Input
                label="Label"
                value={form.floatStatLabel}
                onChange={(e) => setField("floatStatLabel", e.target.value)}
                placeholder="of Digital Ministry"
              />
            </div>
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest">
                Top-left card
              </p>
              <Input
                label="Value"
                value={form.floatSmallValue}
                onChange={(e) => setField("floatSmallValue", e.target.value)}
                placeholder="50,000+"
              />
              <Input
                label="Label"
                value={form.floatSmallLabel}
                onChange={(e) => setField("floatSmallLabel", e.target.value)}
                placeholder="Lives Impacted"
              />
            </div>
          </div>
        </AdminCard>

        {/* Image */}
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
              hint="Recommended: 4:3 ratio"
            />
            <Input
              label="Image Alt Text"
              value={form.imageAlt}
              onChange={(e) => setField("imageAlt", e.target.value)}
              placeholder="Person holding an open Bible..."
            />
            <ImagePreview src={form.image} alt={form.imageAlt} label="Image Preview" />
          </div>
        </AdminCard>

        <SaveBar onSave={handleSave} onReset={handleReset} saved={saved} />
      </div>
    </div>
  )
}
