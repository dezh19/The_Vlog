"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  PlayCircle,
  LayoutDashboard,
  Sparkles,
  LayoutGrid,
  MessageSquareQuote,
  CalendarDays,
  BookMarked,
  Info,
  FileText,
  LogOut,
  Eye,
  ChevronRight,
  Lock,
} from "lucide-react"

// ─────────────────────────────────────────────
//  Admin password (simple client-side gate)
// ─────────────────────────────────────────────
const ADMIN_PASSWORD = "admin123"
const AUTH_KEY = "thevlog_admin_auth"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: Sparkles },
  { label: "Content", href: "/admin/content", icon: LayoutGrid },
  { label: "Testimonies", href: "/admin/testimonies", icon: MessageSquareQuote },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Bookings", href: "/admin/bookings", icon: BookMarked },
  { label: "About", href: "/admin/about", icon: Info },
  { label: "Footer", href: "/admin/footer", icon: FileText },
]

// ─────────────────────────────────────────────
//  Auth Gate
// ─────────────────────────────────────────────
function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1")
      onAuth()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(6,182,212,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/25 flex items-center justify-center">
            <PlayCircle className="w-5 h-5 text-[#06B6D4]" strokeWidth={2} />
          </div>
          <span className="font-bold text-white tracking-[0.12em] text-sm uppercase">
            THE <span className="text-[#06B6D4]">VLOG</span>
          </span>
        </div>

        {/* Card */}
        <div
          className={`glass-card rounded-2xl p-8 transition-all duration-200 ${
            shake ? "translate-x-2" : ""
          }`}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 mx-auto mb-5">
            <Lock className="w-5 h-5 text-[#06B6D4]" />
          </div>
          <h1 className="text-xl font-bold text-white text-center mb-1">Admin Panel</h1>
          <p className="text-sm text-[#52525B] text-center mb-7">
            Enter your password to continue
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                placeholder="Password"
                autoFocus
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-[#3F3F46] focus:outline-none transition-all duration-200 ${
                  error
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/[0.08] focus:border-[#06B6D4]/50"
                }`}
              />
              {error && (
                <p className="text-xs text-red-400 font-medium">Incorrect password. Try again.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] transition-all duration-200 shadow-[0_0_24px_rgba(6,182,212,0.25)]"
            >
              Enter Admin Panel
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/[0.05]">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 text-xs text-[#3F3F46] hover:text-[#71717A] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              View live site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  Admin Layout
// ─────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [authed, setAuthed] = useState(false)
  const [checked, setChecked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_KEY)
    if (stored === "1") setAuthed(true)
    setChecked(true)
  }, [])

  if (!checked) return null

  if (!authed) {
    return <AuthGate onAuth={() => setAuthed(true)} />
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#0A0A0C] border-r border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-white/[0.06] shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/25 flex items-center justify-center">
            <PlayCircle className="w-3.5 h-3.5 text-[#06B6D4]" strokeWidth={2} />
          </div>
          <span className="font-bold text-white tracking-[0.12em] text-xs uppercase">
            THE <span className="text-[#06B6D4]">VLOG</span>
          </span>
          <span className="ml-auto text-[9px] font-bold text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-1.5 py-0.5 rounded-full uppercase tracking-widest">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-[9px] font-bold text-[#27272A] uppercase tracking-[0.16em] px-2 mb-3">
            Content Sections
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                      active
                        ? "bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20"
                        : "text-[#52525B] hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                    {active && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#52525B] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
          >
            <Eye className="w-4 h-4 shrink-0" />
            <span className="font-medium">View Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#52525B] hover:text-red-400 hover:bg-red-500/[0.05] transition-all duration-200"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-[#0A0A0C]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center gap-4 px-4 sm:px-6 shrink-0 sticky top-0 z-20">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-[#52525B] hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#3F3F46]">Admin</span>
            {pathname !== "/admin" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#27272A]" />
                <span className="text-white font-medium capitalize">
                  {pathname.split("/").pop()}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#52525B] border border-white/[0.06] rounded-lg hover:text-[#06B6D4] hover:border-[#06B6D4]/25 transition-all duration-200"
            >
              <Eye className="w-3.5 h-3.5" />
              Live Site
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#06B6D4]">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
