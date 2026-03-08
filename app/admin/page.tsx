"use client"

import Link from "next/link"
import {
  Sparkles,
  LayoutGrid,
  MessageSquareQuote,
  CalendarDays,
  BookMarked,
  Info,
  FileText,
  ArrowRight,
  Users,
  Video,
  Clock,
} from "lucide-react"
import { useSiteData } from "@/lib/context/site-context"

const sections = [
  {
    label: "Hero",
    description: "Edit headline, subheadline, scripture, stats, and images",
    href: "/admin/hero",
    icon: Sparkles,
    color: "cyan",
  },
  {
    label: "Content Features",
    description: "Manage Videos, Blogs, Scriptures, Podcast, and News cards",
    href: "/admin/content",
    icon: LayoutGrid,
    color: "cyan",
  },
  {
    label: "Testimonies",
    description: "Add, edit, or remove community testimonies",
    href: "/admin/testimonies",
    icon: MessageSquareQuote,
    color: "cyan",
  },
  {
    label: "Events",
    description: "Create and manage upcoming gatherings and conferences",
    href: "/admin/events",
    icon: CalendarDays,
    color: "cyan",
  },
  {
    label: "Bookings",
    description: "Update booking types, highlights, and scripture",
    href: "/admin/bookings",
    icon: BookMarked,
    color: "cyan",
  },
  {
    label: "About",
    description: "Edit mission, pillars, stats, and ministry story",
    href: "/admin/about",
    icon: Info,
    color: "cyan",
  },
  {
    label: "Footer",
    description: "Update scripture of the week and footer tagline",
    href: "/admin/footer",
    icon: FileText,
    color: "cyan",
  },
]

export default function AdminDashboard() {
  const { data, lastSaved } = useSiteData()

  const stats = [
    {
      label: "Content Features",
      value: data.contentFeatures.length,
      icon: Video,
      sub: "active sections",
    },
    {
      label: "Testimonies",
      value: data.testimonies.length,
      icon: MessageSquareQuote,
      sub: "community voices",
    },
    {
      label: "Events",
      value: data.events.length,
      icon: CalendarDays,
      sub: "upcoming gatherings",
    },
    {
      label: "Community",
      value: data.hero.stats.find((s) => s.label === "Community")?.value ?? "50K+",
      icon: Users,
      sub: "members reached",
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
        </div>
        <p className="text-sm text-[#52525B]">
          Welcome to The Vlog admin panel. Manage all site content from here.
        </p>
        {lastSaved && (
          <div className="flex items-center gap-1.5 mt-3">
            <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span className="text-xs text-[#3F3F46]">
              Last saved:{" "}
              <span className="text-[#52525B]">
                {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-[#06B6D4]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white leading-none mb-1">{stat.value}</div>
              <div className="text-[10px] text-[#3F3F46] uppercase tracking-wide">{stat.sub}</div>
            </div>
          )
        })}
      </div>

      {/* Section cards */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-[#3F3F46] uppercase tracking-[0.14em] mb-4">
          Content Sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className="glass-card rounded-2xl p-5 group hover:border-[#06B6D4]/20 transition-all duration-200 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center group-hover:bg-[#06B6D4]/15 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-[#06B6D4]" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#27272A] group-hover:text-[#06B6D4] group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{section.label}</h3>
                  <p className="text-xs text-[#3F3F46] leading-relaxed">{section.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Info banner */}
      <div className="glass-card rounded-2xl p-5 border-[#06B6D4]/10 mt-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[#06B6D4] text-sm">✦</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1">Changes save automatically</p>
            <p className="text-xs text-[#3F3F46] leading-relaxed">
              All edits are saved to your browser&apos;s local storage and reflected on the live site
              instantly. No page refresh needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
