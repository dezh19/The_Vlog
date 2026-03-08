"use client"

import React from "react"
import { Heart, Globe, Zap, Target } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"

// Map pillar title → icon
const pillarIconMap: Record<string, React.ElementType> = {
  "Gospel-Centered": Heart,
  "Globally Accessible": Globe,
  "Culturally Relevant": Zap,
  "Community Driven": Target,
}

export default function About() {
  const { data } = useSiteData()
  const about = data.about

  return (
    <section className="relative py-32" id="about">
      {/* Divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Left ambient glow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[450px] h-[450px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Image ── */}
          <div className="relative">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.07] aspect-[4/3] relative">
              <img
                src={about.image}
                alt={about.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#09090B]/40" />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-5 -right-3 sm:-right-6 glass-card rounded-2xl p-5 border border-[#06B6D4]/20 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <div className="text-2xl font-bold text-white leading-none mb-1">
                {about.floatStatValue}
              </div>
              <div className="text-[11px] text-[#52525B] mb-3">{about.floatStatLabel}</div>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                ))}
              </div>
            </div>

            <div className="absolute -top-4 -left-3 sm:-left-5 glass-card rounded-xl p-4 border border-white/[0.07]">
              <div className="text-sm font-bold text-white leading-none mb-1">
                {about.floatSmallValue}
              </div>
              <div className="text-[10px] text-[#52525B]">{about.floatSmallLabel}</div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] mb-6">
              <span className="text-[10px] text-[#52525B] uppercase tracking-[0.14em] font-semibold">
                About The Vlog
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 text-balance leading-tight">
              A digital ministry built on{" "}
              <span
                className="text-[#06B6D4]"
                style={{ textShadow: "0 0 30px rgba(6,182,212,0.35)" }}
              >
                purpose
              </span>
            </h2>

            {/* Mission scripture block */}
            <div className="scripture-block mb-6">
              <p className="text-sm text-[#71717A] leading-relaxed italic">
                &ldquo;{about.missionText}&rdquo;
              </p>
              <p className="text-xs text-[#06B6D4] mt-2 font-semibold">— Our Mission</p>
            </div>

            <p className="text-[0.9375rem] text-[#52525B] leading-relaxed mb-10">
              {about.bodyText}
            </p>

            {/* Stats row */}
            <div className="flex gap-6 mb-10 pb-10 border-b border-white/[0.06]">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                  <div className="text-xs text-[#3F3F46]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Pillars grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.pillars.map((pillar) => {
                const Icon = pillarIconMap[pillar.title] ?? Heart
                return (
                  <div key={pillar.id} className="glass-card rounded-xl p-4 group">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center shrink-0 group-hover:bg-[#06B6D4]/15 transition-colors">
                        <Icon className="w-3.5 h-3.5 text-[#06B6D4]" />
                      </div>
                      <span className="text-sm font-bold text-white">{pillar.title}</span>
                    </div>
                    <p className="text-xs text-[#52525B] leading-relaxed">{pillar.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
