"use client"

import React from "react"

// ─────────────────────────────────────────────
//  Shared admin form field components
// ─────────────────────────────────────────────

interface FieldProps {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}

export function Field({ label, hint, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-widest">
        {label}
        {required && <span className="text-[#06B6D4] ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-[#3F3F46]">{hint}</p>}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export function Input({ label, hint, ...props }: InputProps) {
  return (
    <Field label={label} hint={hint} required={props.required}>
      <input
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-[#3F3F46] focus:outline-none focus:border-[#06B6D4]/50 focus:bg-white/[0.06] transition-all duration-200 ${props.className ?? ""}`}
      />
    </Field>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
}

export function Textarea({ label, hint, ...props }: TextareaProps) {
  return (
    <Field label={label} hint={hint} required={props.required}>
      <textarea
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-[#3F3F46] focus:outline-none focus:border-[#06B6D4]/50 focus:bg-white/[0.06] transition-all duration-200 resize-none ${props.className ?? ""}`}
      />
    </Field>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hint?: string
  options: { value: string; label: string }[]
}

export function Select({ label, hint, options, ...props }: SelectProps) {
  return (
    <Field label={label} hint={hint} required={props.required}>
      <select
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0E] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#06B6D4]/50 transition-all duration-200 ${props.className ?? ""}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

interface ImagePreviewProps {
  src: string
  alt?: string
  label?: string
}

export function ImagePreview({ src, alt = "Preview", label }: ImagePreviewProps) {
  if (!src) return null
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-widest">{label}</p>
      )}
      <div className="rounded-xl overflow-hidden border border-white/[0.07] aspect-video bg-white/[0.02]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = "none"
          }}
        />
      </div>
    </div>
  )
}

interface SaveBarProps {
  onSave: () => void
  onReset?: () => void
  saved?: boolean
  saving?: boolean
}

export function SaveBar({ onSave, onReset, saved, saving }: SaveBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/[0.06] mt-6">
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 text-sm text-[#71717A] border border-white/[0.08] rounded-xl hover:border-white/[0.15] hover:text-white transition-all duration-200"
        >
          Reset to Default
        </button>
      )}
      <div className="flex items-center gap-3 ml-auto">
        {saved && (
          <span className="text-xs text-[#06B6D4] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
            Saved
          </span>
        )}
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-5 py-2.5 text-sm font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] disabled:opacity-50 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>
      {description && <p className="text-sm text-[#52525B] leading-relaxed">{description}</p>}
    </div>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function AdminCard({ children, className = "" }: CardProps) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  )
}

interface TagInputProps {
  label: string
  hint?: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function TagInput({ label, hint, values, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = React.useState("")

  const add = () => {
    const trimmed = input.trim()
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed])
      setInput("")
    }
  }

  const remove = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx))
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                add()
              }
            }}
            placeholder={placeholder ?? "Type and press Enter"}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-[#3F3F46] focus:outline-none focus:border-[#06B6D4]/50 transition-all duration-200"
          />
          <button
            type="button"
            onClick={add}
            className="px-4 py-2.5 text-sm font-semibold text-black bg-[#06B6D4] rounded-xl hover:bg-[#22D3EE] transition-all duration-200"
          >
            Add
          </button>
        </div>
        {values.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {values.map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] group"
              >
                <span className="text-sm text-[#A1A1AA] flex-1">{v}</span>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-[#3F3F46] hover:text-red-400 transition-colors text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Field>
  )
}
