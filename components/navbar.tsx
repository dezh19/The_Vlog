"use client"

import { useState, useEffect } from "react"
import { PlayCircle, Menu, X, Settings } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Contact Us", href: "#contact" },
  { label: "Bookings", href: "#bookings" },
  { label: "Upcoming Events", href: "#events" },
  { label: "Testimonies", href: "#testimonies" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#09090B]/90 backdrop-blur-2xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="The Vlog Home">
          <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/25 flex items-center justify-center group-hover:bg-[#06B6D4]/20 transition-all duration-300">
            <PlayCircle className="w-4 h-4 text-[#06B6D4]" strokeWidth={2} />
          </div>
          <span className="font-bold text-white tracking-[0.12em] text-sm uppercase">
            THE <span className="text-[#06B6D4]">VLOG</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3.5 py-2 text-sm text-[#71717A] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/admin"
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-[#52525B] hover:text-[#06B6D4] border border-white/[0.06] rounded-lg hover:border-[#06B6D4]/25 hover:bg-[#06B6D4]/[0.05] transition-all duration-200"
            title="Admin Panel"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">Admin</span>
          </a>
          <button className="px-4 py-2 text-sm text-[#A1A1AA] hover:text-white border border-white/[0.08] rounded-lg hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200">
            Sign In
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-black bg-[#06B6D4] rounded-lg hover:bg-[#22D3EE] transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_28px_rgba(6,182,212,0.35)]">
            Join the Community
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[#71717A] hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-[#0C0C0E]/97 backdrop-blur-2xl border-b border-white/[0.06] px-4 pb-5 pt-2">
          <ul className="flex flex-col gap-0.5 mb-4" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block px-3 py-2.5 text-sm text-[#71717A] hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5 pt-3 border-t border-white/[0.06]">
            <a
              href="/admin"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-[#52525B] border border-white/[0.06] rounded-lg hover:bg-[#06B6D4]/[0.05] hover:text-[#06B6D4] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <Settings className="w-3.5 h-3.5" />
              Admin Panel
            </a>
            <button className="w-full px-4 py-2.5 text-sm text-[#A1A1AA] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] transition-all">
              Sign In
            </button>
            <button className="w-full px-4 py-2.5 text-sm font-semibold text-black bg-[#06B6D4] rounded-lg hover:bg-[#22D3EE] transition-all">
              Join the Community
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
