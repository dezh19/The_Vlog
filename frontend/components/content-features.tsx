"use client"

import React from "react"
import { Video, BookOpen, BookMarked, Mic2, Newspaper, ArrowRight } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"
import type { ContentFeature } from "@/lib/data/site-data"

// Map feature id → icon
const iconMap: Record<string, React.ElementType> = {
  videos: Video,
  blogs: BookOpen,
  scriptures: BookMarked,
  podcast: Mic2,
  news: Newspaper,
}

export default function ContentFeatures() {
  const { data } = useSiteData()
  const features = data.contentFeatures

  return (
    <section className="relative py-32" id="content">
      {/* Top divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] mb-6">
            <span className="text-[10px] text-[#52525B] uppercase tracking-[0.14em] font-semibold">
              Platform Content
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 text-balance leading-tight">
            Everything you need to{" "}
            <span
              className="text-[#06B6D4]"
              style={{ textShadow: "0 0 30px rgba(6,182,212,0.35)" }}
            >
              grow in faith
            </span>
          </h2>
          <p className="text-lg text-[#52525B] max-w-2xl mx-auto leading-relaxed text-pretty">
            Five content pillars designed to meet you wherever you are in your spiritual journey —
            all in one place, updated weekly.
          </p>
        </div>

        {/* Cards: 2 + 3 layout */}
        <div className="space-y-5">
          {/* Row 1: 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.slice(0, 2).map((feature) => (
              <FeatureCard key={feature.id} feature={feature} large />
            ))}
          </div>
          {/* Row 2: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.slice(2).map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  large = false,
}: {
  feature: ContentFeature
  large?: boolean
}) {
  const Icon = iconMap[feature.id] ?? Video
  return (
    <article className="glass-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col">
      {/* Image */}
      <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <img
          src={feature.image}
          alt={feature.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 to-transparent" />

        {/* Tag badge */}
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#06B6D4] bg-[#09090B]/70 border border-[#06B6D4]/25 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            {feature.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Icon + label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest">
              {feature.label}
            </span>
            <p className="text-[10px] text-[#3F3F46] mt-0.5">{feature.detail}</p>
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-[1.05rem] font-bold text-white mb-2.5 leading-snug">
          {feature.headline}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#52525B] leading-relaxed mb-4 flex-1">
          {feature.description}
        </p>

        {/* Highlight block */}
        <div className="scripture-block mb-5">
          <p className="text-xs text-[#71717A] leading-relaxed">{feature.highlight}</p>
        </div>

        {/* CTA link */}
        <button className="flex items-center gap-1.5 text-sm font-semibold text-[#06B6D4] hover:gap-3 transition-all duration-200 group/btn w-fit">
          Explore {feature.label}
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  )
}
