"use client"

import { useState } from "react"
import { LayoutGrid, ChevronDown, ChevronUp } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"
import { Input, Textarea, ImagePreview, SaveBar, SectionHeader, AdminCard } from "@/components/admin/field"
import type { ContentFeature } from "@/lib/data/site-data"

export default function ContentAdminPage() {
  const { data, updateAllContentFeatures } = useSiteData()
  const [features, setFeatures] = useState<ContentFeature[]>([...data.contentFeatures])
  const [expanded, setExpanded] = useState<string | null>("videos")
  const [saved, setSaved] = useState(false)

  const updateFeature = <K extends keyof ContentFeature>(
    id: string,
    key: K,
    value: ContentFeature[K]
  ) => {
    setSaved(false)
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    )
  }

  const handleSave = () => {
    updateAllContentFeatures(features)
    setSaved(true)
  }

  const handleReset = () => {
    setFeatures([...data.contentFeatures])
    setSaved(false)
  }

  return (
    <div>
      <SectionHeader
        title="Content Features"
        description="Edit the five content pillars — Videos, Blogs, Scriptures, Podcast, and News."
        icon={<LayoutGrid className="w-4 h-4 text-[#06B6D4]" />}
      />

      <div className="space-y-4">
        {features.map((feature, index) => {
          const isExpanded = expanded === feature.id
          return (
            <AdminCard key={feature.id}>
              {/* Accordion header */}
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : feature.id)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#06B6D4]">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{feature.label}</p>
                    <p className="text-xs text-[#3F3F46] truncate max-w-[280px]">
                      {feature.headline}
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#52525B] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#52525B] shrink-0" />
                )}
              </button>

              {/* Accordion body */}
              {isExpanded && (
                <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Label"
                      value={feature.label}
                      onChange={(e) => updateFeature(feature.id, "label", e.target.value)}
                      placeholder="Videos"
                    />
                    <Input
                      label="Detail"
                      value={feature.detail}
                      onChange={(e) => updateFeature(feature.id, "detail", e.target.value)}
                      placeholder="50+ series available"
                    />
                  </div>

                  <Input
                    label="Headline"
                    value={feature.headline}
                    onChange={(e) => updateFeature(feature.id, "headline", e.target.value)}
                    placeholder="Weekly Faith-Based Teachings"
                  />

                  <Textarea
                    label="Description"
                    value={feature.description}
                    onChange={(e) => updateFeature(feature.id, "description", e.target.value)}
                    rows={3}
                    placeholder="Sermons, devotionals..."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Tag Badge"
                      value={feature.tag}
                      onChange={(e) => updateFeature(feature.id, "tag", e.target.value)}
                      placeholder="New Episode Weekly"
                    />
                    <Input
                      label="Highlight Text"
                      value={feature.highlight}
                      onChange={(e) => updateFeature(feature.id, "highlight", e.target.value)}
                      placeholder="Featured: The Gospel of John..."
                    />
                  </div>

                  <Input
                    label="Image URL"
                    value={feature.image}
                    onChange={(e) => updateFeature(feature.id, "image", e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    hint="Recommended: 16:9 or 16:10 ratio"
                  />

                  <Input
                    label="Image Alt Text"
                    value={feature.imageAlt}
                    onChange={(e) => updateFeature(feature.id, "imageAlt", e.target.value)}
                    placeholder="Description of the image..."
                  />

                  <ImagePreview src={feature.image} alt={feature.imageAlt} label="Image Preview" />
                </div>
              )}
            </AdminCard>
          )
        })}

        <SaveBar onSave={handleSave} onReset={handleReset} saved={saved} />
      </div>
    </div>
  )
}
