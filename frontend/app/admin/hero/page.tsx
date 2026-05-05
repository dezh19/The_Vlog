"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"
import { Input, Textarea, ImagePreview, SaveBar, SectionHeader, AdminCard } from "@/components/admin/field"
import type { HeroData } from "@/lib/data/site-data"

export default function HeroAdminPage() {
  const { data, updateHero } = useSiteData()
  const [form, setForm] = useState<HeroData>({ ...data.hero })
  const [saved, setSaved] = useState(false)

  const set = <K extends keyof HeroData>(key: K, value: HeroData[K]) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const setStat = (index: number, field: "value" | "label", val: string) => {
    setSaved(false)
    const stats = [...form.stats]
    stats[index] = { ...stats[index], [field]: val }
    setForm((prev) => ({ ...prev, stats }))
  }

  const setSmallImage = (index: number, field: "src" | "alt" | "tag", val: string) => {
    setSaved(false)
    const smallImages = [...form.smallImages]
    smallImages[index] = { ...smallImages[index], [field]: val }
    setForm((prev) => ({ ...prev, smallImages }))
  }

  const handleSave = () => {
    updateHero(form)
    setSaved(true)
  }

  const handleReset = () => {
    setForm({ ...data.hero })
    setSaved(false)
  }

  return (
    <div>
      <SectionHeader
        title="Hero Section"
        description="Edit the main hero banner — headline, subheadline, CTA buttons, scripture, stats, and images."
        icon={<Sparkles className="w-4 h-4 text-[#06B6D4]" />}
      />

      <div className="space-y-5">
        {/* Badge & Headlines */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Badge & Headlines
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Streaming Badge"
              value={form.badge}
              onChange={(e) => set("badge", e.target.value)}
              placeholder="Now Streaming Weekly Christian Content"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Headline Part 1"
                value={form.headline1}
                onChange={(e) => set("headline1", e.target.value)}
                placeholder="Faith."
              />
              <Input
                label="Headline Accent (cyan)"
                value={form.headlineAccent}
                onChange={(e) => set("headlineAccent", e.target.value)}
                placeholder="Truth."
              />
              <Input
                label="Headline Part 2"
                value={form.headline2}
                onChange={(e) => set("headline2", e.target.value)}
                placeholder="Community."
              />
            </div>
            <Textarea
              label="Subheadline"
              value={form.subheadline}
              onChange={(e) => set("subheadline", e.target.value)}
              rows={3}
              placeholder="TAG Christian Media is a platform for..."
            />
          </div>
        </AdminCard>

        {/* CTA Buttons */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            CTA Buttons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Button Label"
              value={form.ctaPrimary}
              onChange={(e) => set("ctaPrimary", e.target.value)}
              placeholder="Explore Content"
            />
            <Input
              label="Secondary Button Label"
              value={form.ctaSecondary}
              onChange={(e) => set("ctaSecondary", e.target.value)}
              placeholder="Watch Latest Episode"
            />
          </div>
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
              onChange={(e) => set("scripture", { ...form.scripture, text: e.target.value })}
              rows={3}
              placeholder="For God so loved the world..."
            />
            <Input
              label="Scripture Reference"
              value={form.scripture.reference}
              onChange={(e) => set("scripture", { ...form.scripture, reference: e.target.value })}
              placeholder="John 3:16"
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
              <div key={i} className="flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest">
                  Stat {i + 1}
                </p>
                <Input
                  label="Value"
                  value={stat.value}
                  onChange={(e) => setStat(i, "value", e.target.value)}
                  placeholder="200+"
                />
                <Input
                  label="Label"
                  value={stat.label}
                  onChange={(e) => setStat(i, "label", e.target.value)}
                  placeholder="Episodes"
                />
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Main Image */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Main Hero Image
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Image URL"
              value={form.mainImage.src}
              onChange={(e) => set("mainImage", { ...form.mainImage, src: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              hint="Use a 16:9 image for best results"
            />
            <Input
              label="Image Alt Text"
              value={form.mainImage.alt}
              onChange={(e) => set("mainImage", { ...form.mainImage, alt: e.target.value })}
              placeholder="Worship service congregation..."
            />
            <Input
              label="Live Label"
              value={form.liveLabel}
              onChange={(e) => set("liveLabel", e.target.value)}
              placeholder="Live Every Sunday"
            />
            <ImagePreview src={form.mainImage.src} alt={form.mainImage.alt} label="Preview" />
          </div>
        </AdminCard>

        {/* Small Images */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Small Images (2 thumbnails)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {form.smallImages.map((img, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest">
                  Thumbnail {i + 1}
                </p>
                <Input
                  label="Image URL"
                  value={img.src}
                  onChange={(e) => setSmallImage(i, "src", e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                <Input
                  label="Alt Text"
                  value={img.alt}
                  onChange={(e) => setSmallImage(i, "alt", e.target.value)}
                  placeholder="Description of image..."
                />
                <Input
                  label="Tag Label"
                  value={img.tag}
                  onChange={(e) => setSmallImage(i, "tag", e.target.value)}
                  placeholder="Scriptures"
                />
                <ImagePreview src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </AdminCard>

        <SaveBar onSave={handleSave} onReset={handleReset} saved={saved} />
      </div>
    </div>
  )
}
