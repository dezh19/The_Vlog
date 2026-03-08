"use client"

import { Quote, Star } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"

export default function Testimonies() {
  const { data } = useSiteData()
  const testimonies = data.testimonies

  return (
    <section className="relative py-32" id="testimonies">
      {/* Divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] mb-6">
            <span className="text-[10px] text-[#52525B] uppercase tracking-[0.14em] font-semibold">
              Community Voices
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 text-balance leading-tight">
            Stories of Faith and{" "}
            <span
              className="text-[#06B6D4]"
              style={{ textShadow: "0 0 30px rgba(6,182,212,0.35)" }}
            >
              Transformation
            </span>
          </h2>
          <p className="text-lg text-[#52525B] max-w-lg mx-auto leading-relaxed">
            Real people. Real encounters with God. Shared through The Vlog community.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonies.map((t, i) => (
            <article
              key={t.id}
              className={`glass-card rounded-2xl p-6 flex flex-col gap-5 ${
                i === 0 ? "border-[#06B6D4]/20" : ""
              }`}
            >
              {/* Top row: stars + quote icon */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5" aria-label="Five star rating">
                  {[...Array(5)].map((_, si) => (
                    <Star
                      key={si}
                      className="w-3.5 h-3.5 text-[#06B6D4] fill-[#06B6D4]"
                    />
                  ))}
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/[0.08] border border-[#06B6D4]/15 flex items-center justify-center">
                  <Quote className="w-3.5 h-3.5 text-[#06B6D4]/60" />
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-[#A1A1AA] leading-[1.7] flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Verse reference */}
              <div className="text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest border-t border-white/[0.05] pt-4">
                {t.verse}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={`Portrait of ${t.name}, ${t.role}`}
                  className="w-10 h-10 rounded-full object-cover border border-white/[0.1]"
                />
                <div>
                  <p className="text-sm font-semibold text-white leading-none mb-1">{t.name}</p>
                  <p className="text-xs text-[#3F3F46]">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
