"use client"

import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"

export default function Events() {
  const { data } = useSiteData()
  const events = data.events

  return (
    <section className="relative py-32" id="events">
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
              Upcoming Events
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 text-balance leading-tight">
            Upcoming{" "}
            <span
              className="text-[#06B6D4]"
              style={{ textShadow: "0 0 30px rgba(6,182,212,0.35)" }}
            >
              Gatherings
            </span>
          </h2>
          <p className="text-lg text-[#52525B] max-w-xl mx-auto leading-relaxed">
            Join TAG Christian Media community in person. From conferences to youth nights — there is a seat
            for you at every table.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <article key={event.id} className="glass-card rounded-2xl overflow-hidden group flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={event.image}
                  alt={event.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-[#09090B]/10 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm ${
                      event.badgeColor === "cyan"
                        ? "text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/25"
                        : "text-white bg-white/10 border border-white/15"
                    }`}
                  >
                    {event.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] text-[#A1A1AA] bg-black/50 backdrop-blur-sm border border-white/[0.08] px-2.5 py-1 rounded-full">
                    {event.spots}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[1.05rem] font-bold text-white mb-2.5 leading-snug">
                  {event.title}
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed mb-5 flex-1">
                  {event.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#71717A]">
                    <Calendar className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#71717A]">
                    <Clock className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#71717A]">
                    <MapPin className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    {event.location}
                  </div>
                </div>

                {/* Register CTA */}
                <button className="group/btn flex items-center justify-center gap-2 w-full px-5 py-2.5 text-sm font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.18)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]">
                  Register Now
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
