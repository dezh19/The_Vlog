"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"
import { Input, Textarea, SaveBar, SectionHeader, AdminCard } from "@/components/admin/field"
import type { SiteData } from "@/lib/data/site-data"

export default function FooterAdminPage() {
  const { data, updateFooter } = useSiteData()
  const [form, setForm] = useState<SiteData["footer"]>({ ...data.footer })
  const [saved, setSaved] = useState(false)

  const setField = <K extends keyof SiteData["footer"]>(
    key: K,
    value: SiteData["footer"][K]
  ) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    updateFooter(form)
    setSaved(true)
  }

  const handleReset = () => {
    setForm({ ...data.footer })
    setSaved(false)
  }

  return (
    <div>
      <SectionHeader
        title="Footer"
        description="Update the scripture of the week, footer description, and tagline."
        icon={<FileText className="w-4 h-4 text-[#06B6D4]" />}
      />

      <div className="space-y-5">
        {/* Scripture of the Week */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Scripture of the Week
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Textarea
              label="Scripture Text"
              value={form.scriptureOfWeek.text}
              onChange={(e) =>
                setField("scriptureOfWeek", {
                  ...form.scriptureOfWeek,
                  text: e.target.value,
                })
              }
              rows={4}
              placeholder="Trust in the Lord with all your heart..."
              hint="This appears in the highlighted banner at the top of the footer"
            />
            <Input
              label="Scripture Reference"
              value={form.scriptureOfWeek.reference}
              onChange={(e) =>
                setField("scriptureOfWeek", {
                  ...form.scriptureOfWeek,
                  reference: e.target.value,
                })
              }
              placeholder="Proverbs 3:5–6"
            />

            {/* Live preview */}
            <div className="mt-2 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest mb-3">
                Preview
              </p>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#06B6D4] text-sm">✦</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest mb-2">
                    Scripture of the Week
                  </p>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed italic">
                    &ldquo;{form.scriptureOfWeek.text}&rdquo;
                  </p>
                  <p className="text-xs text-[#06B6D4] mt-1.5 font-semibold">
                    — {form.scriptureOfWeek.reference}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Brand Description */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Brand Description
          </h2>
          <Textarea
            label="Footer Description"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={3}
            placeholder="A Christian media platform spreading the Gospel through digital content..."
            hint="Appears below the logo in the footer brand column"
          />
        </AdminCard>

        {/* Tagline */}
        <AdminCard>
          <h2 className="text-sm font-bold text-white mb-5 pb-3 border-b border-white/[0.06]">
            Bottom Bar Tagline
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tagline Text"
              value={form.tagline}
              onChange={(e) => setField("tagline", e.target.value)}
              placeholder="Spreading the Gospel"
            />
            <Input
              label="Tagline Verse"
              value={form.taglineVerse}
              onChange={(e) => setField("taglineVerse", e.target.value)}
              placeholder="John 3:16"
              hint="Displayed in cyan after the tagline"
            />
          </div>

          {/* Preview */}
          <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-[10px] font-bold text-[#52525B] uppercase tracking-widest mb-2">
              Preview
            </p>
            <p className="text-xs text-[#27272A]">
              {form.tagline} —{" "}
              <span className="text-[#06B6D4] font-semibold">{form.taglineVerse}</span>
            </p>
          </div>
        </AdminCard>

        <SaveBar onSave={handleSave} onReset={handleReset} saved={saved} />
      </div>
    </div>
  )
}
