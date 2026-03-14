"use client"

import React from "react"
import { Mic, Church, Users, Award, ArrowRight, CheckCircle2 } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"

// Map booking type title → icon
const bookingIconMap: Record<string, React.ElementType> = {
  "Speaking Engagements": Mic,
  "Church Events": Church,
  "Youth Gatherings": Users,
  "Conferences": Award,
}

export default function Bookings() {
  const { data } = useSiteData()
  const bookings = data.bookings

  return (
    <section className="relative py-32" id="bookings">
      {/* Divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Background accent glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 85% 85%, rgba(6,182,212,0.06) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── Left: Copy ── */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] mb-6">
              <span className="text-[10px] text-[#52525B] uppercase tracking-[0.14em] font-semibold">
                Bookings
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 text-balance leading-tight">
              Invite TAG Christian Media to{" "}
              <span
                className="text-[#06B6D4]"
                style={{ textShadow: "0 0 30px rgba(6,182,212,0.35)" }}
              >
                Your Event
              </span>
            </h2>

            <p className="text-[1.0625rem] text-[#52525B] leading-relaxed mb-8">
              Whether it is a Sunday morning service, a youth retreat, or a national conference —
              TAG Christian Media is available to bring the Word with power and authenticity.
            </p>

            {/* Checklist */}
            <ul className="space-y-3.5 mb-10" role="list">
              {bookings.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#71717A]">{item}</span>
                </li>
              ))}
            </ul>

            {/* Scripture block */}
            <div className="scripture-block mb-10">
              <p className="text-sm text-[#71717A] leading-relaxed italic">
                &ldquo;{bookings.scripture.text}&rdquo;
              </p>
              <p className="text-xs text-[#06B6D4] mt-2 font-semibold">
                — {bookings.scripture.reference}
              </p>
            </div>

            {/* CTA */}
            <button className="group flex items-center gap-2 px-7 py-3.5 font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] transition-all duration-200 shadow-[0_0_32px_rgba(6,182,212,0.3)] hover:shadow-[0_0_44px_rgba(6,182,212,0.5)] text-sm">
              Request a Booking
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* ── Right: Booking type cards ── */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bookings.types.map((type) => {
                const Icon = bookingIconMap[type.title] ?? Mic
                return (
                  <div key={type.id} className="glass-card rounded-2xl p-5 group">
                    <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center mb-4 group-hover:bg-[#06B6D4]/15 transition-colors">
                      <Icon className="w-5 h-5 text-[#06B6D4]" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{type.title}</h3>
                    <p className="text-xs text-[#52525B] leading-relaxed">{type.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Full-width image card */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.07] relative aspect-[21/9]">
              <img
                src={bookings.image}
                alt={bookings.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-xs text-[#71717A]">{bookings.imageCaption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
