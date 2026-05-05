"use client"

import { PlayCircle, ArrowRight, Radio } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"

export default function Hero() {
  const { data } = useSiteData()
  const hero = data.hero

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Radial glow — top center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(6,182,212,0.16) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade to page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: "linear-gradient(to top, #09090B, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full">
        {/* ── Left: Copy ── */}
        <div className="flex-1 text-center lg:text-left">
          {/* Streaming badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#06B6D4]/25 bg-[#06B6D4]/[0.07] mb-8">
            <Radio className="w-3.5 h-3.5 text-[#06B6D4] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#06B6D4] tracking-widest uppercase">
              {hero.badge}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-white leading-[1.04] tracking-tight mb-6 text-balance">
            {hero.headline1}{" "}
            <span
              className="text-[#06B6D4]"
              style={{ textShadow: "0 0 48px rgba(6,182,212,0.5)" }}
            >
              {hero.headlineAccent}
            </span>{" "}
            <br className="hidden sm:block" />
            {hero.headline2}
          </h1>

          {/* Subheadline */}
          <p className="text-[1.0625rem] text-[#71717A] leading-relaxed max-w-[500px] mx-auto lg:mx-0 mb-10 text-pretty">
            {hero.subheadline}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
            <button className="group flex items-center gap-2 px-6 py-3.5 font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] transition-all duration-200 shadow-[0_0_32px_rgba(6,182,212,0.3)] hover:shadow-[0_0_44px_rgba(6,182,212,0.5)] text-sm w-full sm:w-auto justify-center">
              {hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="group flex items-center gap-2.5 px-6 py-3.5 font-semibold text-white border border-white/[0.1] rounded-xl hover:border-white/[0.2] hover:bg-white/[0.04] transition-all duration-200 text-sm w-full sm:w-auto justify-center">
              <div className="w-6 h-6 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/25 flex items-center justify-center">
                <PlayCircle className="w-3.5 h-3.5 text-[#06B6D4]" />
              </div>
              {hero.ctaSecondary}
            </button>
          </div>

          {/* Scripture block */}
          <div className="mt-12 scripture-block max-w-[420px] mx-auto lg:mx-0">
            <p className="text-sm text-[#71717A] leading-relaxed italic">
              &ldquo;{hero.scripture.text}&rdquo;
            </p>
            <p className="text-xs text-[#06B6D4] mt-2 font-semibold tracking-wide">
              — {hero.scripture.reference}
            </p>
          </div>
        </div>

        {/* ── Right: Visual grid ── */}
        <div className="flex-1 w-full max-w-[520px] lg:max-w-none">
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] aspect-[16/9] group mb-3">
            <img
              src={hero.mainImage.src}
              alt={hero.mainImage.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Live indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/[0.1] px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-white/90 uppercase tracking-widest">
                {hero.liveLabel}
              </span>
            </div>

            {/* Play overlay */}
            <button
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Play latest episode"
            >
              <div className="w-16 h-16 rounded-full bg-[#06B6D4]/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.7)]">
                <PlayCircle className="w-8 h-8 text-black" strokeWidth={2} />
              </div>
            </button>

            {/* Bottom label */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <p className="text-xs text-white/70 font-medium">Latest Episode</p>
              <span className="text-[10px] text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
          </div>

          {/* Two smaller images */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {hero.smallImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-white/[0.07] aspect-[4/3] relative group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2 py-0.5 rounded-full">
                    {img.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-3.5 text-center"
              >
                <div className="text-[1.1rem] font-bold text-white leading-none mb-1">{stat.value}</div>
                <div className="text-[10px] text-[#52525B] uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
