"use client"

import { PlayCircle, Youtube, Instagram, Twitter, Facebook, Mail } from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"

const footerLinks = {
  Platform: [
    { label: "Videos", href: "#content" },
    { label: "Blogs", href: "#content" },
    { label: "Scriptures", href: "#content" },
    { label: "Podcast", href: "#content" },
    { label: "News", href: "#content" },
  ],
  Community: [
    { label: "Testimonies", href: "#testimonies" },
    { label: "Upcoming Events", href: "#events" },
    { label: "Bookings", href: "#bookings" },
    { label: "Join the Community", href: "#" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Contact Us", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

const socials = [
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
]

export default function Footer() {
  const { data } = useSiteData()
  const footer = data.footer

  return (
    <footer className="relative border-t border-white/[0.06]" id="contact">
      {/* Top accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scripture of the week */}
        <div className="py-8 border-b border-white/[0.05]">
          <div className="glass-card rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center">
                <span className="text-[#06B6D4] text-base leading-none select-none" aria-hidden="true">
                  ✦
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest">
                  Scripture of the Week
                </p>
              </div>
            </div>
            <div className="flex-1 min-w-0 sm:border-l sm:border-white/[0.06] sm:pl-5">
              <p className="text-sm text-[#A1A1AA] leading-relaxed italic">
                &ldquo;{footer.scriptureOfWeek.text}&rdquo;
              </p>
              <p className="text-xs text-[#06B6D4] mt-1.5 font-semibold">
                — {footer.scriptureOfWeek.reference}
              </p>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="flex items-center gap-2.5 mb-5 group w-fit"
              aria-label="The Vlog Home"
            >
              <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/25 flex items-center justify-center group-hover:bg-[#06B6D4]/20 transition-colors duration-200">
                <PlayCircle className="w-4 h-4 text-[#06B6D4]" strokeWidth={2} />
              </div>
              <span className="font-bold text-white tracking-[0.12em] uppercase text-sm">
                THE <span className="text-[#06B6D4]">VLOG</span>
              </span>
            </a>

            <p className="text-sm text-[#3F3F46] leading-relaxed max-w-xs mb-8">
              {footer.description}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5" role="list" aria-label="Social media links">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg border border-white/[0.07] flex items-center justify-center text-[#3F3F46] hover:text-[#06B6D4] hover:border-[#06B6D4]/25 hover:bg-[#06B6D4]/[0.05] transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.14em] mb-5">
                {category}
              </h3>
              <ul className="space-y-3.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#3F3F46] hover:text-[#71717A] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#27272A]">
            &copy; {new Date().getFullYear()} The Vlog. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[#27272A] hover:text-[#52525B] transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-[#27272A] hover:text-[#52525B] transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-xs text-[#27272A]">
            {footer.tagline} —{" "}
            <span className="text-[#06B6D4] font-semibold">{footer.taglineVerse}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
